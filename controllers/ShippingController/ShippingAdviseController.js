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
      quo_id,
      additional_information,
      doc_list,
      cpackageDetail,
      grnData,
    } = req.body;

    const result = await shippment_advise_master.create({
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
    });

    const lastInsertedId = result.shippment_advise_id;

    if (additional_information && additional_information.length > 0) {
      await Promise.all(
        additional_information.map(async (item) => {
          await shippment_advise_additional_instruction.create({
            shippment_advise_id: lastInsertedId,
            po_id: po_id,
            po_num: po_num,
            other: item.other,
            status: 1,
          });
        })
      );
    }

    if (grnData?.po_item_id_lists && grnData?.po_item_id_lists.length > 0) {
      await Promise.all(
        grnData?.po_item_id_lists.map(async (item) => {
          await db.shipment_advise_items.create({
            shipment_advise_id: lastInsertedId,
            po_id: po_id,
            po_num: po_num,
            item_id: item.item_id,
            po_item_id: item.po_item_id,
            no_of_packs: item.no_of_packs,
            pack_size: item.pack_size,
            pack_type: item.pack_type,
            quantity: item.grn_qty,
            status: 1,
          });
        })
      );
    }

    const updatedShippingAdviseDocs = doc_list.map((data, index) => ({
      quotation_id: quo_id,
      doc_id: lastInsertedId,
      module: "shippment_advise_master",
      q_doc_remarks: data.name,
      q_doc_name: data.remark,
      q_doc_filename: req.files[index]?.originalname,
      q_doc_file: req.files[index]?.buffer.toString("base64"),
    }));

    await db.QuoDoc.bulkCreate(updatedShippingAdviseDocs);

    //Add
    // Step 1: Create containers
    const containerPromises = cpackageDetail.map(async (container) => {
      const createdContainer = await db.add_shippment_container.create({
        container_no: container.container_no,
        container_type: container.container_type,
        container_size: container.container_size,
        packet_uom: container.p_uom,
        gross_weight: container.total_gross_wt,
        net_weight: container.total_net_wt,
        po_id: po_id,
        po_num: po_num,
        status: 1,
      });
      console.log(createdContainer.add_shippment_container_id);
      const lastInsertedId = createdContainer.add_shippment_container_id;

      // Create details for each container
      const detailPromises = container.packing_info.map(async (detail) => {
        await db.shippment_container_detail.create({
          add_shippment_container_id: lastInsertedId,
          packet_qty: detail.p_qty,
          no_package: detail.no_package,
          packet_weight: detail.p_net_wt,
          status: 1,
        });
      });
      await Promise.all(detailPromises);
    });

    // Wait for all containers and their details to be created
    await Promise.all(containerPromises);

    await db.po_master.update(
      {
        status: 11,
      },
      {
        where: { po_id },
      }
    );

    return res.status(201).json({ message: "Submit Successfully" });
  } catch (err) {
    console.error("Error creating shippment_advise_master term:", err);
    next(err);
  }
};

const createCommercialInvoice = async (req, res, next) => {
  try {
    const { shippment_advise_id, pfi_id, pfi_num, po_id, po_num, item_list } =
      req.body;
    console.log("req.body", req.body);
    console.log("item_list", item_list);
    const ci_series = await generateSeries("INVOICE");

    const result = await db.commercial_invoice.create({
      pfi_id: pfi_id,
      pfi_num: pfi_num,
      ci_num: ci_series,
      status: 1,
    });
    let lastInsertedId = result.commercial_invoice_id;

    await Promise.all(
      item_list.map(async (item) => {
        await db.shipment_advise_items.update(
          {
            ci_id: lastInsertedId,
            ci_rate: item.ci_rate,
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
    const { shippment_advise_id, pfi_id, po_id } = req.body;
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
