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

// const edit = async (req, res, next) => {
//   // do something
// };

// const destroy = async (req, res, next) => {
//   // do something
// };

module.exports = {
  browse,
  read,
  add,
  // edit,
  // destroy,
};
