module.exports = {
    "up": `
        ALTER TABLE attachements ADD(
          folder_id INT,
          FOREIGN KEY(folder_id) REFERENCES attachements(id) ON DELETE CASCADE
        );
    `,
    "down": ""
};
