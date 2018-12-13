
module.exports = function (sequelize,Sequelize) {
    
    let News_attachementsSchema = {
        attachement_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'attachements',
                key: 'id'
            }
        },
        new_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'news',
                key: 'id'
            }
        }
    };
    
    let ModelOptions = {
        timestamps: false
    };
    
    return sequelize.define('news_attachements', News_attachementsSchema, ModelOptions);
};

