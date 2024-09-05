const db = require("../../models");
const { container_allocation, document } = db;
const { Op } = require("sequelize");

// Create a new container_allocation
const createContainerAllocation = async (req, res, next) => {
  try {
    const containerAllocations = req.body.map((allocation) => ({
      ci_id: allocation.ci_id,
      ci_num: allocation.ci_num,
      pfi_id: allocation.pfi_id,
      pfi_num: allocation.pfi_num,
      form_m_id: allocation.form_m_id,
      form_m_num: allocation.form_m_num,
      transporter: allocation.transporter,
      container_count: allocation.container_count,
      container_types: allocation.container_types,
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
    container_allocation_id,
    party,
    payment_type,
    invoice_no,
    invoice_date,
    amount,
    vat,
    deduction,
    narration,
  } = req.body;

  console.log(req.body);
  console.log("file: ", req.files);

  try {
    const ContainerAllocation = await container_allocation.findByPk(
      container_allocation_id
    );

    await ContainerAllocation.update({
      bll_party: party,
      bill_payment_type: payment_type,
      bill_invoice_num: invoice_no,
      bill_invoice_date: invoice_date,
      bill_amount: amount,
      bill_vat: vat,
      bill_deduction: deduction,
      bill_narration: narration,
      bill_status: 1,
    });

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const base64 = file.buffer.toString("base64");
          await document.create({
            linked_id: container_allocation_id,
            table_name: "container_allocation",
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
              status: 1
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
