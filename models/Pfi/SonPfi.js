module.exports = (sequelize, DataTypes) => {
  const son_pfi = sequelize.define(
    "son_pfi",
    {
      son_pfi_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      pfi_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pfi_num: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      pfi_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      permit_type: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      son_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      invoice_received_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      pay_not: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      permit_num: {
        type: DataTypes.STRING(255),
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
      tableName: "son_pfi",
      timestamps: false,
    }
  );
  return son_pfi;
};
