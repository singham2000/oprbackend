module.exports = (sequelize, DataTypes) => {
  const nafdac_clearance = sequelize.define(
    "nafdac_clearance",
    {
      nafdac_clearance_id: {
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
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      ci_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ci_num: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      nafdac_applied_dt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      nafdac_clearance_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      invoice_received_dt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      invoice_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      first_endorsement_received_dt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      second_endorsement_received_dt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      release_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      full_release_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      partial_release_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      full_release_received: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      full_release_received_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      sample_collected_dt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      sample_collected_qty: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      sample_return: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      sample_return_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      sample_return_qty: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
      tableName: "nafdac_clearance",
      timestamps: true,
    }
  );

  return nafdac_clearance;
};
