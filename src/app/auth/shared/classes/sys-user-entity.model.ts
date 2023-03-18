export class SysUser {
    id: string;
    email: string;



    constructor(user: SysUser) {
        this.id = user?.id;
        this.email = user?.email;
    }
}
