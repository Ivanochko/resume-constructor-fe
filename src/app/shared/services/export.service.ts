import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  apiBaseUrl: string = "http://localhost:8080"

  constructor(private httpClient: HttpClient) {
  }

  export(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/pdf; charset=utf-8');
    let options: any = {
      headers: headers,
      responseType: 'blob'
    }
    return this.httpClient.get<any>(this.apiBaseUrl + "/users/export/current", options)
  }

}
