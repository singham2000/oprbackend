module.exports = (sequelize, DataTypes) => {
    const PaymentRequestMaster = sequelize.define('payment_request_master', {
        payment_request_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        pr_num: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        po_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        doc_type: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        po_number: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        po_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        advice_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        advice_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        advice_remarks: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'updatedAt'
        }
    }, {
        tableName: 'payment_request_master_new',
        timestamps: true
    });

    PaymentRequestMaster.associate = models => {
        PaymentRequestMaster.belongsTo(models.PaymentTypeMaster, {
            foreignKey: 'payment_type_id',
            as: 'paymentType'
        });
        PaymentRequestMaster.hasMany(models.PaymentRequestTransactionsMaster, {
            foreignKey: 'payment_request_id',
            as: 'transactions'
        });
    };

    return PaymentRequestMaster;
};

