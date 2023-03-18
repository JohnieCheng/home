import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from "./app/app.component";
import {provideRouter, withDebugTracing, withHashLocation, withRouterConfig} from "@angular/router";
import {APP_ROUTES} from "./app/app-routing.config";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(APP_ROUTES,
            // withDebugTracing(),
            withRouterConfig(
                {
                    paramsInheritanceStrategy: 'always',
                }),
            withHashLocation()
        ),
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(BrowserAnimationsModule),

    ]
}).then().catch(err => console.error(err));
