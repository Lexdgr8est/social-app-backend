const User = require('../models/user')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { getToken } = require('../middleware/token-generator')



module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            let newUser = new User({
                firstname: profile._json.given_name,
                lastname: profile._json.family_name,
                google_id: profile.id,
                email: profile.emails[0].value,
                emailVerified: true,
                passwordToken: getToken(),
                emailToken: getToken()
            });
            try {
                let user = await User.findOne({ google_id: profile.id })
                if (user) {

                    return done(null, user)
                }
                else {
                    try {
                        let user = newUser.save();
                        return done(null, user)
                    } catch (error) {
                        console.log(error);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }));

    passport.serializeUser(function (user, done) {
        console.log(`google`);
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        console.log(456);
        done(null, user);
    });
}

// "http://localhost:3000/auth/google/callback"