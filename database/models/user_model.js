const mongoose = require("mongoose");
const UserSchema = require("../schemas/user_schema");
const User = mongoose.model("User", UserSchema);

module.exports = User;