'use strict';

/**
 * Third-party imports
 */
import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { UserDoc } from './User';
import { PostDoc } from './Post';

/**
 * Schema
 */
// Schema options
const options = {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
};

// Schema definition
const BlogSchema = new Schema({
    name: String,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    intro:  String,
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
BlogSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'blog'
});

/**
 * Document interface for TypeScript:
 * Don't forget the virtuals & put the associated interfaces
 * in fields holding references to other collections
 */
export interface BlogDoc extends Document {
    name: string;
    creator: UserDoc;
    intro:  string;
    visibility: boolean;
    posts: PostDoc[];
}

/**
 * Model compilation
 */
mongoose.model('Blog', BlogSchema);
