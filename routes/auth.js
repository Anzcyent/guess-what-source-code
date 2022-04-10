const express = require('express');
const { register, login, refresh_token, logout, forgot_password, reset_password } = require("../controllers/auth");
const tokenController = require("../middlewares/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/refresh_token", tokenController, refresh_token);
router.get("/logout", logout);
router.post("/forgot_password", forgot_password);
router.post("/reset_password", reset_password);

module.exports = router;