import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {ContentComponent} from './layout/content/content.component';
import {HomeComponent} from './home/home.component';
import {MatIconModule} from '@angular/material/icon';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RequestInterceptor} from "./shared/interceptors/request.interceptor";
import {LoginComponent} from './layout/login/login.component';
import {AlreadyLoggedInComponent} from './layout/login/already-logged-in/already-logged-in.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SnackbarComponent} from './shared/snackbar/snackbar.component';
import {MatButtonModule} from "@angular/material/button";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {environment} from "../environments/environment";
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from "ng-recaptcha";
import {AboutMeComponent} from './modules/about-me/about-me.component';
import {MatTabsModule} from "@angular/material/tabs";
import {ExperienceComponent} from './modules/experience/experience.component';
import {EducationComponent} from './modules/education/education.component';
import {CoursesComponent} from './modules/courses/courses.component';
import {GenerateResumeComponent} from './modules/generate-resume/generate-resume.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {DatePipe} from "@angular/common";
import {SkillsComponent} from './modules/skills/skills.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {ConfirmationMessageComponent} from './shared/confirmation-message/confirmation-message.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ContentComponent,
    HomeComponent,
    LoginComponent,
    AlreadyLoggedInComponent,
    SnackbarComponent,
    AboutMeComponent,
    ExperienceComponent,
    EducationComponent,
    CoursesComponent,
    GenerateResumeComponent,
    SkillsComponent,
    ConfirmationMessageComponent
  ],
  imports: [
    PdfViewerModule,
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    MatTabsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  providers: [
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue:
        {
          duration: 5000,
          verticalPosition: "top",
          horizontalPosition: "end"
        }
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
