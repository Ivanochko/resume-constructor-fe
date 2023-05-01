import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EducationService} from "../../shared/services/education.service";
import {Education} from "../../shared/models/education";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss', '../typical-section.scss']
})
export class EducationComponent implements OnInit {

  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Input() formGroup!: FormGroup

  idsToBeDeleted: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private educationService: EducationService
  ) {
  }

  ngOnInit(): void {
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
    for (let i = 0; i < length; i++) {
      let educationFormForIndex = this.getEducationFormForIndex(i);
      let value = educationFormForIndex.value;
      if (value.id) {
        this.educationService.updateUserEducation(value).subscribe();
      } else {
        this.educationService.saveNewUserEducation(value).subscribe();
      }
    }
    for (let id of this.idsToBeDeleted) {
      this.educationService.deleteUserEducations(id).subscribe();
    }
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

}
