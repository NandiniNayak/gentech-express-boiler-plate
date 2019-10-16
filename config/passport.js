const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const User = require("../database/models/user_model");

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// bring in the passport local strategy middleware
// passport.use(new LocalStrategy(
//     function (username, password, done) {
//         User.findOne({ username: username }, function (err, user) {
//             if (err) { return done(err); }
//             if (!user) { return done(null, false); }
//             if (!user.verifyPassword(password)) { return done(null, false); }
//             return done(null, user);
//         });
//     }
// ));

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async (email, password, done) => {
        let user = await User.findOne({email})
            .catch(done)
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
    }
))
