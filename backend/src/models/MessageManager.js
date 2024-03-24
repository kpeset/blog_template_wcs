const AbstractManager = require("./AbstractManager");

class MessageManager extends AbstractManager {
  constructor() {
    super({ table: "message" });
  }

  async listUsersInteraction(id) {
    const [rows] = await this.database.query(
      `select user.id, user.username
    from user
    WHERE
        user.id IN (
            SELECT receiver_id
            from message
            WHERE
                sender_id = ?
            UNION
            SELECT sender_id
            from message
            WHERE
                receiver_id = ?
        )`,
      [id, id]
    );
    return rows;
  }

  async messagesBetweenUsers(users) {
    const [rows] = await this.database.query(
      `
    select sender.username as sender, receiver.username as receiver, message.content
from
    message
    JOIN user as sender on sender.id = message.sender_id
    JOIN user as receiver on receiver.id = message.receiver_id
WHERE (
        sender_id = ?
        AND receiver_id = ?
    )
    OR (
        sender_id = ?
        AND receiver_id = ?
    )
    ORDER BY timestamp;
    `,
      [users.senderId, users.receiverId, users.receiverId, users.senderId]
    );
    return rows;
  }

  async sendMessage(message) {
    const [rows] = await this.database.query(
      `INSERT INTO message (sender_id, receiver_id, content) VALUES (?, ?, ?)`,
      [message.senderId, message.receiverId, message.content]
    );
    return rows;
  }
}

module.exports = MessageManager;
