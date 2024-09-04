module.exports = (sequelize, DataTypes) => {
  const ItemGroupMaster = require('./item_group_master.js')(sequelize, DataTypes)
  return sequelize.define('item_sub_group_master', {
    item_sub_group_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    item_parent_group_id: {
      type: DataTypes.INTEGER,
      references: {
        model: ItemGroupMaster,
        key: 'item_group_id'
      },
      allowNull: true
    },
    item_sub_group_name: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    item_sub_group_description: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    created_by: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    tableName: 'item_sub_group_master',
    timestamps: true // Assuming you are not using Sequelize's automatic createdAt and updatedAt fields
  });

  // Set up association
  ItemSubGroupMaster.belongsTo(ItemGroupMaster, { foreignKey: 'item_parent_group_id' });
}

