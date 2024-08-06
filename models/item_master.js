const opr_items = require("./opr_items");

module.exports = (sequelize, DataTypes) => {
    const ItemsMaster = sequelize.define('ItemsMaster', {
        item_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        item_series: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        item_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        item_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        factory: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        item_type: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        item_description: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        hsn_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        group_name: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        sub_group: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        cria: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        nafdac_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        nafdac_category: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        tolerance: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        vendors: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        lead_time: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        quantity_in_stock: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        quantity_on_order: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        reorder_level: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        unit_price: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        msrp: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        is_discontinued: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        item_img: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        item_img_name: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        notes: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        uom_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: true,
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
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'item_master',
        timestamps: true,
    })


    ItemsMaster.associate = (models) => {
        ItemsMaster.belongsTo(models.UomMaster, { foreignKey: 'uom_id' });
        ItemsMaster.hasMany(models.OprItems, { foreignKey: 'item_id' });
    };


    return ItemsMaster;
};