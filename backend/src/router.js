const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const articleControllers = require("./controllers/articleControllers");
const userControllers = require("./controllers/userControllers");

const articleMiddlewares = require("./middlewares/articleMiddlewares");
const authMiddlewares = require("./services/auth");

const authControllers = require("./controllers/authControllers");

const messageControllers = require("./controllers/messageControllers");

const uploadMiddlewares = require("./middlewares/upload");

// router.get("/articles", authMiddlewares.verifyToken, articleControllers.browse);
router.get("/articles", articleControllers.browse);

router.get("/articles/:id/", articleControllers.read);

router.post(
  "/articles",
  uploadMiddlewares.uploadFile,
  articleMiddlewares.validateArticleFields,
  articleControllers.add
);

router.put("/articles/:id", articleControllers.update);
router.delete("/articles/:id", articleControllers.destroy);

router.get("/users", userControllers.browse);
router.put("/users/:id", userControllers.update);
router.post("/users", authMiddlewares.hashPassword, userControllers.add);

router.post("/login", authControllers.login);

router.get("/messages", messageControllers.getMessagesBetweenUsers);
router.get("/messages/:id", messageControllers.getConversations);

router.post("/messages", messageControllers.sendMessage);

module.exports = router;
