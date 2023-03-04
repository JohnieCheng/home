import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MenuVo} from "../interfaces/menu-vo";
import {RouterLink} from "@angular/router";
import {MenuService} from "../service/menu.service";
import {transToMenuVoArr} from "../tools/menu-utils";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [MenuService]
})
export class SidebarComponent implements OnInit {
  menus: MenuVo[] = [];

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.menuService.getMenuVos().subscribe(menus => {
      this.menus = transToMenuVoArr(menus);
    })
  }

  hasMenu() {
    return this.menus.length > 0;
  }
}
