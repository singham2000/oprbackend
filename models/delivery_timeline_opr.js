const { DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const DeliveryTimeline = sequelize.define("DeliveryTimeline", {
        delivery_timeline_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        delivery_timeline_name: {
            type: DataTypes.STRING(100),
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
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'delivery_timeline_opr',
        timestamps: false
    });

    DeliveryTimeline.associate = (models) => {
        DeliveryTimeline.hasMany(models.OprMaster, { foreignKey: 'delivery_timeline_id' });
    };

    return DeliveryTimeline;
};
