module.exports = {
    "up": "ALTER TABLE users ADD(role VARCHAR(4) DEFAULT 0100)",
    "down": "ALTER TABLE users DROP COLUMN role"
}