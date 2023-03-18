import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from "../auth/shared/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        const authHeader = 'Bearer ' + this.authService.getToken();
        const authReq = request.clone({setHeaders: {Authorization: authHeader}});
        return handler.handle(authReq);
    }
}
