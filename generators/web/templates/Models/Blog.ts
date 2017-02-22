'use strict';

/**
 * Third-party imports
 */
import * as mongoose from 'mongoose';

/**
 * Schema definition
 */
// Schema options
const options = {
    timestamps: true
};

// Document properties
const BlogSchema = new mongoose.Schema({
    name:  String,
    creator: String, // TODO: make a reference to a User Model ( http://mongoosejs.com/docs/populate.html )
    intro:   String,
    posts: [{ body: String, date: Date }], // TODO: remove here and put a reference to a Blog in Post Schema
    visibility: { type:Boolean, default: true }
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
 * schema.virtual('virtualName').get(() => {...})
 * schema.virtual('virtualName').set((...) => {...})
 */

/**
 * Model compilation
 */
mongoose.model('Blog', BlogSchema);
