const { DataTypes  } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const status_master = sequelize.define("status_master", {
        status_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        module: {
        type: DataTypes.STRING(100),
        allowNull: true
        },
        table_name: {
        type: DataTypes.STRING(255),
        allowNull: true
        },
        field_name: {
        type: DataTypes.STRING(255),
        allowNull: true
        },
        value: {
        type: DataTypes.STRING(255),
        allowNull: true
        },
        description: {
        type: DataTypes.STRING(1000),
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
        tableName: 'status_master', 
        timestamps: true
    });

    return status_master;
};
