module.exports = (sequelize, DataTypes) => {
    return sequelize.define('VendorsMaster', {
        vendor_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        vendor_series: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        vendor_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        address_line1: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        address_line2: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        city: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        state: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        country: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        postal_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        address_line3: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        address_line4: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        city1: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        state1: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        country1: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        postal_code1: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        alternate_phone_number: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        contact_person: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        contact_person_phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        contact_person_email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        tax_id: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        payment_terms: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        bank1_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        bank2_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        bank1_account_number: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        bank2_account_number: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        bank1_ifsc_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        bank2_ifsc_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        bank1_ref_cheque: {
            type: DataTypes.STRING(DataTypes.MAX),
            allowNull: true
        },
        bank1_ref_cheque_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        bank2_ref_cheque: {
            type: DataTypes.STRING(DataTypes.MAX),
            allowNull: true
        },
        bank2_ref_cheque_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        last_audited_docs: {
            type: DataTypes.STRING(DataTypes.MAX),
            allowNull: true
        },
        last_audited_docs_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        pan_num: {
            type: DataTypes.STRING(555),
            allowNull: true
        },
        tin_num: {
            type: DataTypes.STRING(555),
            allowNull: true
        },
        gst_num: {
            type: DataTypes.STRING(555),
            allowNull: true
        },
        vat_num: {
            type: DataTypes.STRING(555),
            allowNull: true
        },
        reference_by: {
            type: DataTypes.STRING(555),
            allowNull: true
        },
        vendor_type: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        vendor_status: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        registration_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        compliance_status: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        notes: {
            type: DataTypes.STRING(555),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'vendors_master',
        timestamps: true,
    })
};

