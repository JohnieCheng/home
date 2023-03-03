import {Component} from '@angular/core';
import {HeaderComponent} from "../shared/header/header.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {RouterOutlet} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule, NgIf} from "@angular/common";
import {SidebarComponent} from "../shared/sidebar/sidebar.component";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    standalone: true,
    imports: [
        HeaderComponent,
        FooterComponent,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        NgIf,
        CommonModule,
        RouterOutlet,
        SidebarComponent
    ],
    styleUrls: ['./index.component.css'],
})
export class IndexComponent {
}
