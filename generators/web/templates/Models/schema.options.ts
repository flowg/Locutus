"use strict";

/**
 * Third-party imports
 */
import { SchemaOptions } from "mongoose";

export const SCHEMA_GLOBAL_OPTIONS: SchemaOptions = {
	timestamps: true,
	toJSON: { getters: true, virtuals: true },
	toObject: { getters: true, virtuals: true },
};
