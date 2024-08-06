
module.exports = (sequelize, DataTypes) => {
    const buy_house_opr = sequelize.define("buy_house_opr", {
    buy_house_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    buy_house_name: {
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
        type: DataTypes.STRING(50),
        allowNull: true
    }
    }, {
        tableName: 'buy_house_opr', 
        timestamps: false 
    });

    return buy_house_opr;
};
