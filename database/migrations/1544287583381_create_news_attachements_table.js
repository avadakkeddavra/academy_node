module.exports = {
    "up": `
        CREATE TABLE news_attachements(
            id INT NOT NULL AUTO_INCREMENT,
            attachement_id INT NOT NULL,
            new_id INT NOT NULL,
            PRIMARY KEY(id),
            FOREIGN KEY(attachement_id) REFERENCES attachements(id) ON DELETE CASCADE,
            FOREIGN KEY(new_id) REFERENCES news(id) ON DELETE CASCADE
        )
    `,
    "down": ""
}