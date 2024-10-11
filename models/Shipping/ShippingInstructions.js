module.exports = (sequelize, DataTypes) => {
    const shippment_instructions = sequelize.define(
      "shippment_instructions",
      {
        shippment_instructions_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        po_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        po_num: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        vendor_id: {
          type: DataTypes.STRING(55),
          allowNull: true,
        },
        quo_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        currency: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },
        delivery_terms: {
          type: DataTypes.STRING(55),
          allowNull: true,
        },
        lead_time: {
          type: DataTypes.STRING(55),
          allowNull: true,
        },
        payment_terms: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },
        remarks: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        buyer_name: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          buyer_address: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          shipper_po_vendor: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          supplier_ref_no: {
            type: DataTypes.STRING(55),
            allowNull: true,
          },
          delivery_term: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          shipment_mode: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          no_of_previous_shipment: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          shipper: {
            type: DataTypes.STRING(55),
            allowNull: true,
          },
          consignee: {
            type: DataTypes.STRING(55),
            allowNull: true,
          },
          notify: {
            type: DataTypes.STRING(55),
            allowNull: true,
          },
          port_of_loading: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          port_of_discharge: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          final_destination: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          goods_description: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          label_check: {
            type: DataTypes.STRING(55),
            allowNull: true,
          },
          bill_of_loading_check: {
            type: DataTypes.STRING(55),
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
        tableName: "shippment_instructions",
        timestamps: false,
      }
    );
  
    return shippment_instructions;
  };
  