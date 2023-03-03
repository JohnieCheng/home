export interface MenuVo {
    no: string; //订单编号
    customName: string; //自定义名称
    path: string; // 路径
    icon: string; // 图标
    seqNum: number; // 序号
    menus: MenuVo[];
}
