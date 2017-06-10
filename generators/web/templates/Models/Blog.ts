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
import { Post } from "./Post";

// TODO: create a Model class , that all Models should extend
// TODO: put in it all the methods necessary to generate a Mongoose Model from this file
// TODO: then make the 'yo locutus create models for <driver>' as another generator
/**
 * This is a Model class for the whole app :
 * it will be used as the reference Model for the Front-End,
 * another driver-specific Model will be used for mongoose in the Back-End
 */
export class Blog extends AssimilatedModel {
    @Required
    name: string;

    @Required
    creator: User;

    intro: string;
    visibility: boolean;
    posts: Post[];

    constructor(params: BlogParams) {
        super(params);

        // Defining required properties
        this.name = this.defineModelProperty("name", params.name);

        let creatorValue: User | string = (typeof params.creator === 'string') ? params.creator : new User(params.creator);
        this.creator = this.defineModelProperty("creator", creatorValue);

        // Defining optional properties
        this.intro = this.defineModelProperty("intro", params.intro, '');
        this.visibility = this.defineModelProperty("visibility", params.visibility, true);
        this.posts = this.defineModelProperty("posts", params.posts, []);
    }
}

export interface BlogParams extends AssimilatedModelParams {
    name: string;
    creator: User | string;
    intro?: string;
    visibility?: boolean;
    posts?: Post[];
}
