// *Initializing the modules
const express = require('express')
const passport = require('passport')
require('dotenv').config()

const app = express()

// *middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// *testing the server
app.use('/', require('./routes/api/main'))

// *Running the server
app.listen(process.env.PORT, () => {
    console.log(`Running on PORT ${process.env.PORT}`);
})
