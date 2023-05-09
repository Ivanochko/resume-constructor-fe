import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {WorkData} from "../models/work-data";

@Injectable({
  providedIn: 'root'
})
export class WorksService {

  constructor(private httpService: HttpService) {
  }

  getCurrentUserWorks(): Observable<WorkData[]> {
    return this.httpService.get("/users/works");
  }

  saveNewUserWork(workData: WorkData): Observable<WorkData> {
    return this.httpService.post("/users/works", workData);
  }

  updateUserWork(workData: WorkData): Observable<WorkData> {
    return this.httpService.put("/users/works", workData);
  }

  deleteUserWork(id: number): Observable<void> {
    return this.httpService.delete(`/users/works/${id}`);
  }

}
