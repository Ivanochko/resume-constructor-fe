import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./layout/login/login.component";
import {LoginGuard} from "./shared/guards/login.guard";
import {CanOpenLoginGuard} from "./shared/guards/can-open-login-guard.service";
import {AlreadyLoggedInComponent} from "./layout/login/already-logged-in/already-logged-in.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [LoginGuard],
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "home",
        component: HomeComponent
      }
    ]
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [CanOpenLoginGuard],
  },
  {
    path: "logged-in",
    component: AlreadyLoggedInComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
