module.exports = (sequelize, DataTypes) => {
    const additional_cost = sequelize.define("additional_cost", {
        additional_cost_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        quo_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        quo_num: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        inland_charges: {
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
        thc: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        container_stuffing: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        container_seal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        bl: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        vgm: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        miscellaneous: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        additional_cost: {
            type: DataTypes.DECIMAL(10, 2),
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
        tableName: 'additional_cost',
        timestamps: false
    });
    return additional_cost;
};
