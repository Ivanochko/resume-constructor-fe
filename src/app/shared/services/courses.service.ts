import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {Course} from "../models/course";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private coursesUrl = "/users/courses";

  constructor(private httpService: HttpService) {
  }

  getCurrentUserCourses(): Observable<Course[]> {
    return this.httpService.get(this.coursesUrl);
  }

  saveNewUserCourse(course: Course): Observable<Course> {
    return this.httpService.post(this.coursesUrl, course);
  }

  updateUserCourse(course: Course): Observable<Course> {
    return this.httpService.put(this.coursesUrl, course);
  }

  deleteUserCourses(id: number): Observable<void> {
    return this.httpService.delete(this.coursesUrl + `/${id}`);
  }

}
