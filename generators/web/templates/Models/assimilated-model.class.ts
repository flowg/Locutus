'use strict';

/**
 * Decorators for AssimilatedModels
 */
const requiredMetadataKey = Symbol("required");
export const Required = Reflect["metadata"](requiredMetadataKey, true);

/**
 * Parent class for AssimilatedModels
 * and its interface
 */
export class AssimilatedModel {
    id: string;
    createdAt: string;
    updatedAt: string;

    constructor(params: AssimilatedModelParams) {
        this.id = this.defineModelProperty("id", params.id);
        this.createdAt = this.defineModelProperty("createdAt", params.createdAt);
        this.updatedAt = this.defineModelProperty("updatedAt", params.updatedAt);
    }

    protected defineModelProperty(propName: string, param: any, defaultValue: any = null): any {
        let isRequired: boolean = Reflect["getMetadata"](requiredMetadataKey, this, propName);

        if (isRequired && param === undefined) {
            throw new Error(`The '${propName}' parameter is required, please provide it`);
        }

        return (param === undefined) ? defaultValue : param;
    }
}

export interface AssimilatedModelParams {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
}
