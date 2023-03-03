import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MenuVo} from "../interfaces/menu-vo";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, MatListModule, MatIconModule, RouterLink],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menus: MenuVo[] = [];

    ngOnInit(): void {
        let count = 0;
        for (let i = 0; i < 10; i++) {
            count += 1000;
            let menu: MenuVo = {
                no: 1000000 + count + i + '',
                customName: 'Todo',
                path: '/user/todo',
                icon: '',
                seqNum: 1,
                menus: [
                    {
                        no: 1000000 + count + i + 1 + '',
                        customName: '菜单' + (i + 1) + '-1',
                        path: '/user/favorite',
                        icon: '',
                        seqNum: 1,
                        menus: []
                    },
                    {
                        no: 1000000 + count + i + 2 + '',
                        customName: '菜单' + (i + 1) + '-2',
                        path: '/user/dashboard',
                        icon: '',
                        seqNum: 2,
                        menus: []
                    },
                ]
            };
            this.menus.push(menu);
        }
    }

    hasMenu() {
        return this.menus.length > 0;
    }
}
