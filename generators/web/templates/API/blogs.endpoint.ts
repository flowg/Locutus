'use strict';

/**
 * Express imports
 */
import * as express from "express";
import {
    Request,
    Response,
    NextFunction,
    Router,
    RequestHandler
} from "express-serve-static-core";

/**
 * Third-party imports ( https://www.npmjs.com/~types )
 */
import * as debug from "debug";
import * as mongoose from "mongoose";
import { Document, Model } from "mongoose";

/**
 * App imports
 */
import { BlogDoc } from "../Models/Blog";
import { Endpoint } from "./endpoint.interface";

/**
 * Configuring the endpoint for the 'blogs' resource via this class:
 *
 * - Firstly, create a specific private handler for a route and an HTTP method
 * WARNING: handlers must be properties holding a method with the arrow syntax,
 * otherwise, the THIS object will be UNDEFINED
 *
 * - Secondly, update the initRoutesHandlers method by actually
 * telling the inner endpoint router to use that new handler for these specific route
 * and HTTP method
 */
class BlogsEndpoint implements Endpoint {
    router: Router;
    debug: debug.IDebugger;
    endpointURL: string = '/blogs';
    model: Model<Document>;
    id: string;

    constructor() {
        this.router = express.Router();
        this.debug  = debug('blogs-endpoint');
        this.model  = mongoose.model('Blog');

        this.initParamsHandlers();
        this.initRoutesHandlers();
    }

    /**
     * Setting the router by mapping
     * certain route parameters with handlers
     */
    initParamsHandlers() {
        // Initializing handler for the blog :id parameter
        this.router.param('id', (req, res, next, id) => {
            this.id = id;
            next();
        });
    }

    /**
     * Setting the router by mapping
     * routes with handlers
     */
    initRoutesHandlers() {
        // Initializing handlers for the '/blogs' URL
        this.router.route(this.endpointURL)
            .post(this.createNewBlog)
            .get(this.getAllBlogs);

        // Initializing handlers for the '/blogs/:id' URL
        this.router.route(this.endpointURL + '/:id')
            .delete(this.deleteThisBlog)
            .put(this.updateThisBlog);
    }

    /******************************************************************************************************************\
     *                                                                                                                *
     *                                                  ROUTES HANDLERS                                               *
     *                  WARNING: must be properties holding a method with the arrow syntax, otherwise,                *
     *                                          the THIS object will be UNDEFINED                                     *
     *                                                                                                                *
     \******************************************************************************************************************/

    /**
     * Handler for the GET HTTP method:
     * retrieves all blogs in DB
     *
     * @URL '/blogs'
     *
     * @param req
     * @param res
     * @param next
     */
    private getAllBlogs: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        this.model.find({}).populate('posts creator').exec((error: Error, blogs: BlogDoc[]) => {
            res.json(blogs);
        });
    };

    /**
     * Handler for the PUT HTTP method:
     * updates the blog with ID id
     *
     * @URL '/blogs/:id'
     *
     * @param req
     * @param res
     * @param next
     */
    private updateThisBlog: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        this.model.findByIdAndUpdate(this.id, { $set: { name: req.body.name } }, { new: true }, (err, updatedBlog) => {
            if (err) {
                return next(err);
            }

            res.json(updatedBlog);
        });
    };

    /**
     * Handler for the POST HTTP method:
     * creates a new blog
     *
     * @URL '/blogs'
     *
     * @param req
     * @param res
     * @param next
     */
    private createNewBlog: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        this.model.create(req.body, (err, createdBlog: BlogDoc) => {
            if (err) {
                return next(err);
            }

            this.model.find({_id: createdBlog._id}).populate('posts creator').exec((error: Error, blogs: BlogDoc[]) => {
                if (err) {
                    return next(err);
                }

                res.json(blogs.pop());
            });
        });
    };

    /**
     * Handler for the DELETE HTTP method:
     * deletes the blog with ID id
     *
     * @URL '/blogs/:id'
     *
     * @param req
     * @param res
     * @param next
     */
    private deleteThisBlog: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        this.model.remove({ _id: this.id }, (err) => {
            if (err) {
                return next(err);
            }

            res.json({success: true, deleted: this.id});
        });
    };
}

/**
 * Creating the endpoint via instantiation
 * and exporting its router
 */
const blogsEndpoint: BlogsEndpoint = new BlogsEndpoint();
export const blogsRouter: Router   = blogsEndpoint.router;
