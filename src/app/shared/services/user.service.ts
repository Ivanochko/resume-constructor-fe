import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {UserAllPersonalFields} from "../models/user-all-personal-fields";
import {UserAllData} from "../models/user-all-data";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) {
  }

  partialUpdate(userAllFields: UserAllPersonalFields): Observable<void> {
    return this.httpService.patch("/users/partialUpdate", userAllFields);
  }

  getCurrentUser(): Observable<UserAllPersonalFields> {
    return this.httpService.get("/users/current");
  }

  getAllDataOfCurrentUser(): Observable<UserAllData> {
    return this.httpService.get("/users/allData")
  }

}
