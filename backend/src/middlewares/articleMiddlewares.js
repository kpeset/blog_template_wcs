const Joi = require("joi");

const sayHello = (req, res, next) => {
  console.info("coucou depuis le middleware");
  next();
};

const checkIfAdmin = (req, res, next) => {
  const currentUser = "admin";

  if (currentUser !== "admin") {
    res.status(400).send("Accès non autorisé");
  } else {
    next();
  }
};

const accessHours = async (req, res, next) => {
  const currentHours = new Date().getHours();
  const openingHours = 10;
  const closingHours = 18;

  if (currentHours >= openingHours && currentHours <= closingHours) {
    next();
  } else {
    res.send("Désolé on est fermé");
  }
};

const validateArticleFields = (req, res, next) => {
  const articleSchema = Joi.object({
    title: Joi.string()
      .min(5)
      .max(10)
      .messages({
        "string.min": "Le titre doit avoir minimum 5 caractères",
        "string.max": "Le titre doit avoir au maximum 10 caractères",
        "string.empty": "Veuillez remplir le champ titre",
      })
      .required(),
    content: Joi.string()
      .min(20)
      .max(400)
      .messages({
        "string.min": "Le contenu doit avoir minimum 20 caractères",
        "string.max": "Le contenu doit avoir au maximum 400 caractères",
        "string.empty": "Veuillez remplir le champ contenu",
      })
      .required(),
    userId: Joi.number()
      .min(1)
      .max(400)
      .messages({
        "number.base": "Erreur lors de l'ajout de l'id",
      })
      .required(),
  });

  const { error } = articleSchema.validate(req.body);
  console.error(error);

  if (error) {
    console.error(error.details[0].message);
    res.status(400).json({
      msg: error.details[0].message,
    });
  } else {
    next();
  }
};

module.exports = { sayHello, checkIfAdmin, accessHours, validateArticleFields };
