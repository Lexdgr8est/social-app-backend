const express = require('express')
const router = express.Router()
const passport = require('passport')


router.get('/', (req, res) => {
    res.json({ 'message': "working" })
})
router.get('/success', (req, res) => {
    res.json({ 'message': "Google auth successful" })
})
router.get('/failed', (req, res) => {
    res.json({ 'message': "Google auth failed" })
})


router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/success');
    });




module.exports = router