'use strict';

/**
 * Angular imports
 */
import { Component } from "@angular/core";

/**
 * App imports
 */
import { BlogsService } from "./blogs.service";
import { Blog } from "Models/__Blog";
import { BlogDoc } from "Models/__Blog";

@Component( {
    selector:    'my-app',
    moduleId:    module.id,
    templateUrl: 'root.component.html',
    styleUrls:   [ 'root.component.css' ]
} )
export class RootComponent {
    name = 'Angular 4 !!!!';
    blogs: BlogDoc[];
    originalName: string;

    constructor( private blogsService: BlogsService ) {
    }

    getBlogs() {
        this.blogsService.getBlogs()
            .subscribe(
                ( data: BlogDoc[] ) => {
                    console.log( data );
                    this.blogs = data;
                    console.log( this.blogs )
                    this.originalName = data[ 0 ].name;
                }
            );
    }

    updateBlog( blog: BlogDoc ) {
        this.blogsService.updateBlog( blog )
            .subscribe(
                ( data: any ) => {
                    console.log( data );
                }
            );
    }

    createBlog() {
        /*
         * Giving a string with an existing ObjectId key works for creator:
         * we just have to make sure that it refers to a User document
         * already existing in the db.
         * Normally, we'll just give the id property of the User currently logged in.
         */
        let blog: Blog = {
            name:    "My Blog of Super Mega Tartempion",
            creator: "5a15bfe634250916b6da2b17"
        };

        this.blogsService.createBlog( blog )
            .subscribe(
                ( data: BlogDoc ) => {
                    console.log( data );
                    this.blogs.push( data );
                }
            );
    }

    deleteBlog( blog: BlogDoc ) {
        this.blogsService.deleteBlog( blog )
            .subscribe(
                ( data: any ) => {
                    if ( data.success ) {
                        this.blogs = this.blogs.filter( el => el.id !== data.deleted );
                    }
                }
            );
    }
}
