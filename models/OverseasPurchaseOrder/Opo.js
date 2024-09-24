module.exports = (sequelize, DataTypes) => {
  const opo_master = sequelize.define(
    "opo_master",
    {
      opo_master_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      opo_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      quo_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quo_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      opr_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      opr_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total_cost: {
        type: DataTypes.DECIMAL(10, 2),
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
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "opo_master",
      timestamps: true,
    }
  );

  opo_master.associate = (models) => {
    opo_master.belongsTo(models.quotation_master, {
        foreignKey: "quo_id",
    });
    opo_master.belongsTo(models.OprMaster, {
        foreignKey: "opr_id",
    });
    opo_master.belongsTo(models.vendor, {
        foreignKey: "vendor_id",
    });
    opo_master.hasMany(models.opo_items, {
        foreignKey: "opo_id",
    });
}

  return opo_master;
};
