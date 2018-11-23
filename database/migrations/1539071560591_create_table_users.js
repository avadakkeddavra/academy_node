module.exports = {
    "up": `CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT,
        name  VARCHAR(256) NOT NULL,
        email VARCHAR(191) NOT NULL UNIQUE,
        password VARCHAR(256) NOT NULL,
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;
      `,
    "down": "DROP TABLE users"
}
