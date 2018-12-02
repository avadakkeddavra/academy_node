module.exports = function (db) {
    db.attachements.belongsTo(db.news, {foreignKey: 'new_id'});
}