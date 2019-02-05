module.exports = {
    "up": "ALTER TABLE users ADD(role VARCHAR(16) DEFAULT 0x0100)",
    "down": "ALTER TABLE users DROP COLUMN role"
}