'use strict';

/**
 * Third-party imports ( https://www.npmjs.com/~types )
 */
import * as express from 'express';
import Request = express.Request;
import Response = express.Response;
import NextFunction = express.NextFunction;
import * as path from 'path';
import * as debugRaw from 'debug';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
//<% if (useDB) { %>
import * as mongoose from 'mongoose';
//<% } %>

/**
 * Third-party requires
 */
/*const favicon = require('serve-favicon');*/
/*const session = require('express-session');
 const MongoDBStore = require('connect-mongodb-session')(session);
 const flash = require('connect-flash');
 const passport = require('passport');*/

/**
 * App requires
 */
// Registering schemas for all models in global mongoose instance
import './Models/Blog';
import './Models/Post';
import './Models/User';

/*/ Getting Passport configuration
 require('./Config/passport');*/

/*// Getting routes configuration
 const frontRoutes = require('./Routing/front');
 const privateRoutes = require('./Routing/Back/Private/private');
 const userRoutes = require('./Routing/Back/user').router;*/

/**
 * App setup
 */
const app = express();
const debug = debugRaw('core');

// If specified in CLI, set environment mode
let env = process.argv.filter(el => el.indexOf('--env=') > -1).pop();
if (env) {
    env = env.split('=').pop();
    app.set('env', env);
}

// View engine setup
let viewsFolder = (app.get('env') === 'development') ? 'Angular' : 'Angular/aot';
app.set('views', path.join(__dirname, viewsFolder));
app.set('view engine', 'ejs');

//<% if (useDB) { %>
// Dealing with Database
const dbName = '<%= dbName %>';
const mongoURL = `mongodb://${process.env.MONGOHOST ? process.env.MONGOHOST : 'localhost'}/${dbName}`;
mongoose.connect(mongoURL);

mongoose.connection.once('open', () => {
    let Blog = mongoose.model('Blog');
    let User = mongoose.model('User');
    let Post = mongoose.model('Post');

    let user = new User({
        firstName: 'Tata',
        lastName: 'Toto'
    });
    let blog = new Blog({
        name: 'My Blog',
        creator: user._id
    });
    let post = new Post({
        author: user._id,
        blog: blog._id
    });

    user.save((err: Error, user: any) => {
        debug(user);
    });

    blog.save((err: Error, blog: any) => {
        debug(blog);
    });

    post.save((err: Error, post: any) => {
        debug(post);

        Blog.find({}).populate('posts creator').exec(function(error, blogs) {
            debug(blogs);

            for (blog of blogs) {
                debug('-----------------> Showing blog id: ', blog._id);

                for (post of blog['posts']) {
                    debug('Showing post : ', post);
                }
            }
        });
    });
});
//<% } %>

/*const store = new MongoDBStore(
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
/*app.use(favicon(path.join(__dirname, 'Public', 'favicon.ico')));*/
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
app.use(express.static(path.join(__dirname, viewsFolder)));
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
