import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {WorksService} from "../../shared/services/works.service";
import {WorkData} from "../../shared/models/work-data";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarUtils} from "../../shared/utils/snackbar-utils";
import {forkJoin, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss', '../typical-section.scss']
})
export class ExperienceComponent implements OnInit {

  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();

  formGroup!: FormGroup

  idsToBeDeleted: number[] = [];
  private eventsSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private worksService: WorksService,
    private dateAdapter: DateAdapter<Date>,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar
  ) {
    this.dateAdapter.setLocale('en-GB')
  }

  ngOnInit(): void {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
    this.clearForm();
    this.initExperienceForm();
    this.formGroup.markAsPristine()
    this.worksService.getCurrentUserWorks()
      .subscribe((works: WorkData[]) => {
          this.patchFormValue(works)
        }
      )
  }

  private initExperienceForm() {
    let worksFormArray = this.formBuilder.array([]);
    this.formGroup = this.formBuilder.group({
      works: worksFormArray
    })
  }

  patchFormValue(works: WorkData[]) {
    for (let i = 0; i < works!.length; i++) {
      this.addNewWork(works[i], i);
    }
  }

  addNewWork(work?: WorkData, index?: number) {
    let workForm = this.formBuilder.group({
      id: [undefined],
      jobTitle: ['', [Validators.required]],
      company: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      isCurrent: [false],
      participation: [''],
    });
    this.worksFormArray.push(workForm);
    if (work) {
      this.getWorkFormForIndex(index!).patchValue(work);
      this.onCurrentCheckboxChange(index!)
    }
  }

  getWorkFormForIndex(index: number): FormGroup {
    return this.formGroup.get("works")!.get(index + '') as FormGroup
  }

  get worksFormArray(): FormArray {
    return this.formGroup.get('works') as FormArray
  }

  nextStep() {
    this.next.emit();
  }

  previousStep() {
    this.previous.emit();
  }

  save() {
    let length = this.worksFormArray.length;
    let observables: Observable<any>[] = []
    for (let i = 0; i < length; i++) {
      let workFormForIndex = this.getWorkFormForIndex(i);
      let value = workFormForIndex.value;
      if (value.id) {
        observables.push(this.worksService.updateUserWork(value))
      } else {
        observables.push(this.worksService.saveNewUserWork(value))
      }
    }
    for (let id of this.idsToBeDeleted) {
      observables.push(this.worksService.deleteUserWork(id))
    }
    this.eventsSubscription = SnackbarUtils.handleObservable(forkJoin(observables), "Experience", this._snackBar)
      .subscribe(() => {
          this.ngOnInit();
        }
      )
  }

  clearForm() {
    if (this.formGroup) {
      while (this.worksFormArray.length) {
        this.worksFormArray.removeAt(0)
      }
    }
  }

  deleteWork(index: number) {
    let id = this.getWorkFormForIndex(index).value.id;
    if (id) {
      this.idsToBeDeleted.push(id);
    }
    this.worksFormArray.removeAt(index)
    this.formGroup.markAsDirty();
  }

  onCurrentCheckboxChange(index: number) {
    if (this.getWorkFormForIndex(index).get('isCurrent')?.value) {
      this.getWorkFormForIndex(index).get('endDate')!.disable({onlySelf: true});
      let currentDateFormatted = this.datePipe.transform(Date.now(), "yyyy-MM-dd");
      this.getWorkFormForIndex(index).get('endDate')!.patchValue(currentDateFormatted)
    } else {
      this.getWorkFormForIndex(index).get('endDate')!.enable({onlySelf: true});
    }
  }

}
