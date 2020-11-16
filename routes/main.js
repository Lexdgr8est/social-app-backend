const express = require('express')
const router = express.Router()
const passport = require('passport')
const { ensureAuth } = require('../middleware/ensureAuth')
const { getToken } = require('../middleware/token-generator')

router.get('/', (req, res) => {

    res.json({ email: getToken(), password: getToken() })
})



router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);


router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.FRONTEND_URL,
        failureRedirect: '/failed'
    }));



module.exports = router