const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, "Please provide a username."],
        maxlength: [20, "Please don't exceed 20 characters."],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide a email address."],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email address"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password."],
        minlength: [6, "Please provide 6 characters at least"],
        select: false
    },
    coins: {
        type: Number,
        default: 10000
    },
    reset_password_token: String,
    reset_password_expire: Date
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        next();
    }

    bcrypt.genSalt(12, (err, salt) => {
        if (err) throw new Error(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) throw new Error(err)
            this.password = hash;
            next();
        });
    });
});

userSchema.methods.generateJWT = function () {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

    const payload = {
        id: this._id,
        userName: this.userName
    }

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });

    return token;
}

userSchema.methods.generateResetPasswordToken = function () {
    const randomHex = crypto.randomBytes(16).toString("hex");

    const token = crypto
        .createHash("SHA256")
        .update(randomHex)
        .digest("hex")

    this.reset_password_token = token;
    this.reset_password_expire = Date.now() + +process.env.RESET_PASSWORD_EXPIRE;

    return token;
}

module.exports = model("User", userSchema);