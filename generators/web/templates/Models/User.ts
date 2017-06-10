'use strict';

/**
 * App imports
 */
import {
    AssimilatedModel,
    AssimilatedModelParams,
    Required
} from './assimilated-model.class';

/**
 * This is a Model class for the whole app :
 * it will be used as the reference Model for the Front-End,
 * another driver-specific Model will be used for mongoose in the Back-End
 */
export class User extends AssimilatedModel {
    @Required
    firstName: string;

    @Required
    lastName: string;

    role: string;
    email: string;

    get name(): string {
        return this.firstName + ' ' + this.lastName;
    }

    constructor(params: UserParams) {
        super(params);

        // Defining required properties
        this.firstName = this.defineModelProperty("firstName", params.firstName);
        this.lastName = this.defineModelProperty("lastName", params.lastName);

        // Defining optional properties
        this.email = this.defineModelProperty("email", params.email, '');
        this.role = this.defineModelProperty("role", params.role, '');
    }
}

export interface UserParams extends AssimilatedModelParams {
    firstName: string;
    lastName: string;
    name?: string;
    email?: string;
    role?: string;
}
