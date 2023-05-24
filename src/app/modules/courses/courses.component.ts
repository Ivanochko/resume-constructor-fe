import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CoursesService} from "../../shared/services/courses.service";
import {Course} from "../../shared/models/course";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarUtils} from "../../shared/utils/snackbar-utils";
import {forkJoin, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss', '../typical-section.scss']
})
export class CoursesComponent implements OnInit {

  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();

  formGroup!: FormGroup

  idsToBeDeleted: number[] = [];
  private eventsSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
    this.clearForm();
    this.initCoursesForm();
    this.formGroup.markAsPristine()
    this.coursesService.getCurrentUserCourses()
      .subscribe((courses: Course[]) => {
        this.patchFormValue(courses)
      })
  }

  nextStep() {
    this.next.emit();
  }

  previousStep() {
    this.previous.emit();
  }

  patchFormValue(courses: Course[]) {
    for (let i = 0; i < courses!.length; i++) {
      this.addNewCourse(courses[i], i);
    }
  }

  addNewCourse(course?: Course, index?: number) {
    let coursesForm = this.formBuilder.group({
      id: [undefined],
      title: ['', [Validators.required]],
      yearOfCompletion: [undefined, [Validators.required, Validators.max(2100), Validators.min(1950)]],
      placeOfLearning: ['']
    })
    this.coursesFormArray.push(coursesForm)
    if (course) {
      this.getCourseFormForIndex(index!).patchValue(course)
    }
  }

  get coursesFormArray(): FormArray {
    return this.formGroup.get('courses') as FormArray
  }

  getCourseFormForIndex(index: number): FormGroup {
    return this.coursesFormArray.get(index + '') as FormGroup
  }

  save() {
    let length = this.coursesFormArray.length;
    let observables: Observable<any>[] = []
    for (let i = 0; i < length; i++) {
      let courseFormForIndex = this.getCourseFormForIndex(i);
      let value = courseFormForIndex.value;
      if (value.id) {
        observables.push(this.coursesService.updateUserCourse(value))
      } else {
        observables.push(this.coursesService.saveNewUserCourse(value))
      }
    }
    for (let id of this.idsToBeDeleted) {
      observables.push(this.coursesService.deleteUserCourses(id))
    }
    this.eventsSubscription = SnackbarUtils.handleObservable(forkJoin(observables), "Courses", this._snackBar)
      .subscribe(() => {
          this.ngOnInit();
        }
      )
    this.formGroup.markAsPristine()
  }

  deleteCourse(index: number) {
    let id = this.getCourseFormForIndex(index).value.id;
    if (id) {
      this.idsToBeDeleted.push(id);
    }
    this.coursesFormArray.removeAt(index)
    this.formGroup.markAsDirty();
  }

  clearForm() {
    if (this.formGroup) {
      while (this.coursesFormArray.length) {
        this.coursesFormArray.removeAt(0)
      }
    }
  }

  private initCoursesForm() {
    let coursesFormArray = this.formBuilder.array([]);
    this.formGroup = this.formBuilder.group({
      courses: coursesFormArray
    })
  }

}
