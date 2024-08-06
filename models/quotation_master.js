module.exports = (sequelize, DataTypes) => {
    const quotation_master = sequelize.define("quotation_master", {
        quo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        quo_num: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        rfq_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        vendor_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        reference_no: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        reference_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        quo_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        currency: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        delivery_terms: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        country_origin: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        country_supply: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        port_loading: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        lead_time: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        payment_terms: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        remarks: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        approval_status: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        updated_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        total_cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        po_status: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        quote_doc: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        quote_doc_name: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
    }, {
        tableName: 'quotations_master',
        timestamps: false
    });
    return quotation_master;
};
