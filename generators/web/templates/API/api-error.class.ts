'use strict';

/**
 * APIError class representing the generic Error object emitted
 * by a call to the API resulting in an error
 */
export class APIError extends Error {
    url: string;
    method: string;
    status: number;
    stackTrace: string[];
    message: string;

    constructor(options: APIErrorParams) {
        super();

        this.url        = options.url;
        this.method     = options.method;
        this.status     = options.status || 500;
        this.stackTrace = options.env === 'development' ? this.stack.split('\n') : [ '' ];
        this.message    = options.message;
    }
}

export interface APIErrorParams {
    url: string;
    method: string;
    status?: number;
    message: string;
    env: string;
}
