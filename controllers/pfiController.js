const {
  assessment,
  Pfi_master,
  PaymentRequestMaster,
  po_master,
  sequelize,
  Pfi_line_items,
  item,
  insurance,
  form_m,
  letter_of_credit,
  son_pfi,
  CompanyMaster,
  operations_nafdac,
  paar,
  operations_nafdac_master,
  govt_charges,
  nafdac_pfi,
} = require("../models");
const db = require("../models");

const formattedDateTime = require("../middleware/time");
const { Op, where } = require("sequelize");
const { generateSeries } = require("./seriesGenerate");
const { getQuotationItemByQuoId } = require("./quotationItemsController");

const getPfi = async (req, res, next) => {
  try {
    // Check if ID is provided in the request parameters
    const { pfi_id } = req.query;

    // If an ID is provided, fetch a single record by ID
    if (pfi_id) {
      const result = await Pfi_master.findOne({
        where: { pfi_id }, // Assuming 'id' is the primary key
        include: [
          { model: insurance },
          { model: form_m },
          { model: letter_of_credit },
          { model: son_pfi },
          { model: assessment },
          // { model: ShippingMaster },
          { model: CompanyMaster },
          { model: operations_nafdac },
          { model: paar },
          { model: operations_nafdac_master },
          { model: govt_charges },
          { model: nafdac_pfi },
        ],
      });

      // If no record is found, send a 404 response
      if (!result) {
        return res.status(404).json({ message: "Pfi_master not found" });
      }

      return res.status(200).json(result);
    }

    // If no ID is provided, fetch all records
    const results = await Pfi_master.findAll({
      include: [
        { model: insurance },
        { model: form_m },
        { model: letter_of_credit },
        { model: son_pfi },
        { model: assessment },
        // { model: ShippingMaster },
        { model: CompanyMaster },
        { model: operations_nafdac },
        { model: paar },
        { model: operations_nafdac_master },
        { model: govt_charges },
        { model: nafdac_pfi },
        // { model: db.shippment_instructions },
      ],
    });

    res.status(200).json(results);
  } catch (error) {
    console.error("Error calling UDF:", error);
    next(error); // Pass the error to the error-handling middleware
  }
};

const getPfiData = async (req, res, next) => {
  try {
    const result = await Pfi_master.findAll({
      attributes: [
        "pfi_id",
        "pfi_num",
        "opo_selected_id",
        "opo_selected_num",
        "opo_ids",
        "opo_nums",
        "remarks",
        "amount",
        "createdAt",
        "updatedAt",
        "created_by",
        "updated_by",
        "status",
        "pfi_description",
      ],
      include: [
        { model: db.commercial_invoice },
        { model: db.VendorsBanksDetailsMaster },
        { model: insurance },
        { model: form_m },
        { model: letter_of_credit },
        { model: son_pfi },
        { model: assessment },
        // { model: ShippingMaster },
        { model: CompanyMaster },
        { model: operations_nafdac },
        { model: paar },
        { model: operations_nafdac_master },
        { model: govt_charges },
        { model: nafdac_pfi },
        {
          model: db.Pfi_line_items,
          include: [
            {
              model: db.ItemsMaster,
              attributes: [
                "item_series",
                "item_name",
                "item_code",
                "factory",
                "item_type",
                "item_description",
                "hsn_code",
                "super_category_id",
                "group_name",
                "sub_group",
                "cria",
                "nafdac_name",
                "nafdac_category",
                "tolerance",
                "vendors",
                "lead_time",
                "quantity_in_stock",
                "quantity_on_order",
                "reorder_level",
                "unit_price",
                "msrp",
                "uom_id",
              ],
            },
          ],
        },
        {
          model: db.opo_master,
          include: [
            { model: db.po_master },
            {
              model: db.OprMaster,
              attributes: [
                "opr_id",
                "opr_num",
                "vertical_id",
                "company_id",
                "opr_date",
                "division_id",
                "buy_from",
                "buying_house_id",
                "shipment_mode_id",
                "delivery_timeline_id",
                "department_id",
                "requested_by",
                "no_quot_email_alert",
                "remarks",
                "suppliers",
                "item_category_id",
                [
                  db.sequelize.literal(
                    "dbo.fn_ShipmentModeName(shipment_mode_id)"
                  ),
                  "shipment_mode_name",
                ],
              ],
              include: [
                {
                  model: db.ItemSuperGroupMaster,
                  attributes: ["item_super_group_name"],
                },
                {
                  model: db.BuyingHouse,
                },
                {
                  model: db.CompanyMaster,
                  include: [{ model: db.AddressMaster }],
                },
              ],
            },
            {
              model: db.quotation_master,
              include: [
                {
                  model: db.delivery_terms_quo,
                  attributes: ["delivery_terms_name"],
                },
                { model: db.vendor },
                {
                  model: db.rfq,
                  attributes: [
                    "rfq_num",
                    "remarks",
                    "vendor_list",
                    "req_doc_id",
                    "port_of_destination",
                    "delivery_timeline_in_weeks",
                    [
                      db.sequelize.literal(
                        "dbo.fn_GetPortDestinationName(port_of_destination)"
                      ),
                      "port_destination_name",
                    ],
                  ],
                },
                {
                  model: db.additional_cost,
                  // attributes: ["charge_name", "charge_amount", "heading"],
                },
              ],
            },
          ],
        },
      ],
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error calling UDF:", error);
    throw error;
  }
};

const addBank = async (req, res, next) => {
  let { pfi_id, v_banks_detail_id } = req.body;
  try {
    const result = await Pfi_master.update(
      {
        v_banks_detail_id: v_banks_detail_id,
      },
      {
        where: {
          pfi_id: pfi_id,
        },
      }
    );
    res.status(200).json("Bank Added SuccessFully");
  } catch (error) {
    console.error("Error calling UDF:", error);
    throw error;
  }
};

const getPfibyPoid = async (req, res, next) => {
  let { po_id } = req.query;
  try {
    const result = await Pfi_master.findAll({
      where: {
        po_id: po_id,
      },
    });
    await result.forEach(
      (item) => (item.dataValues.company_name = "ABCD Company")
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error calling UDF:", error);
    throw error;
  }
};

// Controller method to delete by id
const deletePfiyId = async (req, res, next) => {
  const { po_id, company_id } = req.query;
  try {
    const result = await po_master.update(
      { status: 0 },
      {
        where: {
          po_id: po_id,
        },
      }
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
const getPfibyid = async (req, res, next) => {
  let { pfi_id, company_id } = req.query;
  try {
    let query = `select pfi_master.pfi_num,company_master.company_name from pfi_master
                inner join company_master
                on company_master.company_id = pfi_master.company_id
                where pfi_id = ${pfi_id}`;

    let [result, metadata] = await sequelize.query(query);

    let pfi_items2 = await Pfi_line_items.findAll({
      where: {
        [Op.and]: [{ pfi_id }, { company_id }],
      },
    });
    res.status(200).json({ pfi_details: result, item_list: pfi_items2 });
  } catch (err) {
    next(err);
  }
};

// Controller method to Create po with status 1
const genratePfi = async (req, res, next) => {
  let {
    amount,
    opo_ids,
    opo_nums,
    selectedOPOid,
    selectedOPOnum,
    pfiDescription,
    remarks,
    items,
    shipment_mode,
    payment_mode,
    addAdditinalCostArr,
    additinalCostDataArr,
    additinalCostFreigthDataArr,
    quo_id,
    quo_num,
    for_delivery_term,
    totalFreigth,
  } = req.body;

  console.log(req.body);

  const transaction = await db.sequelize.transaction(); // Start a new transaction

  try {
    // Generate PFI number
    const doc_code = "PFI";
    const pfi_num = await generateSeries(doc_code);

    // Generate PFI entry
    const PFI_response = await Pfi_master.create(
      {
        pfi_num: pfi_num,
        opo_selected_id: selectedOPOid,
        opo_selected_num: selectedOPOnum,
        remarks: remarks,
        pfi_description: pfiDescription,
        opo_nums,
        opo_ids,
        amount,
        shipment_mode,
        payment_mode,
        status: 1,
      },
      { transaction }
    ); // Pass the transaction object

    const LastInsertedId = PFI_response.pfi_id;

    // Handle freight data (update or create)
    let freightData = await db.additional_cost.findAll({
      where: {
        quo_id: quo_id,
        charges_by: "Buyer",
        charge_name: "total_freight_charges",
        heading: "Freight_Charges",
      },
      transaction, // Pass the transaction
    });

    await db.additional_cost.create(
      {
        reference_id: LastInsertedId,
        quo_id,
        quo_num,
        charge_name: "total_freight_charges",
        reference_table_name: "pfi_master",
        charge_amount: totalFreigth,
        charges_by: "Buyer",
        heading: "Freight_Charges",
        for_delivery_term,
        status: 1,
      },
      { transaction }
    ); // Pass the transaction

    // Handle additional freight charges (create entries)
    if (additinalCostFreigthDataArr.length > 0) {
      await Promise.all(
        additinalCostFreigthDataArr.map(async (item) => {
          await db.additional_cost_freigth.create(
            {
              reference_id: LastInsertedId,
              quo_id,
              quo_num,
              number_container: item.number_container,
              type_container: item.type_container,
              rate: item.rate,
              total_freigth: item.line_total,
              reference_table_name: "pfi_master",
              charges_by: "Buyer",
              heading: "Freigth Charges",
              for_delivery_term,
              status: 1,
            },
            { transaction }
          ); // Pass the transaction
        })
      );
    }

    // Handle additional cost data (create entries)
    let filterAdditinalCostDataArr = additinalCostDataArr.filter(
      (i) => i.add_amount > 0 && i.charge_name !== "Total"
    );
    if (filterAdditinalCostDataArr.length > 0) {
      await Promise.all(
        filterAdditinalCostDataArr.map(async (i) => {
          await db.additional_cost.create(
            {
              reference_id: LastInsertedId,
              quo_id,
              quo_num,
              charge_name: i.charge_name,
              reference_table_name: "pfi_master",
              charge_amount: i.add_amount,
              charges_by: "Buyer",
              heading: i.heading,
              for_delivery_term,
              status: 1,
            },
            { transaction }
          ); // Pass the transaction
        })
      );
    }

    // Handle additional charges (create entries)
    if (addAdditinalCostArr.length > 0) {
      await Promise.all(
        addAdditinalCostArr.map(async (i) => {
          await db.additional_cost.create(
            {
              reference_id: LastInsertedId,
              quo_id,
              quo_num,
              charge_name: i.charge_name,
              reference_table_name: "pfi_master",
              charge_amount: i.charge_amount,
              charges_by: "Buyer",
              heading: "Add Charges in PFI",
              for_delivery_term,
              status: 1,
            },
            { transaction }
          ); // Pass the transaction
        })
      );
    }

    // Create PFI line items (bulk insert)
    const pfiItems = await Promise.all(
      items.map(async (item) => {
        console.log("item.line_total_margin", item.line_total_margin);

        const result2 = await Pfi_line_items.create(
          {
            pfi_id: LastInsertedId, // Link the OPO item to the newly created OPO
            margin_percent: item.margin_percent,
            line_total: item.line_total_margin,
            opo_qty: item.opr_qty,
            rate: item.rate_with_margin,
            opo_item_id: item.opo_items_id,
            no_packs: item.no_packs, // Spread the item properties
            pack_size: item.pack_size,
            pack_type: item.pack_type,
            item_id: item.item_id,
            item_code: item.item_code,
            item_name: item.item_name,
            item_type: item.item_type,
            remarks: item.remarks,
            no_packs: item.no_packs,
            status: 1, // Active status
          },
          { transaction }
        ); // Pass the transaction
        return result2; // Return the created item
      })
    );

    await db.opo_master.update(
      { status: 5 },
      { where: { opo_master_id: selectedOPOid } }
    );

    // Commit the transaction if everything is successful
    await transaction.commit();

    res.status(201).json({ message: "Pfi Submit Successfully" });
  } catch (err) {
    // Rollback the transaction in case of an error
    await transaction.rollback();
    next(err); // Pass the error to the next error handler
  }
};

const getcompanylistPoNumber = async (req, res, next) => {
  try {
    let { po_id } = req.query;
    console.log("po_id", po_id);
    let query = `select  distinct  opr_items.company_id ,dbo.fn_companyname(opr_items.company_id)  as comp_name
            from opr_items            
			inner join po_items
			on opr_items.rfq_id =  po_items.rfq_id
			where  po_items.po_id=${po_id}`;

    let [result, metadata] = await db.sequelize.query(query);
    await result.forEach(
      (item, index) => (item.status = index % 2 == 0 ? 1 : 0)
    );

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Controller method to Create po with status 1
const genratePfi2 = async (req, res, next) => {};

module.exports = {
  genratePfi,
  getPfi,
  genratePfi2,
  getPfibyPoid,
  getPfibyid,
  getPfiData,
  addBank,
};
