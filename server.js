const express = require('express');
const http = require("http");
const secureProject = require("./utils/security/security");
const dotenv = require("dotenv");
const connectDB = require("./utils/db/connectDB");
const router = require("./routes/index");
const path = require("path");

dotenv.config();

const app = express();

// Security
secureProject(app);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("/", (req, res) => {
        res.sendFile("/client/build/index.html", { root: __dirname });
    });
}

const PORT = process.env.PORT || 5000;

// Express Middlewares
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));


// DB Connection
connectDB();

// Router
app.use("/api", router);


http.createServer(app, console.log("Server started on port " + PORT)).listen(PORT);

