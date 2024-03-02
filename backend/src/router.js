const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const articleControllers = require("./controllers/articleControllers");
const userControllers = require("./controllers/userControllers");

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

router.get("/users", userControllers.browse);
router.post("/users", userControllers.add);
router.put("/users/:id", userControllers.update);

module.exports = router;
