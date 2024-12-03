module.exports = (sequelize, DataTypes) => {
  const add_shippment_container = sequelize.define(
    "add_shippment_container",
    {
      add_shippment_container_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      po_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      po_num: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      container_no: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      container_type: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      container_size: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      packet_uom: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      net_weight: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      gross_weight: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      package_detail: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      bl_num: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      soncap_amount: {
        type: DataTypes.DECIMAL(18, 2),
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
      tableName: "add_shippment_container",
      timestamps: false,
    }
  );

  add_shippment_container.associate = (models) => {
    add_shippment_container.hasMany(models.shippment_container_detail, {
      foreignKey: "add_shippment_container_id",
    });
  };

  return add_shippment_container;
};
