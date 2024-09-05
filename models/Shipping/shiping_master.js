
// module.exports = (sequelize, DataTypes) => {
//     const ShippingMaster = sequelize.define("ShippingMaster", {
//         shipping_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         ci_id: {
//             type: DataTypes.INTEGER,
//             allowNull: true,
//         },
//         shipping_doc_receipt_date_ho: {
//             type: DataTypes.DATE,
//             allowNull: true
//         },
//         received_from_bank_date_ho: {
//             type: DataTypes.DATE,
//             allowNull: true
//         },
//         obl_sent_apapa_date: {
//             type: DataTypes.DATE,
//             allowNull: true
//         },
//         obl_received_date: {
//             type: DataTypes.DATE,
//             allowNull: true
//         },
//         nafdac: {
//             type: DataTypes.STRING(50),
//             allowNull: true
//         },
//         son: {
//             type: DataTypes.STRING(50),
//             allowNull: true
//         },
//         idec: {
//             type: DataTypes.STRING(50),
//             allowNull: true
//         },
//         cria: {
//             type: DataTypes.STRING(50),
//             allowNull: true
//         },
//         fast_track_clearing: {
//             type: DataTypes.STRING(50),
//             allowNull: true
//         },
//         agency: {
//             type: DataTypes.STRING(50),
//             allowNull: true
//         },
//         agent: {
//             type: DataTypes.STRING(50),
//             allowNull: true
//         },
//         eta: {
//             type: DataTypes.DATE,
//             allowNull: true
//         },
//         supplier_name: {
//             type: DataTypes.STRING(100),
//             allowNull: true
//         },
//         ci_date: {
//             type: DataTypes.DATE,
//             allowNull: true
//         },
//         bl_no: {
//             type: DataTypes.STRING(50),
//             allowNull: true
//         },
//         bl_date: {
//             type: DataTypes.DATE,
//             allowNull: true
//         },
//         pfi_num: {
//             type: DataTypes.STRING(50),
//             allowNull: true
//         },
//         formm_num: {
//             type: DataTypes.STRING(50),
//             allowNull: true
//         },
//         formm_date: {
//             type: DataTypes.DATE,
//             allowNull: true
//         },
//         no_of_container: {
//             type: DataTypes.INTEGER,
//             allowNull: true
//         },
//         agency_name: {
//             type: DataTypes.STRING(100),
//             allowNull: true
//         },
//         discharge_terminal: {
//             type: DataTypes.STRING(100),
//             allowNull: true
//         },
//         transfer_terminal: {
//             type: DataTypes.STRING(100),
//             allowNull: true
//         },
//         free_days: {
//             type: DataTypes.INTEGER,
//             allowNull: true
//         },
//         cbm: {
//             type: DataTypes.DECIMAL(10, 3),
//             allowNull: true
//         },
//         created_by: {
//             type: DataTypes.STRING(55),
//             allowNull: true
//         },
//         updated_by: {
//             type: DataTypes.STRING(55),
//             allowNull: true
//         }

//     }, {
//         tableName: 'shipping_master',
//         timestamps: true
//     });

//     return ShippingMaster;
// };

const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const ShippingMaster = sequelize.define(
    "ShippingMaster",
    {
      shipping_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      supplier_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      pfi_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pfi_num: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ci_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ci_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      bl_no: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      bl_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      agency_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      agency_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      agent: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      shipping_doc_receipt_date_ho: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      received_from_bank_date_ho: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      obl_sent_apapa_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      obl_received_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      formm_num: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      formm_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      eta: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      nafdac: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      son: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      idec: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      cria: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      fast_track_clearing: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      no_of_container: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      free_days: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      loading_terminal: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      discharge_terminal: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      transfer_terminal: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cbm: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
    },
    {
      tableName: "shipping_master",
      timestamps: true,
    }
  );

  ShippingMaster.associate = (models) => {
    ShippingMaster.belongsTo(models.commercial_invoice, {
      foreignKey: "ci_id",
      as: "ci",
    });
    ShippingMaster.belongsTo(models.form_m, {
      foreignKey: "pfi_num",
      as: "FormM",
    });
    ShippingMaster.belongsTo(models.letter_of_credit, {
        foreignKey: "pfi_id",
        as: "LC",
      });
  };

  return ShippingMaster;
};
