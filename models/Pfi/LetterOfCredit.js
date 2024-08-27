module.exports = (sequelize, DataTypes) => {
    const letter_of_credit = sequelize.define(
      "letter_of_credit",
      {
        letter_of_credit_id: {
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
        form_m_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        form_m_num: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        lc_status: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },
        lc_num: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        lc_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        application_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        lc_type: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },       
        
        lc_issue_amount: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        lc_expiry_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        latest_shipment_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        advising_bank: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },
        lc_tolerance: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        lc_tolerance_value: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        payment_terms: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },   
        tenor_days: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        offshore_charges_borne: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        confirmation_charges_borne: {
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
        tableName: "letter_of_credit",
        timestamps: false,
      }
    );
    return letter_of_credit;
  };
  