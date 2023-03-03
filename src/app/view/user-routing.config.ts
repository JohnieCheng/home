import {Routes} from "@angular/router";
import {IndexComponent} from "./index.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {PersonalCenterComponent} from "./component/personal-center/personal-center.component";
import {FavoriteComponent} from "./component/favorite/favorite.component";
import {InfoComponent} from "./component/info/info.component";


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
                path: 'personal_center', component: PersonalCenterComponent
            },
            {
                path: 'favorite', component: FavoriteComponent
            },
            {
                path: 'info', component: InfoComponent
            }
        ]
    },
]
