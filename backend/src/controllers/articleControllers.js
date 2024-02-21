const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const articles = await tables.article.readAll();
    res.json(articles);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  const { id } = req.params;
  try {
    const article = await tables.article.read(id);
    res.json(article);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const articleInfos = {
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
  };

  try {
    const result = await tables.article.create(articleInfos);
    console.info(result);
    res.status(200).json({
      msg: "article enregistré avec succès",
      status: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const articleInfos = {
    title: req.body.title,
    content: req.body.content,
    id: req.params.id,
  };

  try {
    const result = await tables.article.update(articleInfos);
    if (result.affectedRows === 0) {
      res.status(404).json({ msg: "article introuvable" });
    } else {
      res.json({ msg: "article modifié avec succès" });
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await tables.article.destroy(req.params.id);
    if (result.affectedRows === 0) {
      res.status(404).json({ msg: "article introuvable" });
    } else {
      res.json({ msg: "article supprimé avec succès" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  add,
  update,
  destroy,
};
