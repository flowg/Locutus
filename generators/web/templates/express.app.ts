"use strict";

/**
 * Third-party imports
 */
import * as express from "express";
import Request = express.Request;
import Response = express.Response;
import NextFunction = express.NextFunction;

/**
 * Third-party requires
 */
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
/*const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');*/

/**
 * App requires
 */
/*// Registering schemas for all models in global mongoose instance
require('./Models/Users');
require('./Models/TeamMembers');

// Getting Passport configuration
require('./Config/passport');*/

/*// Getting routes configuration
const frontRoutes = require('./Routing/front');
const privateRoutes = require('./Routing/Back/Private/private');
const userRoutes = require('./Routing/Back/user').router;*/

/**
 * App setup
 */
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'Angular'));
app.set('view engine', 'ejs');

/*// Dealing with Database
const mongoURL = `mongodb://${process.env.MONGOHOST}/DTEC_Website`;
mongoose.connect(mongoURL);

const store = new MongoDBStore(
    {
        uri: mongoURL,
        collection: 'sessions'
    }
);
store.on('error', function (error) {
    // Also get an error here
});*/

/**
 * App-level Middlewares
 */
// Uncomment after placing your favicon in /Public
//app.use(favicon(path.join(__dirname, 'Public', 'favicon.ico')));
app.use(logger('dev'));
// This app only parses automatically application/json & application/x-www-form-urlencoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/*app.use(session({
    cookie: {
        path: '/back'
        //domain: ''
    },
    resave: false,
    saveUninitialized: false,
    secret: 'winter is coming',
    store: store,
    unset: 'destroy'
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());*/

// Setting up all possible folders for serving static files ( JS, CSS, Fonts, Images )
app.use(express.static(path.join(__dirname, 'Angular')));
app.use(express.static(path.join(__dirname, 'Config')));
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

/**
 * App routing
 */
// Delegating routing to Angular router for non API routes
app.get('/*', (req: Request, res: Response, next: NextFunction) => {
    res.render('index');
});

/*app.use('/back', userRoutes);
app.use('/back', privateRoutes);
app.use('/', frontRoutes);*/

// If you get here, no route has matched : catch 404 and forward to error handlers
app.use((req: Request, res: Response, next: NextFunction) => {
    let err: any = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * Error handlers
 */
// Development error handler : will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.log(err);
        console.log(req.headers);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler : no stacktraces leaked to user
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;