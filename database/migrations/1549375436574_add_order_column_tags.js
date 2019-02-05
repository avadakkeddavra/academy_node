module.exports = {
    "up": "ALTER TABLE tags ADD orderBy INT DEFAULT 0;",
    "down": "ALTER TABLE tags DROp COLUMN orderBy;"
}
