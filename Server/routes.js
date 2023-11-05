const express = require("express");
const app = express();
const router = express.Router();

const signup = require("./controllers/Signup");
const login = require("./controllers/Login");
const Post = require("./controllers/Post");

router.post("/signup", signup);
router.post("/login", login);
router.post("/creatpost", Post);

module.exports = router;
