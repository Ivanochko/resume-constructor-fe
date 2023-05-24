import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmationMessageComponent} from "../../shared/confirmation-message/confirmation-message.component";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  dialogConfig = new MatDialogConfig();

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  routeToAboutMe() {
    this.router.navigate(['about-me'])
  }

  removeAllData() {
    const dialogRef = this.dialog.open(ConfirmationMessageComponent);
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.userService.removeAllDataAboutCurrentUser().subscribe(() => {
          this.logout();
        })
      }
    });
  }

}
