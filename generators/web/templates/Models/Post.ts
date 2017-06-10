'use strict';

/**
 * App imports
 */
import {
    AssimilatedModel,
    AssimilatedModelParams,
    Required
} from './assimilated-model.class';
import { User } from "./User";
import { Blog } from "./Blog";

/**
 * This is a Model class for the whole app :
 * it will be used as the reference Model for the Front-End,
 * another driver-specific Model will be used for mongoose in the Back-End
 */
export class Post extends AssimilatedModel {
    @Required
    title: string;

    @Required
    author: User;

    @Required
    body: string;

    @Required
    blog: Blog;

    visibility: boolean = true;

    constructor(params: PostParams) {
        super(params);

        // Defining required properties
        this.title = this.defineModelProperty("title", params.title);
        this.author = this.defineModelProperty("author", params.author);
        this.body = this.defineModelProperty("body", params.body);
        this.blog = this.defineModelProperty("blog", params.blog);

        // Defining optional properties
        this.visibility = this.defineModelProperty("visibility", params.visibility, true);
    }
}

export interface PostParams extends AssimilatedModelParams {
    title: string;
    author: User;
    body: string;
    blog: Blog;
    visibility?: boolean;
}
