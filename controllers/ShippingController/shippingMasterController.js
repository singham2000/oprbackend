const { ShippingMaster, commercial_invoice, form_m, letter_of_credit } = require("../../models"); // Adjust the path as necessary

// Create a new shipping info record
exports.createShippingMaster = async (req, res) => {
  try {
    const {
      ci_id,
      shipping_doc_receipt_date_ho,
      received_from_bank_date_ho,
      obl_sent_apapa_date,
      obl_received_date,
      created_by,
    } = req.body;
    await ShippingMaster.create({
      ci_id,
      shipping_doc_receipt_date_ho,
      received_from_bank_date_ho,
      obl_sent_apapa_date,
      obl_received_date,
      created_by,
    });

    res.status(201).json({ msg: "OBL Receipt APAPA Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new shipping info record
exports.addcomplianceinShippingMaster = async (req, res) => {
  try {
    const {
      ci_id,
      nafdac,
      son,
      idec,
      cria,
      fast_track_clearing,
      agency,
      agent,
      updated_by,
    } = req.body;
    await ShippingMaster.update(
      {
        nafdac,
        son,
        idec,
        cria,
        fast_track_clearing,
        agency,
        agent,
        updated_by,
      },
      {
        where: { ci_id },
      }
    );

    res.status(200).json({ msg: "Shipping Entry APAPA Updated Success fully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Eta in shhipin recorad againg ci_ic
exports.addETAinShippingMaster = async (req, res) => {
  console.log(req.body);
  try {
    const { ci_id, eta, updated_by } = req.body;
    await ShippingMaster.update(
      {
        eta,
        updated_by,
      },
      {
        where: { ci_id },
      }
    );

    res.status(200).json({ msg: "ETA added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update terminal view (discharge and transfer terminal) in the shipping record against ci_id
exports.updateShippingDetailsByCiId = async (req, res) => {
  console.log(req.body);
  try {
    const { ci_id } = req.body;
    const {
      discharge_terminal,
      transfer_terminal,
      supplier_name,
      ci_date,
      bl_no,
      bl_date,
      pfi_num,
      formm_num,
      formm_date,
      no_of_container,
      agency_name,
      free_days,
      cbm,
      eta,
      updated_by,
    } = req.body;

    // Dynamically build the update object with only the fields that are not undefined or null
    const updateFields = {};

    if (discharge_terminal !== undefined)
      updateFields.discharge_terminal = discharge_terminal;
    if (transfer_terminal !== undefined)
      updateFields.transfer_terminal = transfer_terminal;
    if (supplier_name !== undefined) updateFields.supplier_name = supplier_name;
    if (ci_date !== undefined) updateFields.ci_date = ci_date;
    if (bl_no !== undefined) updateFields.bl_no = bl_no;
    if (bl_date !== undefined) updateFields.bl_date = bl_date;
    if (pfi_num !== undefined) updateFields.pfi_num = pfi_num;
    if (formm_num !== undefined) updateFields.formm_num = formm_num;
    if (formm_date !== undefined) updateFields.formm_date = formm_date;
    if (no_of_container !== undefined)
      updateFields.no_of_container = no_of_container;
    if (agency_name !== undefined) updateFields.agency_name = agency_name;
    if (free_days !== undefined) updateFields.free_days = free_days;
    if (cbm !== undefined) updateFields.cbm = cbm;
    if (eta !== undefined) updateFields.eta = eta;
    updateFields.updated_by = updated_by;

    // Perform the update
    const [updated] = await ShippingMaster.update(updateFields, {
      where: { ci_id },
    });

    if (updated) {
      const updatedShippingRecord = await ShippingMaster.findOne({
        where: { ci_id },
      });
      res.status(200).json({
        message: "Shipping details updated successfully",
        data: updatedShippingRecord,
      });
    } else {
      res.status(404).json({ message: "Shipping record not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all shipping info records
exports.getAllShippingMasters = async (req, res) => {
  try {
    const ShippingMasters = await ShippingMaster.findAll({
      include: [
        { model: commercial_invoice, as: "ci" },
        { model: form_m, letter_of_credit, as: "FormM" },
        { model: letter_of_credit, as: "LC" },
      ],
    });
    res.status(200).json(ShippingMasters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single shipping info record by ci_id
exports.getShippingMasterByCiId = async (req, res) => {
  try {
    const { ci_id } = req.query; // Extract ci_id from query parameters
    if (!ci_id) {
      return res
        .status(400)
        .json({ message: "ci_id query parameter is required" });
    }

    const shippingMaster = await ShippingMaster.findOne({ where: { ci_id } });

    if (!shippingMaster) {
      return res.status(404).json({ message: "ShippingMaster not found" });
    }

    res.status(200).json(shippingMaster);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single shipping info record by id
exports.getShippingMasterById = async (req, res) => {
  try {
    const { id } = req.params;
    const ShippingMaster = await ShippingMaster.findByPk(id);
    if (!ShippingMaster) {
      return res.status(404).json({ message: "ShippingMaster not found" });
    }
    res.status(200).json(ShippingMaster);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a shipping info record by id
exports.updateShippingMaster = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      shipping_doc_receipt_date_ho,
      received_from_bank_date_ho,
      obl_sent_apapa_date,
      obl_received_date,
    } = req.body;
    const [updated] = await ShippingMaster.update(
      {
        shipping_doc_receipt_date_ho,
        received_from_bank_date_ho,
        obl_sent_apapa_date,
        obl_received_date,
      },
      {
        where: { ci_id: id },
      }
    );
    if (updated) {
      const updatedShippingMaster = await ShippingMaster.findByPk(id);
      res.status(200).json(updatedShippingMaster);
    } else {
      res.status(404).json({ message: "ShippingMaster not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a shipping info record by id
exports.deleteShippingMaster = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ShippingMaster.destroy({
      where: { ci_id: id },
    });
    if (deleted) {
      res.status(204).json({ message: "ShippingMaster deleted successfully" });
    } else {
      res.status(404).json({ message: "ShippingMaster not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
