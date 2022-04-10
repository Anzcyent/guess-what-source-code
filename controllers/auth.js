const winston = require("winston");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendMail = require("../utils/nodemailer/sendMail");

async function register(req, res) {
    try {
        const { userName, email, password, confirmPassword } = req.body;

        const existUser = await User.findOne({ userName });
        if (existUser) return res.status(400).json({ msg: "User already registered" });

        const checkPassword = password === confirmPassword;
        if (!checkPassword) return res.status(400).json({ msg: "Passwords don't match" });

        const user = await User.create({
            userName, email, password
        });

        const token = user.generateJWT();

        const { NODE_ENV, JWT_COOKIE_EXPIRE } = process.env;
        return res
            .status(201)
            .cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + +JWT_COOKIE_EXPIRE * 1000 * 60), secure: NODE_ENV === "development" ? false : true })
            .json({
                token,
                user
            })
    } catch (err) {
        winston.log("upps", err.message);

        return res.status(500).json({ msg: err.message });
    }

}

async function login(req, res) {
    try {
        const { userName, password } = req.body;
        const existUser = await User.findOne({ userName });

        if (!existUser) return res.status(400).json({ msg: 'There is no user in that game with that username!' });

        const user = await User.findOne({ userName }).select("+password");

        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!user || !checkPassword) return res.status(400).json({ msg: "Wrong password!" });

        const { NODE_ENV, JWT_COOKIE_EXPIRE } = process.env;

        const token = user.generateJWT();

        return res
            .status(201)
            .cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + +JWT_COOKIE_EXPIRE * 1000 * 60), secure: NODE_ENV === "development" ? false : true })
            .json({
                token,
                user,
            })
    } catch (err) {
        winston.log("upps", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

async function refresh_token(req, res) {
    try {
        const { JWT_COOKIE_EXPIRE, NODE_ENV } = process.env;
        const user = await User.findById(req.user._id);

        const token = user.generateJWT();

        return res.status(200).cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + +JWT_COOKIE_EXPIRE * 1000 * 60), secure: NODE_ENV === "development" ? false : true })
            .json({ token, user });
    } catch (err) {
        winston.log("upps", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

async function logout(req, res) {
    try {
        res.clearCookie("token");

        return res.status(200).json({ msg: "Logout success" });
    } catch (error) {
        winston.log("upps", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

async function forgot_password(req, res) {
    try {
        const { input } = req.body;

        const user = await User.findOne({ email: input }).select("+password") || await User.findOne({ userName: input }).select("+password");
        if (!user) return res.status(404).json({ msg: "Username or email not found" });

        const sendMailHTMLTemplate = `
          <span style="background-color: #A39349; color: white; padding: 10rem; font-weight: 700";>${user.generateResetPasswordToken()}</span>
        `;

        await user.save();

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: user.email,
            subject: "Reset password",
            html: sendMailHTMLTemplate
        }

        sendMail(mailOptions, res);

        return res.status(200).json({ msg: `Reset password token has been sent to ${user.email} email address. Check it.` });
    } catch (err) {
        winston.log("upps", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

async function reset_password(req, res) {
    try {
        const { token, password, confirmPassword } = req.body;
        const { input } = req.query;

        const user = await User.findOne({ userName: input, reset_password_expire: { $gt: Date.now() } }) || await User.findOne({ email: input, reset_password_expire: { $gt: Date.now() } });
        if (!user) return res.status(404).json({ msg: "Invalid token or session expired!" });

        if (password !== confirmPassword) return res.status(400).json({ msg: "Passwords don't match!" });

        if (user.reset_password_token === token) {
            user.password = password;
            user.reset_password_token = undefined;
            user.reset_password_expire = undefined;
            await user.save();
        } else {
            return res.status(400).json({ msg: "Invalid token or session expired!" });
        }

        return res.status(200).json({ msg: "Password has ben changed." });

    } catch (err) {
        winston.log("upps", err.message);
        return res.status(500).json({ msg: err.message });
    }
}



module.exports = { register, login, refresh_token, logout, forgot_password, reset_password};