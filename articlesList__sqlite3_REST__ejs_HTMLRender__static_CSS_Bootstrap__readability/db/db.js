const sqlite3 = require('sqlite3').verbose();
const dbName = 'later.sqlite';
const db = new sqlite3.Database(dbName);

db.serialize(() => {
    const sql = `
        CREATE TABLE IF NOT EXISTS articles
            (id integer primary key, title, content TEXT)
    `;
    db.run(sql);
});

module.exports = db;
