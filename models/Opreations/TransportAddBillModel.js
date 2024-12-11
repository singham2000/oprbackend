module.exports = (sequelize, DataTypes) => {
  const transport_add_bill = sequelize.define(
    "transport_add_bill",
    {
      transport_add_bill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      bl_num: {
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
      payment_type: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      invoice_no: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      invoice_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      amount: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      vat: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      narration: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      tdo_given_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      ref_number: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      payment_amount: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      paid_from_bank: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      wht_deducted: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      bank_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING(50),
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
      tableName: "transport_add_bill",
      timestamps: true,
    }
  );

  transport_add_bill.associate = (models) => {
    transport_add_bill.hasMany(models.transport_add_bill_container, {
      foreignKey: "transport_add_bill_id",
    });
  }


  return transport_add_bill;
};
