module.exports = {
    "up": `
        ALTER TABLE tags 
        ADD creator_id INT NOT NULL;
    `,
    "down": ""
}