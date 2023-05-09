import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-already-logged-in',
  templateUrl: './already-logged-in.component.html',
  styleUrls: ['./already-logged-in.component.scss']
})
export class AlreadyLoggedInComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  goToHome() {
    this.router.navigate(["home"])
  }
}
