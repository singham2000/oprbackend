module.exports = (sequelize, DataTypes) => {
    const DeptDesigMapping = sequelize.define('dept_desig_mapping', {
        dept_desig_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        dept_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: 'department',
            //     key: 'dept_id'
            // }
        },
        designation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: 'designation', 
            //     key: 'designation_id'
            // }
        },
        created_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_on: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {

        tableName: 'dept_desig_mapping',
        timestamps: true,
        createdAt: 'created_on',
        updatedAt: 'updated_on'
    });
    return DeptDesigMapping
}


