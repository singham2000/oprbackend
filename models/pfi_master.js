// require('dotenv').config();

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
//         po_id: {
//             type: DataTypes.INTEGER,
//             allowNull: true
//         },
//         company_id: {
//             type: DataTypes.INTEGER,
//             allowNull: true
//         },
//         status: {
//             type: DataTypes.INTEGER,
//             allowNull: true
//         },
//         remarks: {
//             type: DataTypes.STRING(255),
//             allowNull: true
//         },
//         amount: {
//             type: DataTypes.DECIMAL(10, 2),
//             allowNull: true
//         },

//     }, {
//         tableName: 'pfi_master',
//         timestamps: true,
//         logging: process.env.NODE_ENV === 'development' ? console.log : false
//     });

//     return pfi_master;
// };

// ------------------------------------------
//chage on : 27 Aug 2024
// ------------------------------------------

require('dotenv').config();

module.exports = (sequelize, DataTypes) => {
    const pfi_master = sequelize.define("pfi_master", {
        pfi_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pfi_sender_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        pfi_sent_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        opr_no: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        pfi_num: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        controlling_office: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        pfi_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        currency: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        exchange_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        shipment_mode: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        delivery_time: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        delivery_terms: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        payment_terms: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        country_of_origin: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        country_of_supply: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        container_count_type: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        port_of_loading: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        port_of_discharge: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        final_destination: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        country_of_final_destination: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        pfi_description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        freight_remark: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        inhand_charges: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        freight_charges: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        inspection_charges: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        thc_charges: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        container_stuffing: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        container_seal: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        bl: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        vgm: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        miscellaneous_fob: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        advising_commission: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        llc_commission: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        courier: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        miscellaneous_doc: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        document_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'pfi_master',
        timestamps: true,
        logging: process.env.NODE_ENV === 'development' ? console.log : false
    });

    return pfi_master;
};
