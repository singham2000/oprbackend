module.exports = (sequelize, DataTypes) => {
    const company_master = sequelize.define("company_master", {
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        company_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        vertical_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: false
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        updated_on: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        company_type: {
            type: DataTypes.STRING(55),
            allowNull: true
        }

    }, {
        tableName: 'company_master',
        timestamps: false
    });

    company_master.associate = (models) => {
        company_master.hasMany(models.opr_master, { foreignKey: 'company_id' });
        company_master.hasMany(models.OprItems, { foreignKey: 'company_id' });
    };


    return company_master;
};
