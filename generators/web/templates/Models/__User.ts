'use strict';
/**
 * Third-party imports
 */
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

/**
 * App imports
 */
import { SCHEMA_GLOBAL_OPTIONS } from "Models/schema.options";

/**
 * Schema
 */
// Schema definition
const UserSchema: Schema = new Schema({
    firstName: String,
    lastName:  String,
    email:     String,
    role:      String
}, SCHEMA_GLOBAL_OPTIONS);

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
UserSchema.virtual('name').get(function () {
    return this.firstName + ' ' + this.lastName;
});

/**
 * Interfaces for TypeScript:
 * - Add the virtuals as optional properties
 * - The first one will mostly be used for creation in the Front-End
 * - The second one will be used in both Back and Front
 */
export interface User {
    firstName: string;
    lastName: string;
    name?: string;
    email: string;
    role: string;
}

export interface UserDoc extends User, Document {
}

/**
 * Model compilation
 */
mongoose.model('User', UserSchema);
