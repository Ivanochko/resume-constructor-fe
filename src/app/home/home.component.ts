import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('stepper', {static: true}) tab: any;

  aboutMeFormGroup!: FormGroup
  experienceFormGroup!: FormGroup
  educationFormGroup!: FormGroup

  constructor(private router: Router,
              private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    this.initAboutMeForm()
    this.initExperienceForm()
    this.initEducationForm()
  }

  next() {
    this.tab.selectedIndex = this.tab.selectedIndex + 1;
  }

  previous() {
    this.tab.selectedIndex = this.tab.selectedIndex - 1;
  }

  private initAboutMeForm() {
    let contactsFormArray = this.formBuilder.array([]);
    this.aboutMeFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      title: ['', [Validators.required]],
      sex: [''],
      location: [''],
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: [''],
      summary: ['', [Validators.maxLength(500)]],
      contacts: contactsFormArray
    });
    (this.aboutMeFormGroup.get('email') as FormControl).disable({onlySelf: true});
  }

  private initExperienceForm() {
    let worksFormArray = this.formBuilder.array([]);
    this.experienceFormGroup = this.formBuilder.group({
      works: worksFormArray
    })
  }
  private initEducationForm() {
    let educationsFormArray = this.formBuilder.array([]);
    this.educationFormGroup = this.formBuilder.group({
      educations: educationsFormArray
    })
  }

}
