import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";
import {UserAllPersonalFields} from "../../shared/models/user-all-personal-fields";

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss', '../typical-section.scss']
})
export class AboutMeComponent implements OnInit {

  @Output() next = new EventEmitter<void>();
  @Input() formGroup!: FormGroup

  user!: UserAllPersonalFields;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user: UserAllPersonalFields) => {
        for (let i = 0; i < user.contacts!.length; i++) {
          this.addNewContact()
        }
        this.formGroup.patchValue(user)
        this.formGroup.markAsUntouched()
      }
    )
  }

  get contactsFormArray(): FormArray {
    return this.formGroup.get('contacts') as FormArray
  }

  get firstName(): FormControl {
    return this.formGroup.get('firstName') as FormControl
  }

  get lastName(): FormControl {
    return this.formGroup.get('lastName') as FormControl
  }

  get sex(): FormControl {
    return this.formGroup.get('sex') as FormControl
  }

  get location(): FormControl {
    return this.formGroup.get('location') as FormControl
  }

  get summary(): FormControl {
    return this.formGroup.get('summary') as FormControl
  }

  addNewContact() {
    let contactForm = this.formBuilder.group({
      label: ['', [Validators.required]],
      value: ['', [Validators.required]],
    })
    this.contactsFormArray.push(contactForm)
  }

  deleteContact(index: number) {
    this.contactsFormArray.removeAt(index)
    this.formGroup.markAsDirty()
  }

  save() {
    let value: UserAllPersonalFields = this.formGroup.value;
    this.userService.partialUpdate(value).subscribe();
    this.formGroup.markAsPristine()
  }

  nextStep() {
    this.next.emit();
  }

}
