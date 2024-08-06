const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const quotation_items = sequelize.define("quotation_items", {
    quo_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    quo_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    item_type: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    item_specification: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    item_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    opr_qty: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    opo_qtd: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    quote_qtd: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    rate: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    line_total: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    updated_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'quotation_items',
    timestamps: false
  });

  return quotation_items;
};
