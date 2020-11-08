const express = require('express')
const router = express.Router()
const passport = require('passport')


router.get('/', (req, res) => {
    res.json({ 'message': "working" })
})

router.get('/success', (req, res) => {
    res.json({ 'message': "Google auth failed" })
})
router.get('/failed', (req, res) => {
    res.json({ 'message': "Google auth failed" })
})


router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
        // Successful authentication, redirect home.
        let data = {user: req.user, 'message': "Google auth successful"};
        return res.redirect('http://localhost:3000?' + JSON.stringify(data));
    });




module.exports = router