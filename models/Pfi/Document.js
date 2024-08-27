module.exports = (sequelize, DataTypes) => {
  const document = sequelize.define(
    "document",
    {
      document_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      linked_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      table_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      doc_name: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      doc_base64: {
        type: DataTypes.TEXT,
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
      tableName: "document",
      timestamps: false,
    }
  );
  return document;
};
