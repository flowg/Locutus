'use strict';

/**
 * Express imports
 */
import { Application } from "express-serve-static-core";

/**
 * Third-party imports ( https://www.npmjs.com/~types )
 */
import * as debug from "debug";

/**
 * SubApp interface designed for all *Express classes,
 * actually describing a sub-app, from the Express point of view.
 * Make sure all these classes implement it
 */
export interface SubApp {
    app: Application;
    debug: debug.IDebugger;

    init(): void;
    configureEnv(): void;
    configureLocals(): void;
    configureMiddleware(): void;
    configureRouting(): void;
    configureErrorHandler(): void;
}

/**
 * App interface designed for the only *Express class,
 * actually describing the main app, from the Express point of view.
 * Make sure that class implements it
 */
export interface App extends SubApp {
    viewsFolder: string;

    configureViewEngine(): void;
    configureDB(): void;
}