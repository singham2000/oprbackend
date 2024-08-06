module.exports = (sequelize, DataTypes) => {
  const OprItems = sequelize.define('OprItems', {
    opr_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    opr_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    stock_in_transit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    stock_in_hand: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    monthly_consumption: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    item_description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rfq_id: {
      type: DataTypes.INTEGER,
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
  }, {
    tableName: 'opr_items',
    timestamps: true,
  });

  // Define associations
  OprItems.associate = (models) => {
    OprItems.belongsTo(models.company_master, { foreignKey: 'company_id' });
    OprItems.belongsTo(models.opr_master, { foreignKey: 'opr_id' });
    OprItems.belongsTo(models.ItemsMaster, { foreignKey: 'item_id' });
    OprItems.belongsTo(models.AddressMaster, { foreignKey: 'address_id' });
    // OprItems.belongsTo(models.opr_master, { foreignKey: 'opr_id)' });
    // opr_master.belongsTo(models.Vertical, { foreignKey: 'vertical_id' });
    // opr_master.belongsTo(models.Division, { foreignKey: 'division_id' });
    // opr_master.belongsTo(models.ShipMode, { foreignKey: 'shipment_mode_id' });
    // opr_master.belongsTo(models.DeliveryTimeline, { foreignKey: 'delivery_timeline_id' });
    // opr_master.belongsTo(models.Department, { foreignKey: 'department_id' });
    // opr_master.belongsTo(models.BuyingHouse, { foreignKey: 'buying_house_id' });
  };


  return OprItems;
};
