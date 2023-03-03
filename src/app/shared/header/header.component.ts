import {Component, EventEmitter, Output} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatMenuModule} from "@angular/material/menu";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    imports: [
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        RouterLink,
        CommonModule,
        MatMenuModule
    ],
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    @Output() onToggled = new EventEmitter<MouseEvent>;

    toggleSideBar($event: MouseEvent) {
        this.onToggled.emit($event);
    }
}
