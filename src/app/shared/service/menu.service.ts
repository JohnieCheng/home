import {Injectable} from '@angular/core';
import {catchError, Observable, retry} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {handleError} from "../tools/handle-error";
import {Menu} from "../classes/menu";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuUrl = 'assets/menu-config.json';

  constructor(private http: HttpClient) {
  }

  getMenuVos(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.menuUrl).pipe(
      retry(3),
      catchError(handleError)
    );
  }
}
