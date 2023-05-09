import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {UserLogin} from "../models/user-login";
import {Session} from "../models/session";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {UserRegister} from "../models/user-register";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService,
              private router: Router) {
  }

  login(userLogin: UserLogin): Observable<Session> {
    return this.httpService.post<Session>("/auth/login", userLogin)
  }

  register(userRegister: UserRegister): Observable<Session> {
    return this.httpService.post<Session>("/auth/register", userRegister)
  }

  logout() {
    this.httpService.get("/auth/logout").subscribe(() => {
      sessionStorage.removeItem('session')
      this.router.navigate(['login'])
    })
  }

}
