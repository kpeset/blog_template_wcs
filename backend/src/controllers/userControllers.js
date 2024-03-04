const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const result = await tables.user.readAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const userInfos = {
    email: req.body.email,
    password: req.body.hashedPassword,
    username: req.body.username,
  };

  try {
    const result = await tables.user.create(userInfos);
    console.info(result);
    res.json({ msg: "Utilisateur enregistré avec succès" });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const user = {
    username: req.body.username,
    id: req.params.id,
  };
  try {
    const result = await tables.user.update(user);
    console.info(result);
    if (result.affectedRows > 0) {
      res.json({ msg: "Utilisateur modifié avec succès" });
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { browse, update, add };
