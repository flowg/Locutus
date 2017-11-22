'use strict';

/**
 * Express imports
 */
import * as express from "express";
import {
    Application,
    Request,
    Response,
    NextFunction
} from "express-serve-static-core";

/**
 * Third-party imports ( https://www.npmjs.com/~types )
 */
import * as path from "path";
import * as debug from "debug";
import * as logger from "morgan";
import * as favicon from "serve-favicon";
//<% if (useDB) { %>
//<% if (dbType === 'mongo') { %>
import * as mongoose from "mongoose";

require( 'mongoose' ).Promise = global.Promise;
//<% } %>
//<% } %>

/**
 * App imports
 */
//<% if (useDB) { %>
//<% if (dbType === 'mongo') { %>
/**
 * Mongoose imports:
 * WARNING, must be imported now, so that models are already built
 * and provided to the Mongoose instance, when used elsewhere in
 * modules imported after here
 */
import "./Models/Mongoose/Blog";
import { BlogDoc } from "./Models/Mongoose/Blog";
import "./Models/Mongoose/Post";
import { PostDoc } from "./Models/Mongoose/Post";
import "./Models/Mongoose/User";
import { UserDoc } from "./Models/Mongoose/User";
//<% } %>
//<% } %>

/*/ Getting Passport configuration
 require('./Config/passport');*/
import { App } from "./app.interface";
import { apiExpressApp } from './API/api.express';

/**
 * Configuring main Express app via this class:
 * the order of the app setup sequence, as well as
 * the order of the app.use() calls, are VERY IMPORTANT
 */
class RootExpress implements App {
    app: Application;
    debug: debug.IDebugger;
    debugErrors: debug.IDebugger;
    viewsFolder: string;

    constructor() {
        this.app         = express();
        this.debug       = debug( 'root' );
        this.debugErrors = debug( 'ROOT-ERROR' );

        this.init();
    }

    /**
     * App setup sequence
     */
    init() {
        this.configureEnv();
        this.configureLocals();
        this.configureViewEngine();
        //<% if (useDB) { %>
        this.configureDB();
        //<% } %>
        this.configureMiddleware();
        this.configureRouting();
        this.configureErrorHandler();
    }

    /**
     * If specified in CLI, set environment mode
     * WARNING: must be set also in a sub-app
     * since the env setting won't be inherited
     */
    configureEnv() {
        let env = process.argv.filter( el => el.indexOf( '--env=' ) > -1 ).pop();
        if ( env ) {
            env = env.split( '=' ).pop();
            this.app.set( 'env', env );
        }
    }

    /**
     * Setting local variables persisting during the whole app lifetime
     * WARNING: these are not inherited by a sub-app
     */
    configureLocals() {
        this.app.locals.title = '<%= appName %>';
    }

    /**
     * Telling where to look for Views and
     * which engine to use for .html files
     */
    configureViewEngine() {
        this.viewsFolder = ( this.app.get( 'env' ) === 'development' ) ? 'Angular' : 'Angular/aot';
        this.app.set( 'views', path.join( __dirname, this.viewsFolder ) );
        this.app.set( 'view engine', 'html' );
        this.app.engine( 'html', require( 'ejs' ).renderFile );
    }

    //<% if (useDB) { %>
    /**
     * Connecting to database
     */
    configureDB() {
        // Dealing with Database
        const dbName   = '<%= dbName %>';
        //<% if (dbType === 'mongo') { %>
        const mongoURL = `mongodb://${process.env.MONGOHOST ? process.env.MONGOHOST : 'localhost'}/${dbName}`;
        mongoose.connect( mongoURL, { useMongoClient: true } );

        mongoose.connection.once( 'open', () => {
            let Blog = mongoose.model( 'Blog' );
            let User = mongoose.model( 'User' );
            let Post = mongoose.model( 'Post' );

            let userDoc = new User( {
                firstName: 'Tata',
                lastName:  'Toto'
            } );
            let blogDoc = new Blog( {
                name:    'My Blog',
                creator: userDoc._id
            } );
            let postDoc = new Post( {
                author: userDoc._id,
                blog:   blogDoc._id
            } );

            userDoc.save( ( err: Error, user: UserDoc ) => {
                this.debug( user );
            } );

            blogDoc.save( ( err: Error, blog: BlogDoc ) => {
                this.debug( blog );
            } );

            postDoc.save( ( err: Error, post: PostDoc ) => {
                this.debug( post );

                Blog.find( {} ).populate( 'posts creator' ).exec( ( error: Error, blogs: BlogDoc[] ) => {
                    this.debug( blogs );
                } );
            } );
        } );

        /*const store = new MongoDBStore(
         {
         uri: mongoURL,
         collection: 'sessions'
         }
         );
         store.on('error', function (error) {
         // Also get an error here
         });*/
        //<% } %>
    }

    //<% } %>

    /**
     * Configuring app-level Middleware
     */
    configureMiddleware() {
        // Instructs Express to serve your favicon
        this.app.use( favicon( path.join( __dirname, 'Assets/Images', 'favicon.ico' ) ) );

        // Setting logging middleware
        this.app.use( logger( 'dev' ) );

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
        this.app.use( express.static( path.join( __dirname, this.viewsFolder ) ) );
        this.app.use( express.static( path.join( __dirname, 'Config' ) ) );
        this.app.use( express.static( path.join( __dirname, 'Assets' ) ) );
        this.app.use( express.static( path.join( __dirname, 'Models' ) ) );
        this.app.use( express.static( path.join( __dirname, 'node_modules' ) ) );
    }

    /**
     * Configuring app routing
     */
    configureRouting() {
        // Mounting the sup-app dedicated to serving the API
        this.app.use( '/api', apiExpressApp );

        // Delegating routing to Angular router for non API routes
        this.app.get( '/*', ( req: Request, res: Response, next: NextFunction ) => {
            res.render( 'index' );
        } );

        // If you get here, no route has matched : catch 404 and forward to error handlers
        this.app.use( ( req: Request, res: Response, next: NextFunction ) => {
            let err: any = new Error( 'Not Found' );
            err.status   = 404;

            next( err );
        } );
    }

    /**
     * Configuring error handler
     */
    configureErrorHandler() {
        const errorHandler = ( err: any, req: Request, res: Response, next: NextFunction ) => {
            let stack: string = '';
            if ( this.app.get( 'env' ) === 'development' ) {
                this.debugErrors( err );
                this.debugErrors( req.headers );
                stack = err.stack;
            }

            res.status( err.status || 500 );
            res.render( 'error', {
                message: err.message,
                status:  err.status,
                stack:   stack
            } );
        };

        this.app.use( errorHandler );
    }
}

/**
 * Creating the app via instantiation
 * and exporting it
 */
const rootExpress: RootExpress           = new RootExpress();
export const rootExpressApp: Application = rootExpress.app;
