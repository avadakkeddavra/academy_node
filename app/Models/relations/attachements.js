module.exports = function (db) {
    db.attachements.belongsToMany(db.news, {through:'news_attachements', as:'news', foreignKey: 'attachement_id'});
    db.attachements.hasOne(db.news, {foreignKey:'main_img', as:'newMainImg'});
    db.attachements.hasMany(db.attachements, {foreignKey:'folder_id', as:'files'});
    db.attachements.belongsTo(db.attachements, {foreignKey:'folder_id', as:'folder'});
}
