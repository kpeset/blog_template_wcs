const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async create(user) {
    const [rows] = await this.database.query(
      `INSERT INTO ${this.table} (email, password, username) VALUES (?, ?, ?)`,
      [user.email, user.password, user.username]
    );
    return rows;
  }

  async update(user) {
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET username=? WHERE id=?`,
      [user.username, user.id]
    );
    return rows;
  }
}

module.exports = UserManager;
