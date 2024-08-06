module.exports = (sequelize, DataTypes) => {
    const UomMaster = sequelize.define('UomMaster', {
        uom_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        uom_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        uom_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        }
    }, {
        tableName: 'unit_of_measurement',
        timestamps: true,
    });
 

    UomMaster.associate = (models) => {
        UomMaster.hasMany(models.ItemsMaster, { foreignKey: 'uom_id' });
        
    };

    return UomMaster;
};
