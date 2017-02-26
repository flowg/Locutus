'use strict';

/**
 * Third-party imports
 */
import * as mongoose from 'mongoose';

/**
 * Schema definition
 */
const Schema = mongoose.Schema;

// Schema options
const options = {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
};

// Document properties
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
 * schema.virtual('virtualName').get(() => {...})
 * schema.virtual('virtualName').set((...) => {...})
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
 * Model compilation
 */
mongoose.model('Blog', BlogSchema);
