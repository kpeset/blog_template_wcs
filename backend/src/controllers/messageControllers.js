const tables = require("../tables");

const getConversations = async (req, res, next) => {
  const { id } = req.params;
  try {
    const list = await tables.message.listUsersInteraction(id);
    res.json(list);
  } catch (err) {
    next(err);
  }
};

const getMessagesBetweenUsers = async (req, res, next) => {
  try {
    const users = {
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
    };

    const messages = await tables.message.messagesBetweenUsers(users);

    res.json(messages);
  } catch (error) {
    next(error);
  }
};

const sendMessage = async (req, res, next) => {
  try {
    const message = {
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
      content: req.body.content,
    };

    const result = await tables.message.sendMessage(message);

    res.json({
      status: result,
      msg: "message envoyé avec succès",
      sender: req.body.senderId,
      receiver: req.body.receiverId,
      content: req.body.content,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getConversations,
  getMessagesBetweenUsers,
  sendMessage,
};
