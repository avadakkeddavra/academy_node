module.exports = {
    "up": "ALTER TABLE tags ADD FOREIGN KEY(creator_id) REFERENCES users(id);",
    "down": ""
}