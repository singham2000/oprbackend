module.exports = (sequelize, DataTypes) => {
    const BuyingHouse = sequelize.define("BuyingHouse", {
        buying_house_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        buying_house_code: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        buying_house_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        vertical_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    }, {
        tableName: 'buyinghouse_master',
        timestamps: true
    });

    BuyingHouse.associate = (models) => {
        BuyingHouse.hasMany(models.opr_master, { foreignKey: 'buying_house_id' });
    };


    return BuyingHouse;
};
