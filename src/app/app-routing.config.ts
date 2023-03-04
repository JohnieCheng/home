import {Routes} from "@angular/router";
import {LoginComponent} from "./auth/pages/login/login.component";
import {RegisterComponent} from "./auth/pages/register/register.component";
import {Error404PageComponent} from "./shared/error404-page/error404-page.component";

export const APP_ROUTES: Routes = [
    {path: '', redirectTo: 'user', pathMatch: 'full'},
    {path: 'user', loadChildren: () => import('./view/user-routing.config').then(mod => mod.USER_ROUTES)},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '404', component: Error404PageComponent},
    {path: '**', redirectTo: '404'},
]
