const AbstractManager = require("./AbstractManager");

class ArticleManager extends AbstractManager {
  constructor() {
    super({ table: "article" });
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async read(id) {
    // do something
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return rows;
  }

  async create(article) {
    const [rows] = await this.database.query(
      `INSERT INTO ${this.table} (title, content, user_id, creation_datetime) VALUES (?, ?, ?, NOW())`,
      [article.title, article.content, article.userId]
    );
    return rows;
  }
}

module.exports = ArticleManager;
