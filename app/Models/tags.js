
module.exports = function (sequelize,Sequelize) {
    
    let TagsSchema = {
        name: {
            type: Sequelize.STRING(256),
            unique: true
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
        }
    };
    
    let ModelOptions = {
        timestamps: false,
    };
    
    return sequelize.define('tags', TagsSchema, ModelOptions);
};

