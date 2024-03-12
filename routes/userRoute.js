const express = require("express");

const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controllers/userController");

//router
const router = express.Router();

//get all user => method:get
router.get("/all-users", getAllUsers);

//post all user => method:post
router.post("/register", registerController);

//login method : post
router.post("/login", loginController);

module.exports = router;
