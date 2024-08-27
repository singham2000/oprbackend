module.exports = (sequelize, DataTypes) => {
  const operations_son_lapse = sequelize.define(
    "operations_son_lapse",
    {
      operations_son_lapse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      operations_son_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      lapse_type: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      lapse_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      lapse_narration: {
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
      tableName: "operations_son_lapse",
      timestamps: false,
    }
  );
  return operations_son_lapse;
};
