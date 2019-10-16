const express = require("express");
const exphbs = require("express-handlebars");
// const morgan = require("morgan");
const app = express();
// require the express session to keep track of the session on the server side
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require("mongoose");
const passport = require("passport");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { expires: 600000 },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(morgan("combined"));
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes"));

app.use(express.static("public"));

app.use(require("./middleware/error_handler_middleware"));

module.exports = app;