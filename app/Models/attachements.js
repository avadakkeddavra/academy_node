
module.exports = function (sequelize,Sequelize) {
    
    let AttachementsSchema = {
        new_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'news',
                key: 'id'
            }
        },
        type: {
            type: Sequelize.STRING(256),
            nullable: true
        },
        name: {
            type: Sequelize.STRING(256),
            nullable: false
        },
        path: {
            type: Sequelize.STRING(256),
            nullable: false
        },
        abs_path: {
            type: Sequelize.STRING(256),
            nullable: true
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
    
    return sequelize.define('attachements', AttachementsSchema, ModelOptions);
};

