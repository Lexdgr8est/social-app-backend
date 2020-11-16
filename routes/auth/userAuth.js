const express = require('express')
const router = express.Router()
const passport = require('passport')
// const { ensureAuth } = require('../../middleware/ensureAuth')
const { registerUser, localLogIn, savePassword, getPasswordToken } = require('../../controller/auth-controller')

//for signing up
router.post('/signup', registerUser)


//for logging in
router.post("/login", localLogIn);


// ?for updating password (google auth only)
router.post('/password', savePassword)


router.post('/password-token', getPasswordToken)

module.exports = router