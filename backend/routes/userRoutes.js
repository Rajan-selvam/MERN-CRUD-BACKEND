const express = require("express");
const {
  listUser,
  loginUser,
  registerUser,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/users").get(isAuthenticatedUser,listUser);

module.exports = router;