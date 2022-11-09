import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {ContentComponent} from './layout/content/content.component';
import {HomeComponent} from './home/home.component';
import {MatIconModule} from '@angular/material/icon';
import {SkillsComponent} from './modules/skills/skills.component';
import {AccountComponent} from './modules/account/account.component';
import {ExperienceComponent} from './modules/experience/experience.component';
import {EducationComponent} from './modules/education/education.component';
import {SettingsComponent} from './modules/settings/settings.component';
import {CertificationsCoursesComponent} from './modules/certifications-courses/certifications-courses.component';
import {GenerateResumeComponent} from './modules/generate-resume/generate-resume.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ContentComponent,
    HomeComponent,
    SkillsComponent,
    AccountComponent,
    ExperienceComponent,
    EducationComponent,
    SettingsComponent,
    CertificationsCoursesComponent,
    GenerateResumeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
