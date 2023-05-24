import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EducationService} from "../../shared/services/education.service";
import {Education} from "../../shared/models/education";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarUtils} from "../../shared/utils/snackbar-utils";
import {forkJoin, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss', '../typical-section.scss']
})
export class EducationComponent implements OnInit {

  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();

  formGroup!: FormGroup

  idsToBeDeleted: number[] = [];
  private eventsSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private educationService: EducationService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
    this.clearForm();
    this.initEducationForm();
    this.formGroup.markAsPristine()
    this.educationService.getCurrentUserEducations()
      .subscribe((educations: Education[]) => {
        this.patchFormValue(educations)
      })
  }

  nextStep() {
    this.next.emit();
  }

  previousStep() {
    this.previous.emit();
  }

  patchFormValue(educations: Education[]) {
    for (let i = 0; i < educations!.length; i++) {
      this.addNewEducation(educations[i], i);
    }
  }

  addNewEducation(education?: Education, index?: number) {
    let educationForm = this.formBuilder.group({
      id: [undefined],
      title: ['', [Validators.required]],
      degree: ['', [Validators.required]],
      yearOfGraduation: [undefined, [Validators.required, Validators.max(2100), Validators.min(1950)]],
      placeOfGraduation: ['']
    })
    this.educationsFormArray.push(educationForm)
    if (education) {
      this.getEducationFormForIndex(index!).patchValue(education)
    }
  }

  get educationsFormArray(): FormArray {
    return this.formGroup.get('educations') as FormArray
  }

  getEducationFormForIndex(index: number): FormGroup {
    return this.educationsFormArray.get(index + '') as FormGroup
  }

  save() {
    let length = this.educationsFormArray.length;
    let observables: Observable<any>[] = []
    for (let i = 0; i < length; i++) {
      let educationFormForIndex = this.getEducationFormForIndex(i);
      let value = educationFormForIndex.value;
      if (value.id) {
        observables.push(this.educationService.updateUserEducation(value))
      } else {
        observables.push(this.educationService.saveNewUserEducation(value))
      }
    }
    for (let id of this.idsToBeDeleted) {
      observables.push(this.educationService.deleteUserEducations(id))
    }
    SnackbarUtils.handleObservable(forkJoin(observables), "Education", this._snackBar)
    this.formGroup.markAsPristine()
  }

  deleteEducation(index: number) {
    let id = this.getEducationFormForIndex(index).value.id;
    if (id) {
      this.idsToBeDeleted.push(id);
    }
    this.educationsFormArray.removeAt(index)
    this.formGroup.markAsDirty();
  }

  private initEducationForm() {
    let educationsFormArray = this.formBuilder.array([]);
    this.formGroup = this.formBuilder.group({
      educations: educationsFormArray
    })
  }

  clearForm() {
    if (this.formGroup) {
      while (this.educationsFormArray.length) {
        this.educationsFormArray.removeAt(0)
      }
    }
  }

}
