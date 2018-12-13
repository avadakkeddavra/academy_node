
module.exports = function (sequelize,Sequelize) {
    
    let TagsSchema = {
        new_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'news',
                key: 'id'
            }
        },
        tag_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'tags',
                key: 'id'
            }
        },
        index_number: {
            type: Sequelize.INTEGER,
            defaultValue: 1
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
    
    return sequelize.define('news_tags', TagsSchema, ModelOptions);
};

