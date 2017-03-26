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
import * as debug from "debug";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

/**
 * App imports
 */


/**
 * Configuring Express sub-app in charge with the API, via this class:
 * the order of the app setup sequence, as well as
 * the order of the app.use() calls, are VERY IMPORTANT
 */
class ApiExpress {
    app: Application;
    private debug: debug.IDebugger;
    private debugErrors: debug.IDebugger;

    constructor() {
        this.app = express();
        this.debug = debug('api');
        this.debugErrors = debug('API-ERROR');

        this.init();
    }

    /**
     * Sub-app setup sequence
     */
    private init() {
        this.configureEnv();
        this.configureLocals();
        this.configureMiddleware();
        this.configureRouting();
        this.configureErrorHandler();
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
     * Configuring sub-app-level Middleware
     */
    private configureMiddleware() {
        // This app now parses automatically only application/json bodies, available at req.body
        this.app.use(bodyParser.json());

        // This app now parses automatically the Cookie request header, populates req.cookies
        this.app.use(cookieParser());
    }

    /**
     * Configuring sub-app routing for the API
     */
    private configureRouting() {
        // If you get here, no route has matched : it may be a bad URL or bad method
        // TODO: adapt this to API global errors
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            let err: any = new Error('Not Found');
            err.status   = 404;
            next(err);
        });
    }

    /**
     * Configuring error handler
     */
    private configureErrorHandler() {
        const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
            let errorToDisplay: any = {};

            if (this.app.get('env') === 'development') {
                this.debugErrors(err);
                this.debugErrors(req.headers);
                errorToDisplay = err;
            }

            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error:   errorToDisplay
            });
        };

        this.app.use(errorHandler);
    }
}

/**
 * Creating the sub-app via instantiation
 * and exporting it
 */
const apiExpress: ApiExpress = new ApiExpress();
export const apiExpressApp: Application = apiExpress.app;
