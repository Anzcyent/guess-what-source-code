const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongo_sanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

function secureProject(app) {
    app.use(cors());
    app.use(morgan("tiny"));
    app.use(helmet({
        contentSecurityPolicy: false
    }));
    app.use(xss());
    app.use(mongo_sanitize());
    app.use(hpp());
}

module.exports = secureProject;