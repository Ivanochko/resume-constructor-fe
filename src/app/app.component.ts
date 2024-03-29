import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'resume-constructor-fe';

  constructor(private router: Router) {
  }

  showSidebar(): boolean {
    return this.router.url.indexOf("/login") == -1
  }
}
