module.exports = (sequelize, DataTypes) => {
    const PaymentTypeMaster = sequelize.define('payment_type_master', {
        payment_type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        payment_type_name: {
            type: DataTypes.STRING(100),
            allowNull: false
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
        tableName: 'payment_type_master',
        timestamps: true
    });

    PaymentTypeMaster.associate = models => {
        // Define associations here
        PaymentTypeMaster.hasMany(models.PaymentRequestMaster, {
            foreignKey: 'payment_type_id',
            as: 'paymentRequests'
        });
    };

    return PaymentTypeMaster;
};
