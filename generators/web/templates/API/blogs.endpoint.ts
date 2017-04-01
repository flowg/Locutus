'use strict';

/**
 * Express imports
 */
import * as express from "express";
import {
    Request,
    Response,
    NextFunction,
    Router
} from "express-serve-static-core";

/**
 * Third-party imports ( https://www.npmjs.com/~types )
 */
import * as debug from "debug";
import * as mongoose from "mongoose";

/**
 * App imports
 */
import { BlogDoc } from "../Models/Blog";
import { Endpoint } from "../Locutus/endpoint.interface";

/**
 * Configuring the endpoint for the 'blogs' resource via this class:
 * - Firstly, create a specific private handler for a route and an HTTP method
 * - Secondly, update the initRoutesHandlers method by actually
 * telling the inner endpoint router to use that new handler for this route
 * and this HTTP method
 */
class BlogsEndpoint implements Endpoint {
    router: Router;
    debug: debug.IDebugger;
    endpointURL: string = '/blogs';

    constructor() {
        this.router = express.Router();
        this.debug  = debug('blogs-endpoint');

        this.initRoutesHandlers();
    }

    /**
     * Setting the router by mapping
     * routes with handlers
     */
    initRoutesHandlers() {
        // Initializing handlers for the '/blogs' URL
        this.router.route(this.endpointURL)
            .get(this.getHandler);
    }

    /**
     * Handler for the GET HTTP method
     *
     * @URL '/blogs'
     *
     * @param req
     * @param res
     * @param next
     */
    private getHandler(req: Request, res: Response, next: NextFunction) {
        let Blog = mongoose.model('Blog');

        Blog.find({}).populate('posts creator').exec((error: Error, blogs: BlogDoc[]) => {
            res.json(blogs);
        });
    }
}

/**
 * Creating the endpoint via instantiation
 * and exporting its router
 */
const blogsEndpoint: BlogsEndpoint = new BlogsEndpoint();
export const blogsRouter: Router   = blogsEndpoint.router;
