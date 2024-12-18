module.exports = (sequelize, DataTypes) => {
  const vendor_item_mapping = sequelize.define(
    "vendor_item_mapping",
    {
      vendor_item_mapping_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      item_rate: {
        type: DataTypes.DECIMAL(18,2),
        allowNull: true,
      },
      unit_of_measurement: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      is_pre_approved: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      pre_approval_valid_upto: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
    },
    {
      tableName: "vendor_item_mapping",
      timestamps: true,
    }
  );
  
  return vendor_item_mapping;
};
