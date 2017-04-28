'use strict';
/**
 * Third-party imports
 */
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { BlogDoc } from "./Blog";
import { UserDoc } from "./User";

/**
 * Schema
 */
// Schema options
const options = {
    timestamps: true,
    toJSON:     { getters: true, virtuals: true },
    toObject:   { getters: true, virtuals: true },
};

// Schema definition
const PostSchema: Schema = new Schema({
    title:      String,
    author:     { type: Schema.Types.ObjectId, ref: 'User' },
    body:       String,
    blog:       { type: Schema.Types.ObjectId, ref: 'Blog' },
    visibility: { type: Boolean, default: true }
}, options);

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

/**
 * Document interface for TypeScript:
 * Don't forget the virtuals & put the associated interfaces
 * in fields holding references to other collections
 */
export interface PostDoc extends Document {
    title: string;
    author: UserDoc;
    body: string;
    blog: BlogDoc;
    visibility: boolean;
}

/**
 * Model compilation
 */
mongoose.model('Post', PostSchema);
