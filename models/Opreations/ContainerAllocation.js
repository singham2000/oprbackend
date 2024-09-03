module.exports = (sequelize, DataTypes) => {
  const container_allocation = sequelize.define(
    "container_allocation",
    {
      container_allocation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      pfi_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pfi_num: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      form_m_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      form_m_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      ci_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ci_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      transporter: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      container_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      container_types: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rate: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      tdo_given_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      delivery_location: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      payment_terms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      bill_payment_type: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bill_invoice_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      bill_invoice_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      bill_amount: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      bill_vat: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      bill_deduction: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      bill_narration: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      bll_party: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      bill_status: {
        type: DataTypes.INTEGER,
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
    },
    {
      tableName: "container_allocation",
      timestamps: false,
    }
  );
  return container_allocation;
};
