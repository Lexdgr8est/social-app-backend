// *Initializing the modules
const express = require('express')

const session = require('express-session')
const passport = require('passport')
require('dotenv').config()
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
// *middleware
require('./config/local-auth')(passport)
require('./config/google-auth')(passport)





// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log(`DB connected...`);
//     })
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', '*')

//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
//         res.status(200).json({});
//     }
//     next();
// });
app.use(morgan('dev'))



//session middleware
app.use(session({
    secret: 'dfkm',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(cookieParser('dfkm'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())


app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next();
})


// ?importing routes
const home = require('./routes/main')
const signup = require('./routes/auth/userAuth')

// *testing the server
app.use('/', home)
app.use('/auth', signup)






// *Running the server
app.listen(process.env.PORT, () => {
    console.log(`Running on PORT ${process.env.PORT}`);
})
