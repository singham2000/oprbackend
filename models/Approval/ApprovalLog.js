module.exports = (sequelize, DataTypes) => {
    const ApprovalLog = sequelize.define('ApprovalLog', {
        approval_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        approval_matrix_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        doc_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        doc_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        action: {
            type: DataTypes.STRING(50),
        },
        comments: {
            type: DataTypes.STRING(255),
            allowNull: true,
        }
    }, {
        tableName: 'approval_log',
        timestamps: true,
    });

    // ApprovalLog.associate = (models) => {
    //     ApprovalLog.belongsTo(models.ApprovalMatrix, { foreignKey: 'approval_id' });
    // };

    return ApprovalLog;
};
