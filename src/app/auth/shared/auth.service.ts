// import { Injectable } from '@angular/core';
// import { Apollo } from 'apollo-angular';
// import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import { LogInResponse } from '~modules/auth/shared/interfaces/log-in-response.interface';
// import { AuthRepository } from '~modules/auth/store/auth.repository';
// import {
//   changePasswordMutation,
//   deleteAccountMutation,
//   loginMutation,
//   refreshTokenMutation,
//   signupMutation,
//   updateUserMutation,
// } from '~modules/auth/shared/auth-mutations.graphql';
// import { User } from '~modules/user/shared/user.model';
// import { RegisterPayload } from '~modules/auth/shared/interfaces/register-payload.interface';
// import { RegisterResponse } from '~modules/auth/shared/interfaces/register-response.interface';
// import { AuthUserData } from '~modules/auth/shared/interfaces/register-data.interface';
// import { OkData } from '~modules/shared/interfaces/ok-data.interface';
// import { UpdateUserResponse } from '~modules/auth/shared/interfaces/update-user-response.interface';
// import { UpdateUserData } from '~modules/auth/shared/interfaces/update-user-data.interface';
// import { RefreshTokenResponse } from '~modules/auth/shared/interfaces/update-token-response.interface';
// import { UpdateTokenData } from '~modules/auth/shared/interfaces/update-token-data.interface';
// import { ChangePasswordResponse } from '~modules/auth/shared/interfaces/change-password-response.interface';
// import { DeleteAccountResponse } from '~modules/auth/shared/interfaces/delete-account-response.interface';
// import { AppConfig } from '../../../configs/app.config';
// import jwt_decode from 'jwt-decode';

import {Injectable} from "@angular/core";
import {Observable, retry} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthUserData} from "./interfaces/register-data.interface";
import {RegisterVo} from "./interfaces/register-vo.interface";
import {SysUser} from "./classes/sys-user-entity.model";
import {LoginVo} from "./interfaces/login-vo.interface";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private url = environment.webServiceEndpoint + 'api/v1/auth';

    constructor(private http: HttpClient) {
    }

    signup(registerVo: RegisterVo): Observable<AuthUserData | null> {
        return this.http.post<AuthUserData>(this.url + '/register', registerVo);
    }

    login(loginVo: LoginVo): Observable<SysUser> {
        return this.http.post<SysUser>(this.url + '/user', loginVo).pipe(retry(3));
    }

    getToken(): string {
        let item = localStorage.getItem('cur_token') || '';
        let currToken = JSON.parse(item);
        let token = currToken && currToken.token;
        return token ? token : '';
    }

}
