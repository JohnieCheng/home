import {Routes} from "@angular/router";
import {IndexComponent} from "./index.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {FavoriteComponent} from "./component/favorite/favorite.component";
import {AboutComponent} from "./component/about/about.component";
import {TodoComponent} from "./component/todo/todo.component";


export const USER_ROUTES: Routes = [
    {
        path: '', component: IndexComponent,
        children: [
            {
                path: '', redirectTo: 'dashboard', pathMatch: "full"
            },
            {
                path: 'dashboard', component: DashboardComponent
            },
            {
                path: 'favorite', component: FavoriteComponent
            },
            {
                path: 'about', component: AboutComponent
            },
            {
                path: 'todo', component: TodoComponent
            }
        ]
    },
]
