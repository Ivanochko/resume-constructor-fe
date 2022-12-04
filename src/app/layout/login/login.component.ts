import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Session} from "../../shared/models/session";
import {SnackbarComponent} from "../../shared/snackbar/snackbar.component";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  isRegister: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  action() {
    let value = this.form.value;
    if (this.isRegister) {
      this.authService.register(value)
        .subscribe(
          (session) => {
            this.successfulLogin(session)
          },
          (error) => {
            this._snackBar.openFromComponent(SnackbarComponent,
              {data: {'message': error.status + ' - ' + error.error}}
            );
          }
        )
    } else {
      this.authService.login(value)
        .subscribe(
          (session) => {
            this.successfulLogin(session)
          },
          (error) => {
            console.log(error)
            this._snackBar.openFromComponent(SnackbarComponent,
              {data: {'message': error.status + ' - ' + error.error}}
            );
          }
        )
    }
  }

  switchType() {
    this.isRegister = !this.isRegister
    if (this.isRegister) {
      this.addRegisterFields()
    } else {
      this.removeRegisterFields()
    }
  }

  successfulLogin(session: Session) {
    sessionStorage.setItem("session", session.sessionId!);
    this.router.navigate(['home']);
  }

  addRegisterFields() {
    this.form.addControl('confirmPassword', new FormControl('', Validators.required));
    this.form.addControl('firstName', new FormControl('', Validators.required));
    this.form.addControl('lastName', new FormControl('', Validators.required));
    this.form.addControl('recaptcha', new FormControl('', Validators.required));
    this.form.addValidators([this.checkPasswordsEquals, this.checkContainsNumbers,
      this.checkContainsSymbols, this.checkContainsUpperAndLowerLetters, this.checkLength])
  }

  removeRegisterFields() {
    this.form.removeValidators([this.checkPasswordsEquals, this.checkContainsNumbers,
      this.checkContainsSymbols, this.checkContainsUpperAndLowerLetters, this.checkLength])
    this.form.removeControl('confirmPassword');
    this.form.removeControl('firstName');
    this.form.removeControl('lastName');
    this.form.removeControl('recaptcha');
  }

  checkPasswordsEquals: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let passwordControl = group.get('password');
    let confirmPasswordControl = group.get('confirmPassword');
    let pass = passwordControl!.value;
    let confirmPass = confirmPasswordControl!.value
    return !passwordControl?.dirty || !confirmPasswordControl?.dirty || pass === confirmPass ? null : {notSame: true}
  }

  checkContainsUpperAndLowerLetters: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let passwordControl = group.get('password');
    let REGEX = /^(?=.*[a-zA-Z])(?=.*[A-Z]).*$/
    let pass = passwordControl!.value;
    return !passwordControl?.dirty || REGEX.test(pass) ? null : {checkContainsUpperAndLowerLetters: true}
  }

  checkContainsNumbers: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let passwordControl = group.get('password');
    let REGEX = /^(?=.*\d).*$/
    let pass = passwordControl!.value;
    return !passwordControl?.dirty || REGEX.test(pass) ? null : {checkContainsNumbers: true}
  }

  checkContainsSymbols: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let passwordControl = group.get('password');
    let REGEX = /^(?=.*[^\w\d\s]).*$/
    let pass = passwordControl!.value;
    return !passwordControl?.dirty || REGEX.test(pass) ? null : {checkContainsSymbols: true}
  }

  checkLength: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let passwordControl = group.get('password');
    let REGEX = /^.{8,}$/
    let pass = passwordControl!.value;
    return !passwordControl?.dirty || REGEX.test(pass) ? null : {checkLength: true}
  }

}
