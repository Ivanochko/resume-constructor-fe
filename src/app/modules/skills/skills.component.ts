import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SkillsService} from "../../shared/services/skills.service";
import {Skill} from "../../shared/models/skill";
import {SkillLevel} from "../../shared/models/skill-level";
import {EnumUtils} from "../../shared/utils/enum-utils";
import {StringUtils} from "../../shared/utils/string-utils";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarUtils} from "../../shared/utils/snackbar-utils";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss', '../typical-section.scss']
})
export class SkillsComponent implements OnInit {

  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();

  formGroup!: FormGroup

  StringUtils = StringUtils;
  availableLevels = EnumUtils.getValuesFromEnum(SkillLevel);

  constructor(
    private formBuilder: FormBuilder,
    private skillsService: SkillsService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.initSkillsForm();
    this.skillsService.getCurrentUserSkills()
      .subscribe((skills: Skill[]) => {
        this.patchFormValue(skills)
      })
  }

  nextStep() {
    this.next.emit();
  }

  previousStep() {
    this.previous.emit();
  }

  patchFormValue(skills: Skill[]) {
    for (let i = 0; i < skills!.length; i++) {
      this.addNewSkill(skills[i], i);
    }
  }

  addNewSkill(skill?: Skill, index?: number) {
    let skillsForm = this.formBuilder.group({
      id: [undefined],
      name: ['', [Validators.required]],
      skillLevel: [undefined, [Validators.required]]
    })
    this.skillsFormArray.push(skillsForm)
    if (skill) {
      this.getSkillFormForIndex(index!).patchValue(skill)
    }
  }

  get skillsFormArray(): FormArray {
    return this.formGroup.get('skills') as FormArray
  }

  getSkillFormForIndex(index: number): FormGroup {
    return this.skillsFormArray.get(index + '') as FormGroup
  }

  save() {
    let length = this.skillsFormArray.length;
    let jsonObject = {};
    for (let i = 0; i < length; i++) {
      let skillFormForIndex = this.getSkillFormForIndex(i);
      let skillName = skillFormForIndex.get("name")?.value;
      jsonObject[skillName] = skillFormForIndex.get("skillLevel")?.value
    }
    SnackbarUtils.handleObservable(this.skillsService.updateUserSkills(jsonObject), "Skills", this._snackBar)
    this.formGroup.markAsPristine();
  }

  deleteSkill(index: number) {
    this.skillsFormArray.removeAt(index);
    this.formGroup.markAsDirty();
  }

  private initSkillsForm() {
    let skillsFormArray = this.formBuilder.array([]);
    this.formGroup = this.formBuilder.group({
      skills: skillsFormArray
    })
  }

}
