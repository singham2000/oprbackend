module.exports = (sequelize, DataTypes) => {
    const QuoDoc = sequelize.define('QuoDoc', {
        q_doc_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        quotation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        q_doc_name: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        q_doc_remarks: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        q_doc_filename: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        q_doc_file: {
            type: DataTypes.TEXT,
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
        tableName: 'quotation_file_master',
        timestamps: true
    });
    return QuoDoc;
};
