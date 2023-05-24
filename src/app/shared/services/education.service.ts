import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {Education} from "../models/education";

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  educationsUrl = "/users/educations";

  constructor(private httpService: HttpService) {
  }

  getCurrentUserEducations(): Observable<Education[]> {
    return this.httpService.get(this.educationsUrl);
  }

  saveNewUserEducation(education: Education): Observable<Education> {
    return this.httpService.post(this.educationsUrl, education);
  }

  updateUserEducation(education: Education): Observable<Education> {
    return this.httpService.put(this.educationsUrl, education);
  }

  deleteUserEducations(id: number): Observable<void> {
    return this.httpService.delete(this.educationsUrl + `/${id}`);
  }

}
