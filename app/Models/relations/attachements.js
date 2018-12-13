module.exports = function (db) {
    db.attachements.belongsToMany(db.news, {through:'news_attachements', as:'news', foreignKey: 'attachement_id'});
}