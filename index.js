// *Initializing the modules
const express = require('express')
const passport = require('passport')
const session = require('express-session')
require('dotenv').config()
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')

const app = express();

// *middleware
require('./config/google-auth')(passport)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`DB connected...`);
    })

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        res.status(200).json({});
    }
    next();
});


//session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))


// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// *testing the server
app.use('/', require('./routes/api/main'))

// *Running the server
app.listen(process.env.PORT, () => {
    console.log(`Running on PORT ${process.env.PORT}`);
})
