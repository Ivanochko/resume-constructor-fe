import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {StepperSelectionEvent} from "@angular/cdk/stepper";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('stepper', {static: true}) tab: any;

  refreshEventSubject: Subject<void> = new Subject<void>();
  aboutMeFormGroup!: FormGroup

  constructor(private router: Router,
              private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    this.initAboutMeForm();
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

  selectionChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 5) {
      this.refreshEventSubject.next();
    }
  }
}
