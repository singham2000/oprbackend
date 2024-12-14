module.exports = (sequelize, DataTypes) => {
    const shippment_container_detail = sequelize.define(
      "shippment_container_detail",
      {
        shippment_container_detail_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        add_shippment_container_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        uom: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        packet_qty: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        no_package: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        packet_weight: {
          type: DataTypes.STRING(155),
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
        tableName: "shippment_container_detail",
        timestamps: false,
      }
    );
  
    return shippment_container_detail;
  };
  