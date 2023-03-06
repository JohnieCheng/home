import {User} from "../classes/user.model";

export interface AuthUserData {
    accessToken: string;
    refreshToken: string;
    user: User;
}
