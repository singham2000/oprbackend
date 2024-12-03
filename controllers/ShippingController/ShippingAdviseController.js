const db = require("../../models");
const {
  shippment_advise_master,
  shippment_advise_additional_instruction,
  document,
} = db;
const { Op } = require("sequelize");
const { generateSeries } = require("../../utilites/genrateSeries");

// Create a new shippment_advise_master
const createShippingAdviseTerm = async (req, res, next) => {
  const transaction = await db.sequelize.transaction(); // Start a transaction

  try {
    console.log(req.body);
    console.log("file: ", req.files);

    const {
      po_num,
      po_id,
      shipment_status,
      invoice_amount,
      bl_awb_no,
      bl_awb_date,
      type_of_bl,
      shipment_type,
      cbm_information,
      free_days,
      shipping_vehicle,
      vehicle_description,
      port_of_loading,
      port_of_discharge,
      final_destination,
      goods_description,
      shipper_name,
      consignee_name,
      notify_name,
      free_days_time,
      freight,
      eta,
      additional_information,
      doc_list,
      cpackageDetail,
      grnData,

      addAdditinalCostArr,
      additinalCostDataArr,
      additinalCostFreigthDataArr,
      quo_id,
      quo_num,
      for_delivery_term,
      totalFreigth,
    } = req.body;

    // Step 1: Create the shipment advise
    const result = await shippment_advise_master.create(
      {
        po_id,
        po_num,
        shipment_status,
        invoice_amount,
        bl_awb_no,
        bl_awb_date,
        type_of_bl,
        shipment_type,
        cbm_information,
        free_days,
        shipping_vehicle,
        vehicle_description,
        port_of_loading,
        port_of_discharge,
        final_destination,
        goods_description,
        shipper_name,
        consignee_name,
        notify_name,
        free_days_time,
        freight,
        eta,
        status: 1,
      },
      { transaction }
    ); // Pass the transaction

    const lastInsertedId = result.shippment_advise_id;

    // Step 2: Add additional cost for freight
    await db.additional_cost.create(
      {
        reference_id: lastInsertedId,
        quo_id,
        quo_num,
        charge_name: "total_freight_charges",
        reference_table_name: "shippment_advise_master",
        charge_amount: totalFreigth,
        charges_by: "Supplier",
        heading: "Freight_Charges",
        for_delivery_term,
        status: 1,
      },
      { transaction }
    ); // Pass the transaction

    // Step 3: Handle additional freight charges
    if (additinalCostFreigthDataArr?.length > 0) {
      await Promise.all(
        additinalCostFreigthDataArr.map(async (item) => {
          await db.additional_cost_freigth.create(
            {
              reference_id: lastInsertedId,
              quo_id,
              quo_num,
              number_container: item.number_container,
              type_container: item.type_container,
              rate: item.rate,
              total_freigth: item.line_total,
              reference_table_name: "shippment_advise_master",
              charges_by: "Supplier",
              heading: "Freigth Charges",
              for_delivery_term,
              status: 1,
            },
            { transaction }
          ); // Pass the transaction
        })
      );
    }

    // Step 4: Handle additional costs
    let filterAdditinalCostDataArr = additinalCostDataArr?.filter(
      (i) => i.add_amount > 0 && i.charge_name !== "Total"
    );
    if (filterAdditinalCostDataArr?.length > 0) {
      await Promise.all(
        filterAdditinalCostDataArr.map(async (i) => {
          await db.additional_cost.create(
            {
              reference_id: lastInsertedId,
              quo_id,
              quo_num,
              charge_name: i.charge_name,
              reference_table_name: "shippment_advise_master",
              charge_amount: i.add_amount,
              charges_by: "Supplier",
              heading: i.heading,
              for_delivery_term,
              status: 1,
            },
            { transaction }
          ); // Pass the transaction
        })
      );
    }

    // Step 5: Handle additional charges in shipping advise
    if (addAdditinalCostArr?.length > 0) {
      await Promise.all(
        addAdditinalCostArr.map(async (i) => {
          await db.additional_cost.create(
            {
              reference_id: lastInsertedId,
              quo_id,
              quo_num,
              charge_name: i.charge_name,
              reference_table_name: "shippment_advise_master",
              charge_amount: i.charge_amount,
              charges_by: "Supplier",
              heading: "Add Charges in Shipping Advise",
              for_delivery_term,
              status: 1,
            },
            { transaction }
          ); // Pass the transaction
        })
      );
    }

    // Step 6: Handle additional instructions (if any)
    if (additional_information && additional_information?.length > 0) {
      await Promise.all(
        additional_information.map(async (item) => {
          await shippment_advise_additional_instruction.create(
            {
              shippment_advise_id: lastInsertedId,
              po_id: po_id,
              po_num: po_num,
              other: item.other,
              status: 1,
            },
            { transaction }
          ); // Pass the transaction
        })
      );
    }

    // Step 7: Handle GRN data (if any)
    if (grnData?.po_item_id_lists && grnData?.po_item_id_lists?.length > 0) {
      await Promise.all(
        grnData?.po_item_id_lists.map(async (item) => {
          await db.shipment_advise_items.create(
            {
              shipment_advise_id: lastInsertedId,
              po_id: po_id,
              po_num: po_num,
              item_id: item.item_id,
              po_item_id: item.po_item_id,
              pack_size: item.pack_size,
              pack_type: item.pack_type,
              quantity: item.grn_qty,
              no_of_packs: Number(item.pack_size) * Number(item.grn_qty),
              status: 1,
            },
            { transaction }
          ); // Pass the transaction
        })
      );
    }

    // Step 8: Handle document uploads
    const updatedShippingAdviseDocs = doc_list.map((data, index) => ({
      quotation_id: quo_id,
      doc_id: lastInsertedId,
      module: "shippment_advise_master",
      q_doc_remarks: data.name,
      q_doc_name: data.remark,
      q_doc_filename: req.files[index]?.originalname,
      q_doc_file: req.files[index]?.buffer.toString("base64"),
    }));

    await db.QuoDoc.bulkCreate(updatedShippingAdviseDocs, { transaction }); // Pass the transaction

    // Step 9: Create containers
    const containerPromises = cpackageDetail.map(async (container) => {
      const createdContainer = await db.add_shippment_container.create(
        {
          container_no: container.container_no,
          container_type: container.container_type,
          container_size: container.container_size,
          packet_uom: container.p_uom,
          gross_weight: container.total_gross_wt,
          net_weight: container.total_net_wt,
          po_id: po_id,
          po_num: po_num,
          status: 1,
        },
        { transaction }
      ); // Pass the transaction
      const lastInsertedId = createdContainer.add_shippment_container_id;

      const detailPromises = container.packing_info.map(async (detail) => {
        await db.shippment_container_detail.create(
          {
            add_shippment_container_id: lastInsertedId,
            packet_qty: detail.p_qty,
            no_package: detail.no_package,
            packet_weight: detail.p_net_wt,
            status: 1,
          },
          { transaction }
        ); // Pass the transaction
      });
      await Promise.all(detailPromises);
    });

    await Promise.all(containerPromises);

    // Step 10: Update PO status
    await db.po_master.update(
      {
        status: 11,
      },
      {
        where: { po_id },
        transaction, // Pass the transaction
      }
    );

    // Commit transaction if all operations are successful
    await transaction.commit();

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    // Rollback transaction if any error occurs
    console.error("Error creating shipment advise:", err);
    await transaction.rollback();
    next(err);
  }
};

const createCommercialInvoice = async (req, res, next) => {
  try {
    const {
      shippment_advise_id,
      pfi_id,
      pfi_num,
      po_id,
      po_num,
      item_list,
      ci_amount,
    } = req.body;
    console.log("req.body", req.body);
    console.log("item_list", item_list);
    const ci_series = await generateSeries("INVOICE");

    const result = await db.commercial_invoice.create({
      pfi_id: pfi_id,
      pfi_num: pfi_num,
      ci_num: ci_series,
      ci_amount,
      status: 1,
    });
    let lastInsertedId = result.commercial_invoice_id;

    await Promise.all(
      item_list.map(async (item) => {
        await db.shipment_advise_items.update(
          {
            ci_id: lastInsertedId,
            ci_rate: item.ci_rate,
            ci_line_total: item.line_total,
          },
          {
            where: {
              shipment_advise_item_id: item.shipment_advise_item_id,
            },
          }
        );
      })
    );

    await shippment_advise_master.update(
      {
        status: 6,
        ci_id: lastInsertedId,
        ci_num: ci_series,
      },
      {
        where: {
          shippment_advise_id: shippment_advise_id,
        },
      }
    );
    await db.Pfi_master.update(
      {
        status: 6,
      },
      {
        where: {
          pfi_id: pfi_id,
        },
      }
    );
    await db.po_master.update(
      {
        status: 15,
      },
      {
        where: {
          po_id: po_id,
        },
      }
    );
    res.status(201).json({ message: "Created Successfully" });
  } catch (err) {
    next(err);
  }
};

const createGrn = async (req, res, next) => {
  try {
    const { shippment_advise_id, pfi_id, po_id, ItemDataArr } = req.body;
    console.log("ABC", req.body);

    // if (ItemDataArr?.length > 0) {
    //   await Promise.all(
    //     db.ItemDataArr?.map(async (item) => {
    //       await db.shipment_advise_items.update(
    //         {
    //           grn_qty: item.grn_qty,
    //         },
    //         {
    //           shipment_advise_item_id: item.shipment_advise_item_id,
    //         }
    //       );
    //     })
    //   );
    // }

    if (ItemDataArr?.length > 0) {
      await Promise.all(
        ItemDataArr.map(async (item) => {
          await db.shipment_advise_items.update(
            {
              grn_qty: item.grn_qty,
            },
            {
              where: { shipment_advise_item_id: item.shipment_advise_item_id },
            }
          );
        })
      );
    }

    await shippment_advise_master.update(
      {
        status: 5,
      },
      {
        where: {
          shippment_advise_id: shippment_advise_id,
        },
      }
    );
    await db.Pfi_master.update(
      {
        status: 5,
      },
      {
        where: {
          pfi_id: pfi_id,
        },
      }
    );
    await db.po_master.update(
      {
        status: 12,
      },
      {
        where: {
          po_id: po_id,
        },
      }
    );
    res.status(201).json({ message: "Created Successfully" });
  } catch (err) {
    next(err);
  }
};

//Get Shipping Type Items
const getShippingAdviseTypeByID = async (req, res, next) => {
  console.log("ABC");
  const shipment_advise_id = req.query.shipment_advise_id;
  try {
    const result = await db.shipment_advise_items.findAll({
      attributes: [
        "shipment_advise_item_id",
        "shipment_advise_id",
        "po_id",
        "item_id",
        "item_type",
        "item_specification",
        "item_description",
        "opo_qty",
        "rate",
        "currency",
        "remarks",
        "quantity",
        "pack_size",
        "no_of_packs",
        "created_by",
        "updated_by",
        "status",
        "createdAt",
        "updatedAt",
        "po_item_id",
        "ci_id",
        "ci_rate",
        "grn_qty",
        "ci_line_total",
        "hsn_code",
        [db.sequelize.col("shipment_advise_items.pack_type"), "pack_type"],
        [
          db.sequelize.literal(
            "dbo.fn_GetPackageType(shipment_advise_items.pack_type)"
          ),
          "pack_type_name",
        ],
      ],
      include: [
        {
          model: db.po_items,
        },
      ],
      where: {
        shipment_advise_id: shipment_advise_id, // The value for the 'shippment_advise_id' field
        status: { [Op.ne]: 0 }, // The 'status' field should not be equal to 0
      },
    });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Get Commercial Invoice
const getShippingAdviseTerms = async (req, res, next) => {
  const shippment_advise_master_id = req.query.shippment_advise_master_id;
  try {
    if (!shippment_advise_master_id) {
      const result = await shippment_advise_master.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["shippment_advise_master_id", "DESC"]],
      });
      return res.status(200).json(result);
    } else {
      const result = await shippment_advise_master.findByPk(
        shippment_advise_master_id,
        {
          where: {
            status: { [Op.ne]: 0 },
          },
        }
      );
      return res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

// Update a penalty term by ID
const updateShippingAdviseTerm = async (req, res, next) => {
  const shippment_advise_master_id = req.query.shippment_advise_master_id;

  try {
    // Find the shipment mode by primary key
    const PenaltyTerms = await shippment_advise_master.findByPk(
      shippment_advise_master_id
    );

    // Update the shipment mode
    const { penalty_terms_name, status } = req.body;
    await PenaltyTerms.update({
      penalty_terms_name,
      status,
    });

    res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

// Delete a penalty term by ID
const deleteShippingAdviseTerm = async (req, res, next) => {
  const shippment_advise_master_id = req.query.shippment_advise_master_id;
  try {
    const result = await shippment_advise_master.update(
      { status: 0 },
      {
        where: {
          shippment_advise_master_id: shippment_advise_master_id,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

ShippingAdviseController = {
  createShippingAdviseTerm,
  getShippingAdviseTerms,
  updateShippingAdviseTerm,
  deleteShippingAdviseTerm,
  getShippingAdviseTypeByID,
  createGrn,
  createCommercialInvoice,
};

module.exports = ShippingAdviseController;
