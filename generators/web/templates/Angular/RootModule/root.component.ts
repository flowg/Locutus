'use strict';

/**
 * Angular imports
 */
import { Component } from "@angular/core";

/**
 * App imports
 */
import { BlogsService } from "./blogs.service";
import { Blog } from "Models/Blog";

@Component({
    selector:    'my-app',
    moduleId:    module.id,
    templateUrl: 'root.component.html',
    styleUrls:   [ 'root.component.css' ]
})
export class RootComponent {
    name = 'Angular 4 !!!!';
    blogs: Blog[];
    originalName: string;

    constructor(private blogsService: BlogsService) {
    }

    getBlogs() {
        this.blogsService.getBlogs()
            .subscribe(
                (data: any) => {
                    console.log(data);
                    this.blogs        = data.map((el: any) => new Blog(el));
                    console.log(this.blogs)
                    this.originalName = data[ 0 ].name;
                }
            );
    }

    updateBlog(blog: Blog) {
        this.blogsService.updateBlog(blog)
            .subscribe(
                (data: any) => {
                    console.log(data);
                }
            );
    }

    createBlog() {
        let blog: Blog = new Blog({
            name:    'My Blog of Super Mega Tartempion',
            creator: "5904e13784f378df093eb09e"
        });

        this.blogsService.createBlog(blog)
            .subscribe(
                (data: Blog) => {
                    console.log(data);
                    this.blogs.push(data);
                }
            );
    }

    deleteBlog(blog: Blog) {
        this.blogsService.deleteBlog(blog)
            .subscribe(
                (data: any) => {
                    if (data.success) {
                        this.blogs = this.blogs.filter(el => el.id !== data.deleted);
                    }
                }
            );
    }
}
