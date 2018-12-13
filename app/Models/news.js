
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
        main_img: {
          type: Sequelize.INTEGER,
          references: {
              model: 'attachements',
              key: 'id'
          }
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        deletedAt: {
            type: Sequelize.DATE
        }
    };

    let ModelOptions = {
        timestamps: true,paranoid: true
    };

    return sequelize.define('news', NewsSchema, ModelOptions);
};

