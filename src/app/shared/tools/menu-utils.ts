import {Menu} from "../classes/menu";
import {MenuVo} from "../interfaces/menu-vo";

function fillTopMenus(menus: Menu[]) {
  return menus.filter(menu => menu.isTopMenu).map(menu => ({
    no: menu.no,
    customName: menu.customName,
    path: menu.path,
    icon: menu.icon,
    seqNum: menu.seqNum,
    menus: []
  }));
}

export function transToMenuVoArr(menus: Menu[]): MenuVo[] {
  let result: MenuVo[];
  menus.sort((a, b) => a.no.localeCompare(b.no));
  result = fillTopMenus(menus);
  fillSubMenus(result, menus);
  return result;
}

function fillSubMenus(menuVos: MenuVo[], menus: Menu[]) {
  for (let i = 0; i < menuVos.length; i++) {
    let menuVo = menuVos[i];
    menuVo.menus = menus.filter(menu => menu.parentMenuNo === menuVo.no)
      .map(menu => ({
        no: menu.no,
        customName: menu.customName,
        path: menu.path,
        icon: menu.icon,
        seqNum: menu.seqNum,
        menus: []
      })).sort((a, b) => a.seqNum - b.seqNum);

    if (menuVo.menus.length > 0) {
      fillSubMenus(menuVo.menus,menus);
    }
  }

}
