'use strict';

/**
 * Angular imports
 */
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

/**
 * Third-party imports
 */
//<% if (userSystem) { %>
//<% if (userSystemType === 'JWT') { %>
import { AUTH_PROVIDERS } from 'angular2-jwt';
//<% } %>
//<% } %>

/**
 * App imports
 */
import { RootComponent } from "./root.component";
import { BlogsService } from "./blogs.service";
import { CentralNexusService } from "./central-nexus.service";

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        FormsModule
    ],
    declarations: [ RootComponent ],
    bootstrap:    [ RootComponent ],
    providers:    [
        //<% if (userSystem) { %>
        //<% if (userSystemType === 'JWT') { %>
        AUTH_PROVIDERS,
        //<% } %>
        //<% } %>
        CentralNexusService,
        BlogsService
    ]
})
export class RootModule {
}
