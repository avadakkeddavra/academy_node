module.exports = {
    "up": "ALTER TABLE tags ADD in_menu TINYINT DEFAULT 0",
    "down": "ALTER TABLE tags DROP COLUMN in_menu"
}
