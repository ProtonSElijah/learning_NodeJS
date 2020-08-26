const db = require('./db');

class Article {
    static all(cb) {
        db.all('SELECT * FROM articles', cb);
    }

    static find(id, cb) {
        db.get('SELECT * FROM articles WHERE id = ?', id, cb);
    }

    static create(data, cb) {
        const sql = 'INSERT INTO articles(title, content) VALUES(?, ?)';
        db.run(sql, data.title, data.content, cb);
    }

    static delete(id, cb) {
        if (!id) return cb(new Error('Please provide an id'));
        db.run('DELETE FROM articles WHERE id = ?', id, cb);
    }
}

module.exports.Article = Article;
