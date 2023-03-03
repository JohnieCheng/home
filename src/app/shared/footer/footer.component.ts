import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatListModule} from "@angular/material/list";

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, MatListModule],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {

}
