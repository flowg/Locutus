'use strict';

/**
 * Express imports
 */
import * as express from "express";
import {
    Application,
    Request,
    Response,
    NextFunction,
    Router
} from "express-serve-static-core";

/**
 * Third-party imports ( https://www.npmjs.com/~types )
 */
import * as debug from "debug";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

/**
 * App imports
 */
import { blogsRouter } from "./blogs.endpoint";
import { SubApp } from "../app.interface";
import { APIError, APIErrorParams } from "./api-error.class";

/**
 * Configuring Express sub-app in charge with the API, via this class:
 * the order of the app setup sequence, as well as
 * the order of the app.use() calls, are VERY IMPORTANT
 */
class ApiExpress implements SubApp {
    app: Application;
    debug: debug.IDebugger;
    debugErrors: debug.IDebugger;

    constructor() {
        this.app         = express();
        this.debug       = debug('api');
        this.debugErrors = debug('API-ERROR');

        this.init();
    }

    /**
     * Sub-app setup sequence
     */
    init() {
        this.configureEnv();
        this.configureLocals();
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
        let env = process.argv.filter(el => el.indexOf('--env=') > -1).pop();
        if (env) {
            env = env.split('=').pop();
            this.app.set('env', env);
        }
    }

    /**
     * Setting local variables persisting during the whole app lifetime
     * WARNING: these are not inherited by a sub-app
     */
    configureLocals() {
    }

    /**
     * Configuring sub-app-level Middleware
     */
    configureMiddleware() {
        // This app now parses automatically only application/json bodies, available at req.body
        this.app.use(bodyParser.json());

        // This app now parses automatically the Cookie request header, populates req.cookies
        this.app.use(cookieParser());
    }

    /**
     * Configuring sub-app routing for the API
     */
    configureRouting() {
        /*
         * Please add all your endpoints routers
         * in this array    ||
         *                  ||
         *                  ||
         *                  \/
         */
        let endpointsRouters: Router[] = [
            blogsRouter
        ];

        // Mounting all endpoints
        this.app.use('/', endpointsRouters);

        // If you get here, no route has matched : it may be a bad URL or bad method
        // TODO: adapt this to API global errors
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            let errParams: APIErrorParams = {
                url:     req.baseUrl + req.url,
                method:  req.method,
                status:  404,
                message: 'Not Found: it may be a bad URL or bad method',
                env:     this.app.get('env')
            };
            let err: any                  = new APIError(errParams);

            next(err);
        });
    }

    /**
     * Configuring error handler
     */
    configureErrorHandler() {
        const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
            if (this.app.get('env') === 'development') {
                this.debugErrors(err);
                this.debugErrors(req.headers);
            }

            res.status(err.status || 500).json(err);
        };

        this.app.use(errorHandler);
    }
}

/**
 * Creating the sub-app via instantiation
 * and exporting it
 */
const apiExpress: ApiExpress            = new ApiExpress();
export const apiExpressApp: Application = apiExpress.app;
