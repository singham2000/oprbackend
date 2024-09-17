module.exports = (sequelize, DataTypes) => {
    const rfq = sequelize.define('RfqMaster', {
        rfq_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        rfq_num: {
            type: DataTypes.STRING(55),
            allowNull: true,
        },
        penalty_terms_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        remarks: {
            type: DataTypes.STRING(255),
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
        },
        vendor_list: {
            type: DataTypes.STRING(250),
            allowNull: true
        }
    }, {
        tableName: 'rfq_master',
        timestamps: true,
        createdAt: 'created_on',
        updatedAt: 'updated_on'
    })
    return rfq;
};

