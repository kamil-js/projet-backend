const path = require("path");
const express = require("express");
require("./database");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const app = express();

const server = app.listen(4000, () => {
  console.log("server is running");
});

module.exports = {
  server,
  app,
};

app.use(cookieParser());
require("./config/jwt.config");
require("./config/socket.config");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
