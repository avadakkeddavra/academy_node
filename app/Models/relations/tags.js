module.exports = function (db) {
    db.tags.belongsTo(db.users, {foreignKey: 'creator_id', as:'creator'});
    db.tags.belongsToMany(db.news, {through:'news_tags', as:'news', foreignKey: 'tag_id'});
}