import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {Skill} from "../models/skill";

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private skillsUrl = "/users/skills";

  constructor(private httpService: HttpService) {}

  getCurrentUserSkills(): Observable<Skill[]> {
    return this.httpService.get(this.skillsUrl);
  }

  updateUserSkills(skills): Observable<Skill> {
    return this.httpService.put(this.skillsUrl, skills);
  }

}
