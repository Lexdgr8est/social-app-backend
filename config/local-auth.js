const LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcryptjs");
const User = require('../models/user');
const asyncHandler = require('express-async-handler')


module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
        let user = await User.findOne({ email })

        if (!user) {
            return done(null, false, { message: 'Email is not registered' })
        }
        let match = await bcrypt.compare(password, user.password)
        if (match) {
            return done(null, user)
        } else {
            return done(null, false, { message: 'Password does not match' })
        }
    }))


    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}