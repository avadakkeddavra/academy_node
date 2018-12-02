module.exports = function (db) {
    db.users.hasMany(db.reset_password, {foreignKey: 'user_id'});
    db.users.hasMany(db.news, {foreignKey: 'creator_id'});
}