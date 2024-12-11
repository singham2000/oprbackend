const db = require("../../models");
const { container_allocation, document, sequelize } = db;
const { Op } = require("sequelize");

// Create a new container_allocation
const createContainerAllocation = async (req, res, next) => {
  const { ci_id, ci_num, bl_num, containerArr } = req.body;
  try {
    const containerAllocations = containerArr.map((allocation) => ({
      ci_id: ci_id,
      ci_num: ci_num,
      bl_num: bl_num,
      transporter: allocation.transporter,
      no_of_container_allocated: allocation.no_of_container_allocated,
      type_of_container: allocation.type_of_container,
      rate: allocation.rate,
      tdo_given_date: allocation.tdo_given_date,
      delivery_location: allocation.delivery_location,
      payment_terms: allocation.payment_terms,
      status: 1,
    }));

    // Use bulkCreate to insert multiple records
    const result = await container_allocation.bulkCreate(containerAllocations);

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const createContainerAllocationAddBill = async (req, res, next) => {
  const {
    bl_num,
    ci_id,
    ci_num,
    payment_type,
    invoice_no,
    invoice_date,
    amount,
    vat,
    narration,
    tdo_given_date,
    payment_date,
    ref_number,
    payment_amount,
    paid_from_bank,
    wht_deducted,
    bank_name,
    containers,
  } = req.body;

  console.log(req.body);
  console.log("file: ", req.files);

  try {
    let result = await db.transport_add_bill.create({
      bl_num,
      ci_id,
      ci_num,
      payment_type,
      invoice_no,
      invoice_date,
      amount,
      vat,
      narration,
      tdo_given_date,
      payment_date,
      ref_number,
      payment_amount,
      paid_from_bank,
      wht_deducted,
      bank_name,
    });
    const lastInsertedId = result.transport_add_bill_id;

    if (containers && containers.length > 0) {
      await Promise.all(
        containers.map(async (item) => {
          await db.transport_add_bill_container.create({
            transport_add_bill_id: lastInsertedId,
            bl_num,
            ci_id,
            ci_num,
            type_of_container: item.type_of_container,
            no_of_container: item.no_of_container,
            rate: item.rate,
            payment_type: item.payment_type,
            amount: item.amount,
            paid_amt: item.paid_amt,
            payment_date: item.payment_date,
            status: 1,
          });
        })
      );
    }

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: lastInsertedId,
            table_name: "transport_add_bill",
            type: "Transport Module Container Allocation Add Bill Doc",
            doc_name: `${file.fieldname}-${file.originalname}`,
            doc_base64: base64,
            title: "Add Bill Document in Container Allocation",
            status: 1,
          });
        })
      );
    }

    res.status(200).json({ message: "Bill Created Successfully" });
  } catch (err) {
    next(err);
  }
};

const getContainerAllocationAddBill = async (req, res, next) => {
  try {
    const result = await container_allocation.findAll({
      where: {
        bill_status: { [Op.eq]: 1 },
      },
      order: [["container_allocation_id", "DESC"]],
      attributes: [
        "delivery_location",
        "bll_party",
        "container_allocation_id",
        "bill_payment_type",
        "bill_invoice_num",
        "bill_invoice_date",
        "bill_amount",
        "bill_vat",
        "bill_deduction",
        "bill_narration",
        [
          sequelize.literal("dbo.fn_transportPaymentType(bill_payment_type)"),
          "payment_type",
        ],
      ],
    });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// Get Commercial Invoice
const getContainerAllocation = async (req, res, next) => {
  const container_allocation_id = req.query.container_allocation_id;
  try {
    if (!container_allocation_id) {
      const result = await container_allocation.findAll({
        where: {
          status: { [Op.ne]: 0 },
        },
        order: [["container_allocation_id", "DESC"]],
        attributes: [
          "transporter",
          "container_count",
          "container_types",
          "tdo_given_date",
          "rate",
          "delivery_location",
          "payment_terms",
          "container_allocation_id",
          "pfi_id",
          "ci_id",
          "bill_narration",
          [
            sequelize.literal("dbo.fn_containerType(container_types)"),
            "type_of_container",
          ],
          [
            sequelize.literal("dbo.fn_containerPaymentTerm(payment_terms)"),
            "payment_term",
          ],
        ],
      });
      return res.status(200).json(result);
    } else {
      const result = await container_allocation.findByPk(
        container_allocation_id,
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
const updateContainerAllocation = async (req, res, next) => {
  console.log("body: ", req.body);
  console.log("file: ", req.files);

  try {
    const {
      container_allocation_id,
      tdo_handover_date,
      transporter,
      eir_received_date,
    } = req.body;

    const ContainerAllocation = await container_allocation.findByPk(
      container_allocation_id
    );

    if (!ContainerAllocation) {
      return res
        .status(404)
        .json({ message: "Container Allocation not found" });
    }

    if (req.files && req.files.length > 0) {
      const DocumentContainerAllocation = await container_allocation.findAll({
        where: {
          table_name: "container_allocation",
          linked_id: container_allocation_id,
        },
      });

      if (!DocumentContainerAllocation) {
        await Promise.all(
          req.files.map(async (file) => {
            const base64 = file.buffer.toString("base64");
            await document.create({
              linked_id: container_allocation_id,
              table_name: "container_allocation",
              type: "Transport Module Container Allocation EIR Doc",
              doc_name: `${file.fieldname}-${file.originalname}`,
              doc_base64: base64,
              title: "EIR File Document in Container Allocation",
              status: 1,
            });
          })
        );
      } else {
        await Promise.all(
          req.files.map(async (file) => {
            const base64 = file.buffer.toString("base64");
            await DocumentContainerAllocation.update({
              doc_name: `${file.fieldname}-${file.originalname}`,
              doc_base64: base64,
              status: 1,
            });
          })
        );
      }
    }

    if (tdo_handover_date) {
      await ContainerAllocation.update({ tdo_given_date: tdo_handover_date });
    }
    if (eir_received_date) {
      await ContainerAllocation.update({ eir_received_date });
    }
    if (transporter) {
      await ContainerAllocation.update({ transporter });
    }

    res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

// Delete a penalty term by ID
const deleteContainerAllocation = async (req, res, next) => {
  const container_allocation_id = req.query.container_allocation_id;
  const array = container_allocation_id
    .split(",")
    .map((item) => Number(item.trim()));
  console.log(array);
  try {
    const result = await container_allocation.update(
      { status: 0 },
      {
        where: {
          container_allocation_id: array,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

ContainerAllocationController = {
  createContainerAllocation,
  getContainerAllocation,
  updateContainerAllocation,
  deleteContainerAllocation,
  createContainerAllocationAddBill,
  getContainerAllocationAddBill,
};

module.exports = ContainerAllocationController;
