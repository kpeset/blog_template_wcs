const AbstractManager = require("./AbstractManager");

class ArticleManager extends AbstractManager {
  constructor() {
    super({ table: "article" });
  }

  async readAll() {
    const [rows] = await this.database.query(
      `select article.id, article.title, article.content, article.creation_datetime, user.username from ${this.table} JOIN user ON article.user_id = user.id`
    );
    return rows;
  }

  async read(id) {
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

  async update(article) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET title=?, content=?, creation_datetime=NOW() WHERE id=?`,
      [article.title, article.content, article.id]
    );
    return rows;
  }

  async destroy(id) {
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );
    return rows;
  }
}

module.exports = ArticleManager;
