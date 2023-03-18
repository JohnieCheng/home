import {SysUser} from "../classes/sys-user-entity.model";

export interface AuthUserData {
    accessToken: string;
    user: SysUser
}
