const index = (req, res) => {
    // req.session.user ? res.redirect("/") : res.render("auth/register");
    req.session.views = req.session.views ? req.session.views + 1 : 1;
    // res.json(req.session.views);
    res.render("page/home");
}

const dashboard = (req, res) => {
    // note: req.session is not accessible in handlebars, hence it needs to be passed as an object to the handlebar
    let {email } = req.session.user
    res.render("page/dashboard", {email});
}

module.exports = {
    index,
    dashboard
}