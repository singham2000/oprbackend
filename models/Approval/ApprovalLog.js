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
        doc_type: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        doc_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        doc_num: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        from_user_id: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        from_user_level: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        to_user_id: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        to_user_level: {
            type: DataTypes.STRING(20),
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

    return ApprovalLog;
};
