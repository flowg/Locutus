'use strict';

/**
 * Angular imports
 */
import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from "@angular/http";

/**
 * Third-party imports
 */
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
//<% if (useJWT) { %>
import { AuthHttp } from "angular2-jwt";
//<% } %>

@Injectable()
export class CentralNexusService {
    private headers: Headers;
    private options: RequestOptions;
    private apiPrefix: string = 'api';

    constructor(/*<% if (useJWT) { %>*/private authHttp: AuthHttp, /*<% } %>*/private http: Http) {
        // Adding cache related headers because of IE
        this.headers = new Headers({
            'Content-Type':      'application/json',
            'If-Modified-Since': 'Wed, 01 May 1985 15:30:00 GMT',
            'Cache-Control':     'no-cache',
            'Pragma':            'no-cache'
        });
        this.options = new RequestOptions({ headers: this.headers });
    }

    sendGetRequest(url: string, transform: (val: any) => any/*<% if (useJWT) { %>*/, secure: boolean/*<% } %>*/) {
        let request: Observable<any>;
        url = this.apiPrefix + '/' + url;

        //<% if (useJWT) { %>
        if (secure) {
            request = this.authHttp.get(url, this.options)
                .map((res: Response) => res.json())
                .map(transform)
                .catch(this.handleError);
        } else {
            request = this.http.get(url, this.options)
                .map((res: Response) => res.json())
                .map(transform)
                .catch(this.handleError);
        }
        //<% } %>
        //<% if (!useJWT) { %>
        request = this.http.get(url, this.options)
            .map((res: Response) => res.json())
            .map(transform)
            .catch(this.handleError);
        //<% } %>

        return request;
    }

    sendPostRequest(url: string, body: any, options: RequestOptions = new RequestOptions(), transform: (val: any) => any/*<% if (useJWT) { %>*/, secure: boolean/*<% } %>*/) {
        let request: Observable<any>;
        url = this.apiPrefix + '/' + url;

        //<% if (useJWT) { %>
        if (secure) {
            request = this.authHttp.post(url, body, options)
                .map((res: Response) => res.json())
                .map(transform)
                .catch(this.handleError);
        } else {
            request = this.http.post(url, body, options)
                .map((res: Response) => res.json())
                .map(transform)
                .catch(this.handleError);
        }
        //<% } %>
        //<% if (!useJWT) { %>
        request = this.http.post(url, body, options)
            .map((res: Response) => res.json())
            .map(transform)
            .catch(this.handleError);
        //<% } %>

        return request;
    }

    sendPutRequest(url: string, body: any, options: RequestOptions = new RequestOptions(), transform: (val: any) => any/*<% if (useJWT) { %>*/, secure: boolean/*<% } %>*/) {
        let request: Observable<any>;
        url = this.apiPrefix + '/' + url;

        //<% if (useJWT) { %>
        if (secure) {
            request = this.authHttp.put(url, body, options)
                .map((res: Response) => res.json())
                .map(transform)
                .catch(this.handleError);
        } else {
            request = this.http.put(url, body, options)
                .map((res: Response) => res.json())
                .map(transform)
                .catch(this.handleError);
        }
        //<% } %>
        //<% if (!useJWT) { %>
        request = this.http.put(url, body, options)
            .map((res: Response) => res.json())
            .map(transform)
            .catch(this.handleError);
        //<% } %>

        return request;
    }

    private handleError(error: any): Observable<any> {
        console.log(error);
        // TODO: In production, implement a real logging service, to supplement the one on the Back-End
        let errMsg = (error._body) ? error._body :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        return Observable.throw(error);
    }
}
