// module.exports = (sequelize, DataTypes) => {
//     const pfi_master = sequelize.define("pfi_master", {
//         pfi_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         pfi_num: {
//             type: DataTypes.STRING(100),
//             allowNull: true
//         },
//         payment_request_id: {
//             type: DataTypes.INTEGER,
//             allowNull: true
//         },
//         amount: {
//             type: DataTypes.DECIMAL(10, 2),
//             allowNull: true
//         },
//         company_id: {
//             type: DataTypes.INTEGER,
//             allowNull: true
//         },
//         status: {
//             type: DataTypes.STRING(50),
//             allowNull: true
//         },
//         remarks: {
//             type: DataTypes.STRING(255),
//             allowNull: true
//         },
//         created_on: {
//             type: DataTypes.DATE,
//             allowNull: true
//         },
//         created_by: {
//             type: DataTypes.STRING(50),
//             allowNull: true
//         },
//         updated_on: {
//             type: DataTypes.DATE,
//             allowNull: true
//         },
//         updated_by: {
//             type: DataTypes.STRING(50),
//             allowNull: true
//         }
//     }, {
//         tableName: 'pfi_master',
//         timestamps: false
//     });

//     // po_master.associate = quotation_master => {
//     //     po_master.belongsTo(quotation_master, {
//     //         foreignKey: 'quo_id',
//     //         as: 'quotationData'
//     //     });
//     // };

//     return pfi_master;
 
// };

require('dotenv').config();

module.exports = (sequelize, DataTypes) => {
    const pfi_master = sequelize.define("pfi_master", {
        pfi_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pfi_num: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        payment_request_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        po_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        remarks: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },

    }, {
        tableName: 'pfi_master',
        timestamps: true,
        logging: process.env.NODE_ENV === 'development' ? console.log : false
    });

    return pfi_master;
};