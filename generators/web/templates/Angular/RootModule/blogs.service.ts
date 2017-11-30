'use strict';

/**
 * Angular imports
 */
import { Injectable } from '@angular/core';

/**
 * App imports
 */
import { CentralNexusService } from './central-nexus.service';
import { Blog, BlogDoc } from "Models/__Blog";

@Injectable()
export class BlogsService {
    constructor(private nexus: CentralNexusService) {
    }

    getBlogs() {
        return this.nexus.sendGetRequest('blogs', (data: any) => data/*<% if (userSystem) { %>*//*<% if (userSystemType === 'JWT') { %>*/, true/*<% } %>*//*<% } %>*/);
    }

    updateBlog(newBlog: BlogDoc) {
        return this.nexus.sendPutRequest(`blogs/${newBlog.id}`, newBlog, undefined, (data: any) => data/*<% if (userSystem) { %>*//*<% if (userSystemType === 'JWT') { %>*/, true/*<% } %>*//*<% } %>*/);
    }

    createBlog(newBlog: Blog) {
        return this.nexus.sendPostRequest(`blogs`, newBlog, undefined, (data: any) => data/*<% if (userSystem) { %>*//*<% if (userSystemType === 'JWT') { %>*/, true/*<% } %>*//*<% } %>*/);
    }

    deleteBlog(newBlog: BlogDoc) {
        return this.nexus.sendDeleteRequest(`blogs/${newBlog.id}`, undefined, (data: any) => data/*<% if (userSystem) { %>*//*<% if (userSystemType === 'JWT') { %>*/, true/*<% } %>*//*<% } %>*/);
    }
}
