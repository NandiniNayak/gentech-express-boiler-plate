const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/session_auth", { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on("error", console.log);
