module.exports = (sequelize, DataTypes) => {
  const paar = sequelize.define(
    "paar",
    {
      paar_id: {
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
      paar_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      paar_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      received_on: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      exchange_rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      fob_invoice_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      fob_uplift: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      freight_uplift: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      insurance_uplift: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      cif_value_naira: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      remarks: {
        type: DataTypes.STRING(255),
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
      tableName: "paar",
      timestamps: false,
    }
  );
  return paar;
};
