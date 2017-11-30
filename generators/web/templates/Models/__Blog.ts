'use strict';
/**
 * Third-party imports
 */
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

/**
 * App imports
 */
import { UserDoc } from "./__User";
import { PostDoc } from "./__Post";
import { SCHEMA_GLOBAL_OPTIONS } from "Models/schema.options";

/**
 * Schema
 */
// Schema definition
const BlogSchema: Schema = new Schema( {
    name:       String,
    creator:    { type: Schema.Types.ObjectId, ref: 'User' },
    intro:      String,
    visibility: { type: Boolean, default: true }
}, SCHEMA_GLOBAL_OPTIONS );

/*
 * Document instance methods:
 * schema.methods.methodName = (..., cb) => {...}
 */

/*
 * Model static methods:
 * schema.statics.methodName = (..., cb) => {...}
 */

/*
 * Schema query helpers:
 * schema.query.methodName = (...) => {...}
 */

/*
 * Schema indexes:
 * schema.index({fieldName: <1;-1>, ...})
 */

/*
 * Schema virtuals:
 * schema.virtual('virtualName').get(function() {...}) // NO ARROW FUNCTION OR EMPTY THIS OBJECT
 * schema.virtual('virtualName').set(function(...) {...})
 * schema1.virtual('virtualName', {
 *      ref: 'schema2Name',             // The model to use
 *      localField: 'schema1Field',     // Find docs in schema2 where `schema1Field` ( in schema1,
 *                                      // SHOULD BE A FIELD WITH AN UNIQUE INDEX )
 *      foreignField: 'schema2Field'    // is equal to `schema2Field` ( in schema2 )
 *  });
 */
BlogSchema.virtual( 'posts', {
    ref:          'Post',
    localField:   '_id',
    foreignField: 'blog'
} );

/**
 * Interfaces for TypeScript:
 * - Add the virtuals as optional properties
 * - The first one will mostly be used for creation in the Front-End
 * - The second one will be used in both Back and Front
 */
export interface Blog {
    name: string;
    creator: UserDoc | Schema.Types.ObjectId;
    intro?: string;
    visibility?: boolean;
    posts?: PostDoc[];
}

export interface BlogDoc extends Blog, Document {
}

/**
 * Model compilation
 */
export const Blog = mongoose.model( 'Blog', BlogSchema );
