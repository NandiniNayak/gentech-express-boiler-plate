const User = require("../database/models/user_model");

const registerNew = (req, res) => {
    res.render("auth/register");
}

const registerCreate = async (req, res) => {
    let {email, password} = req.body;
    let user = await User.create({email, password});
    console.log(user);
    res.redirect("/");
}

module.exports = {
    registerNew,
    registerCreate
}