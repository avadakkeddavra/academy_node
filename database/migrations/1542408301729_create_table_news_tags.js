module.exports = {
    "up": `
        CREATE TABLE news_tags(
            id INT NOT NULL AUTO_INCREMENT,
            new_id INT NOT NULL,
            tag_id INT NOT NULL,
            index_number INT NOT NULL DEFAULT 1,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL on UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY(id),
            FOREIGN KEY (new_id) REFERENCES news(id) ON DELETE CASCADE,
            FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
            INDEX index_number (index_number)
      ) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;
      
    `,
    "down": ""
}