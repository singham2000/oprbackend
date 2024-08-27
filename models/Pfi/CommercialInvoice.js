module.exports = (sequelize, DataTypes) => {
  const commercial_invoice = sequelize.define(
    "commercial_invoice",
    {
      commercial_invoice_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      ci_sender: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      ci_sender_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      customer: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      invoice_num: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      invoice_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      opr_num: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      shipment_type: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      mode: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      full_final: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      total_package: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      country_supply: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      country_origin: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      port_of_loading: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      port_dc: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      final_destination: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      country_final_destination: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      delivery_terms: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      payment_terms: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      bl_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      bl_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      vessel_name: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      vessel_no: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      shipping_line_name: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      eta_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      free_days: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      total_net_weight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      total_gross_weight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      uom: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      seal_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      cbm: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      invoice_remarks: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      inland_charges: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      freight_charges: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      inspection_charges: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      created_on: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      updated_on: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pfi_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pfi_num: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      tableName: "commercial_invoice",
      timestamps: false,
    }
  );
  return commercial_invoice;
};
