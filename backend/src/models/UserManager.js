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
      `INSERT INTO user (email, password, username) VALUES (?, ?, ?)`,
      [user.email, user.password, user.username]
    );
    return rows;
  }
}

module.exports = UserManager;
