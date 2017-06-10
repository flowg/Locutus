'use strict';

/**
 * Express imports
 */
import { Router } from "express-serve-static-core";

/**
 * Third-party imports ( https://www.npmjs.com/~types )
 */
import * as debug from "debug";
import { Document, Model } from "mongoose";

/**
 * Endpoint interface designed for all *Endpoint classes in the /API folder.
 * Make sure all these classes implement it
 */
export interface Endpoint {
    router: Router;
    debug: debug.IDebugger;
    endpointURL: string;
    model: Model<Document>;
    id: string;

    initParamsHandlers(): void;
    initRoutesHandlers(): void;
}