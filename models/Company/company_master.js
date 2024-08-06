module.exports = (sequelize, DataTypes) => {
    const company = sequelize.define('companyMaster', {
        company_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        company_series: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        company_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        alternate_phone_number: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        contact_person: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        contact_person_phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        contact_person_email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        registration_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
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
        tableName: 'company_master2',
        timestamps: true
    })


    // Define associations
    // company.associate = (models) => {
    //     company.hasMany(models.AddressMaster, { foreignKey: 'company_id' });
    // };


            // Define associations
            company.associate = (models) => {
                company.hasMany(models.AddressMaster, {
                    foreignKey: 'entity_id',  // Correcting to match the AddressMaster foreign key
                    constraints: false,  // Optional: If you don’t want foreign key constraints
                });
            };


    return company
}
