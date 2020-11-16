exports.ensureAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.json({ success: false, message: 'User is not authenticated' }).status(401)
        // console.log(req.user);
    } else {
        next()
    }
}