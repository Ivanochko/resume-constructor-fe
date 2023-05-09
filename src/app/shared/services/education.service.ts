import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {Education} from "../models/education";

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private httpService: HttpService) {
  }

  getCurrentUserEducations(): Observable<Education[]> {
    return this.httpService.get("/users/educations");
  }

  saveNewUserEducation(education: Education): Observable<Education> {
    return this.httpService.post("/users/educations", education);
  }

  updateUserEducation(education: Education): Observable<Education> {
    return this.httpService.put("/users/educations", education);
  }

  deleteUserEducations(id: number): Observable<void> {
    return this.httpService.delete(`/users/educations/${id}`);
  }

}
