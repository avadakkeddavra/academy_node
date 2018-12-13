module.exports = function (db) {
    db.news.belongsTo(db.users, {foreignKey: 'creator_id', as:'creator'});
    db.news.belongsToMany(db.attachements, {through: 'news_attachements', foreignKey: 'new_id', as:'attachements'});
    db.news.belongsToMany(db.tags, {through:'news_tags', as:'tags', foreignKey: 'new_id'});
}