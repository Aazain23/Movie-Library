require("dotenv").config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-startergy');
//Mongo-store
const MongoStore = require('connect-mongo');

//cookie-parser
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Database
const db = require('./config/mongoose');

// Include layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// For styling static files
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Static files
app.use(express.static('./assets'));

// EJS Set-up
app.set('view engine', 'ejs');
app.set('views', './views');

// MongoStore stores session cookies
app.use(session({
    name: 'MovieApp',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://Aazain:aazain2003@aazain.farumhg.mongodb.net/?retryWrites=true&w=majority&appName=Aazain',
        autoRemove: 'disabled'
    }, function(err) {
        console.log(err || "Connection is fine");
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        console.log("Error:", err);
        return;
    }
    console.log("Successfully running on port", port);
});
