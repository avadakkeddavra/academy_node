module.exports = function (db) {
    db.news.belongsTo(db.users, {foreignKey: 'creator_id'});
    db.news.hasMany(db.attachements, {foreignKey: 'new_id'});
}