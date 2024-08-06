// const { company_master } = require(".");

module.exports = (sequelize, DataTypes) => {
  const pfi_line_item = sequelize.define("pfi_line_item", {
    pfi_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    po_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pfi_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    payment_request_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rfq_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    item_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    po_qty: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    rate: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    margin_percent: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_by: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'pfi_line_item',
    timestamps: true
  });

  return pfi_line_item;
};
