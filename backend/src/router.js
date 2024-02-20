const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const articleControllers = require("./controllers/articleControllers");

const articleMiddlewares = require("./middlewares/articleMiddlewares");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

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
// router.put("/articles/:id", articleControllers.edit);
// router.delete("/articles/:id", articleControllers.destroy);

/* ************************************************************************* */

module.exports = router;
