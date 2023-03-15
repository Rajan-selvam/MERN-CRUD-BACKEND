const express = require("express");
const {
  listUser,
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/users").get(isAuthenticatedUser,listUser);
router.route("/user/:id")
.put(isAuthenticatedUser,updateUser)
.delete(isAuthenticatedUser,deleteUser);

module.exports = router;