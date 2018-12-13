module.exports = {
    "up": `
        CREATE TABLE attachements(
            id INT NOT NULL AUTO_INCREMENT,
            type VARCHAR(100) NOT NULL,
            name VARCHAR(256) NOT NULL,
            path VARCHAR(256) NOT NULL,
            abs_path VARCHAR(256) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL on UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY(id)
        ) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;
    `,
    "down": ""
}