const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../database/models/user_model");

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secretkey';

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

// attach the user to the session
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

// fetch user from the session
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

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
// uses json web token based function
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));