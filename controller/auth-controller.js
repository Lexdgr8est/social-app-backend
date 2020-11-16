const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { getToken } = require('../middleware/token-generator')

exports.registerUser = asyncHandler((async (req, res) => {

    let user = new User(req.body)

    let mail = await User.findOne({ email: req.body.email })
    if (mail) {
        res.json({ success: false, messgae: 'Email already exist', }).status(400)
    } else {
        let hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
        user.emailToken = getToken()
        user.passwordToken = getToken()
        await user.save()
        res.json({ success: true, messgae: 'Sign up successful', }).status(201)
    }

}))

exports.localLogIn = asyncHandler((req, res, next) => {
    passport.authenticate("local", function (err, user, info) {
        if (err) { return next(err) }
        if (!user) { return res.json({ message: info.message }) }
        if (user) {
            // console.log(user);
            return res.json({ success: true, user })
        }
    })(req, res, next);
}
)


//for password google auth only
exports.savePassword = asyncHandler(async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        res.json({ success: false, message: 'User does not exist' }).status(400)
    } else {
        user.password = req.body.password
        await user.save()
        res.json({ success: true, message: 'User password now saved' }).status(200)
    }
})


exports.getPasswordToken = asyncHandler(async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        res.json({ success: false, message: 'email is not registered' }).status(400)
    } else {
        //i will use nodemailer to send  a link to the email if found

    }
})



