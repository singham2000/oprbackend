module.exports = (sequelize, DataTypes) => {
    const branch = sequelize.define('BranchMasterTable', {
        branch_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        branch_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(55),
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
        tableName: 'branch_master_table',
        timestamps: true
    })

    return branch;
};