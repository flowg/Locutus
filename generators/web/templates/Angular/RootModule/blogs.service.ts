'use strict';

/**
 * Angular imports
 */
import { Injectable } from '@angular/core';

/**
 * App imports
 */
import { CentralNexusService } from './central-nexus.service';

@Injectable()
export class BlogsService {
    constructor(private nexus: CentralNexusService) {
    }

    getBlogs() {
        return this.nexus.sendGetRequest('blogs', data => data, false);
    }
}
