module.exports = {
  "up": `
      CREATE TABLE news(
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(256) NOT NULL,
        content TEXT NOT NULL,
        creator_id INT NOT NULL,
        main_img INT NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL on UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        FOREIGN KEY (creator_id) REFERENCES users(id)  ON DELETE CASCADE,
        FOREIGN KEY (main_img) REFERENCES attachements(id) ON DELETE CASCADE

      ) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;
  `,
  "down": ""
}