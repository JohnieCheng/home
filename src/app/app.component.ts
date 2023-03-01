import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {IndexComponent} from "./view/index/index.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
        RouterOutlet,
        IndexComponent,
        RouterLink
    ]
})
export class AppComponent {
}
