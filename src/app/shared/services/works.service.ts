import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {WorkData} from "../models/work-data";

@Injectable({
  providedIn: 'root'
})
export class WorksService {

  private worksUrl = "/users/works";

  constructor(private httpService: HttpService) {
  }

  getCurrentUserWorks(): Observable<WorkData[]> {
    return this.httpService.get(this.worksUrl);
  }

  saveNewUserWork(workData: WorkData): Observable<WorkData> {
    return this.httpService.post(this.worksUrl, workData);
  }

  updateUserWork(workData: WorkData): Observable<WorkData> {
    return this.httpService.put(this.worksUrl, workData);
  }

  deleteUserWork(id: number): Observable<void> {
    return this.httpService.delete(this.worksUrl + `/${id}`);
  }

}
