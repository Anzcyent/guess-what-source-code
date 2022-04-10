const express = require('express');
const router = express.Router();
const { generate_number, play_game } = require("../controllers/game");
const tokenController = require("../middlewares/auth");

router.get("/generate_number", tokenController, generate_number);
router.post("/play_game", tokenController, play_game);

module.exports = router;