const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const PaymentTerms = sequelize.define("PaymentTerms", {
        payment_terms_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        payment_terms_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    }, {
        tableName: 'payment_term_master2',
        timestamps: true
    });

    return PaymentTerms;
};
