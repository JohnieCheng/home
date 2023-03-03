import {Routes} from "@angular/router";
import {LoginComponent} from "./login/login/login.component";
import {RegisterComponent} from "./login/register/register.component";

export const APP_ROUTES: Routes = [
    {path: '', redirectTo: 'user', pathMatch: 'full'},
    {path: 'user', loadChildren: () => import('./view/user-routing.config').then(mod => mod.USER_ROUTES)},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
]
