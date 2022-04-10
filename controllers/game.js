const winston = require("winston");
const User = require("../models/User");

async function generate_number(req, res) {
    try {
        const number = Math.round(Math.random() * 10);

        return res.status(200).json({ number });
    } catch (err) {
        winston.log("sb is messing with us", err.message);

        return res.status(500).json({ msg: err.message });
    }
}

async function play_game(req, res) {
    try {
        const { guess_number, number, bet } = req.body;

        const user = await User.findById(req.user._id).select("+password");

        if (bet <= 0) return res.status(400).json({msg: "You have not enough coins!"});

        user.coins = user.coins - bet;
        await user.save();

        if (guess_number === number) {
            user.coins += bet * 5;
            await user.save();
            return res.status(200).json({ coins: user.coins, win: true });
        } else {
            return res.status(200).json({ coins: user.coins, win: false });
        }
    } catch (err) {
        winston.log("sb is messing with us", err.message);

        return res.status(500).json({ msg: err.message });
    }
}

module.exports = { generate_number, play_game }