
module.exports = function (sequelize,Sequelize) {
    
    let NewsSchema = {
        title: {
            type: Sequelize.STRING(256),
            unique: true
        },
        content: {
            type: Sequelize.TEXT,
        },
        creator_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
    };
    
    let ModelOptions = {
        timestamps: false
    };
    
    return sequelize.define('news', NewsSchema, ModelOptions);
};

