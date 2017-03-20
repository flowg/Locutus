'use strict';

/**
 * Express imports
 */
import * as express from "express";
import Request = express.Request;
import Response = express.Response;
import NextFunction = express.NextFunction;
import Application = express.Application;

/**
 * Third-party imports ( https://www.npmjs.com/~types )
 */
import * as path from "path";
import * as debug from "debug";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
/*<% if (useDB) { %>*/
import * as mongoose from "mongoose";
require('mongoose').Promise = global.Promise;
import "./Models/Blog";
import { BlogDoc } from "./Models/Blog";
import "./Models/Post";
import { PostDoc } from "./Models/Post";
import "./Models/User";
import { UserDoc } from "./Models/User";
/*<% } %>*/

/**
 * App imports
 */
/*/ Getting Passport configuration
 require('./Config/passport');*/

/*// Getting routes configuration
 const frontRoutes = require('./Routing/front');
 const privateRoutes = require('./Routing/Back/Private/private');
 const userRoutes = require('./Routing/Back/user').router;*/

/**
 * App setup
 */







/*<% if (useDB) { %>*/// Dealing with Database
const dbName   = '<%= dbName %>';
const mongoURL = `mongodb://${process.env.MONGOHOST ? process.env.MONGOHOST : 'localhost'}/${dbName}`;
mongoose.connect(mongoURL);

mongoose.connection.once('open', () => {
    let Blog = mongoose.model('Blog');
    let User = mongoose.model('User');
    let Post = mongoose.model('Post');

    let userDoc = new User({
        firstName: 'Tata',
        lastName:  'Toto'
    });
    let blogDoc = new Blog({
        name:    'My Blog',
        creator: userDoc._id
    });
    let postDoc = new Post({
        author: userDoc._id,
        blog:   blogDoc._id
    });

    userDoc.save((err: Error, user: UserDoc) => {
        debugCore(user);
    });

    blogDoc.save((err: Error, blog: BlogDoc) => {
        debugCore(blog);
    });

    postDoc.save((err: Error, post: PostDoc) => {
        debugCore(post);

        Blog.find({}).populate('posts creator').exec((error: Error, blogs: BlogDoc[]) => {
            debugCore(blogs);
        });
    });
});
/*<% } %>*/

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
app.use(bodyParser.urlencoded({ extended: false }));
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
// Mounting the sup-app dedicated to serving the API
//app.use('/api', api);

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
    err.status   = 404;
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
            error:   err
        });
    });
}

// Production error handler : no stacktraces leaked to user
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error:   {}
    });
});

class RootExpress {
    private app: Application;
    private debug: debug.IDebugger;

    constructor() {
        this.app = express();
        this.debug = debug('root');

        this.init();
    }

    private init() {
        this.configureEnv();
        this.configureLocals();
        this.configureViewEngine();
    }

    /**
     * If specified in CLI, set environment mode
     */
    private configureEnv() {
        let env = process.argv.filter(el => el.indexOf('--env=') > -1).pop();
        if (env) {
            env = env.split('=').pop();
            this.app.set('env', env);
        }
    }

    /**
     * Setting local variables persisting during the whole app lifetime
     */
    private configureLocals() {
        this.app.locals.title = '<%= appName %>';
    }

    /**
     * Telling where to look for Views and
     * which engine to use for .html files
     */
    private configureViewEngine() {
        let viewsFolder = (this.app.get('env') === 'development') ? 'Angular' : 'Angular/aot';
        this.app.set('views', path.join(__dirname, viewsFolder));
        this.app.set('view engine', 'html');
        this.app.engine('html', require('ejs').renderFile);
    }
}

module.exports = app;
