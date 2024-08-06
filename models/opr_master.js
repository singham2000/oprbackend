module.exports = (sequelize, DataTypes) => {
    const opr_master = sequelize.define("OprMaster", {
        opr_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        opr_num: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        vertical_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        opr_date: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        division_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        buy_from: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        buying_house_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        shipment_mode_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        delivery_timeline_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        requested_by: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        no_quot_email_alert: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        opr_description: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        remarks: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        suppliers: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: true
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
        tableName: 'opr_master',
        timestamps: true,
        logging: false
    });

    // Define associations
    opr_master.associate = (models) => {
        opr_master.belongsTo(models.company_master, { foreignKey: 'company_id' });
        opr_master.belongsTo(models.Vertical, { foreignKey: 'vertical_id' });
        opr_master.belongsTo(models.Division, { foreignKey: 'division_id' });
        opr_master.belongsTo(models.ShipMode, { foreignKey: 'shipment_mode_id' });
        opr_master.belongsTo(models.DeliveryTimeline, { foreignKey: 'delivery_timeline_id' });
        opr_master.belongsTo(models.Department, { foreignKey: 'department_id' });
        opr_master.belongsTo(models.BuyingHouse, { foreignKey: 'buying_house_id' });


        opr_master.hasMany(models.OprItems, { foreignKey: 'opr_id' });
    };


    return opr_master;
};
