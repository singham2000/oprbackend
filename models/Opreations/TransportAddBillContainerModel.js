module.exports = (sequelize, DataTypes) => {
    const transport_add_bill_container = sequelize.define(
      "transport_add_bill_container",
      {
        transport_add_bill_container_id: {
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
        transport_add_bill_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        ci_num: {
          type: DataTypes.STRING(55),
          allowNull: true,
        },
        type_of_container: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },
        no_of_container: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },
        rate: {
          type: DataTypes.DECIMAL(18, 2),
          allowNull: true,
        },
        payment_type: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        amount: {
          type: DataTypes.DECIMAL(18, 2),
          allowNull: true,
        },
        paid_amt: {
          type: DataTypes.DECIMAL(18, 2),
          allowNull: true,
        },
        payment_date: {
          type: DataTypes.DATEONLY,
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
        tableName: "transport_add_bill_container",
        timestamps: true,
      }
    );
    return transport_add_bill_container;
  };
  