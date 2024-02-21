const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const articleControllers = require("./controllers/articleControllers");

const articleMiddlewares = require("./middlewares/articleMiddlewares");

router.get(
  "/articles",
  articleMiddlewares.checkIfAdmin,
  articleMiddlewares.accessHours,
  articleControllers.browse
);

router.get("/articles/:id/", articleControllers.read);

router.post(
  "/articles",
  articleMiddlewares.validateArticleFields,
  articleControllers.add
);

router.put("/articles/:id", articleControllers.update);
router.delete("/articles/:id", articleControllers.destroy);

/* ************************************************************************* */

module.exports = router;
