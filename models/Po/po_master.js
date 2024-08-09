const { quotation_master } = require('../index')

module.exports = (sequelize, DataTypes) => {
    const po_master = sequelize.define("po_master", {
        po_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        po_num: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        quo_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        quo_num: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        total_cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        vendor_id: {
            type: DataTypes.INTEGER, 
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        acceptance_remarks: {
            type: DataTypes.STRING(255),
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
        }
    }, {
        tableName: 'po_master',
        timestamps: false
    });

    // po_master.associate = quotation_master => {
    //     po_master.belongsTo(quotation_master, {
    //         foreignKey: 'quo_id',
    //         as: 'quotationData'
    //     });
    // };
    
    return po_master;
};
