const User = require("../database/models/user_model");
const jwt = require("jsonwebtoken");

const registerNew = (req, res) => {
    res.render("auth/register");
}

const registerCreate = async (req, res) => {
    let {email, password} = req.body;
    // let encrypetPassword = password.
    let user = await User.create({email, password});
    // attach the registered user to the session
    // req.session.user = user
    // passport login
    req.login(user, (err) => {
        if(err) {
            return next(err);
        }
    })
    console.log(user);
    res.redirect("/dashboard");
}

const loginNew = (req, res) => {
    res.render("auth/login");
}
// custom authentication
// const loginCreate = async (req, res) => {
//     let {email, password} = req.body
//     // fetch the user record from the database
//     let user = await User.findOne({email})
//     // if the user doesnot exist return an error
//     if(!user) {
//         return res.render("auth/login", {error: "Invalid user"})
//     }
//     // verify the password
//     const validUser = await user.verifyPassword(password);
//     if(!validUser) {
//         return res.render("auth/login", {error: "Invalid password"});
//     }
//     // attach the user to the session
//     req.session.user = user;
//     res.redirect("/dashboard");
//     // res.json(req.body);
// }

const loginCreate = async (req,res) => {
    const token = jwt.sign({sub: req.user._id}, "secretkey");
    console.log("token", token);
    res.json(token);
    // sign the user details to generate json web token
}
const logout = (req, res) => {
    // req.session.destroy(() => {
    //     res.redirect("/");
    // })
    // passport logout
    req.logout();
    res.redirect("/");
}


module.exports = {
    registerNew,
    registerCreate,
    loginNew,
    loginCreate,
    logout
}