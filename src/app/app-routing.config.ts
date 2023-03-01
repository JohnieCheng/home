import {Routes} from "@angular/router";
import {IndexComponent} from "./view/index/index.component";

export const APP_ROUTES: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent},
]
