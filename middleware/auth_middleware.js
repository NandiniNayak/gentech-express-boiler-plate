// redirect the user if already registered or logged in
const authRedirect = (req, res, next) => {
    if (req.user) {
        return res.redirect("/");
    }

    return next();
}
const authorize = (req, res, next) => {
    if(!req.user) {
        return res.redirect("/")
    }
    return next();
}

module.exports = {
    authRedirect,
    authorize
}