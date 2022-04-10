const jwt = require("jsonwebtoken");
const winston = require("winston");

function tokenController(req, res, next) {
    try {
        const isTokenIncluded = req.headers.authorization && req.headers.authorization.startsWith("Bearer:");

        if (!isTokenIncluded) {
            winston.log("Sb is messing with us", "Auth middleware error");
            return res.status(403).json({ msg: "You are not authorized to access this route." });
        }

        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                winston.log("Sb is messing with us", err.message);
                return res.status(401).json({ msg: "You are not authorized to access this route." });
            }

            req.user = {
                _id: decoded.id,
                name: decoded.name
            }

            next();
        })
    } catch (err) {
        winston.log("upps", err.message);
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = tokenController;