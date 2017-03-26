'use strict';

/**
 * Angular imports
 */
import { Component } from "@angular/core";

/**
 * App imports
 */
import { BlogsService } from "./blogs.service";

@Component({
    selector:    'my-app',
    moduleId:    module.id,
    templateUrl: 'root.component.html',
    styleUrls:   [ 'root.component.css' ]
})
export class RootComponent {
    name = 'Angular 4 !!!!';

    constructor(private blogsService: BlogsService) {
    }

    getBlogs() {
        this.blogsService.getBlogs()
            .subscribe(
                (data: any) => console.log(data)
            );
    }
}
