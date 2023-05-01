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
  isRequestSend: boolean = false;

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

  get password(): FormControl {
    return this.form.get("password") as FormControl;
  }

  get confirmPassword(): string {
    return this.form.get("confirmPassword")?.value;
  }

  action() {
    let value = this.form.value;
    this.isRequestSend = true
    if (this.isRegister) {
      this.authService.register(value)
        .subscribe(
          (session) => {
            this.successfulLogin(session)
          },
          (error) => {
            this.errorOnLogin(error)
          }
        )
    } else {
      this.authService.login(value)
        .subscribe(
          (session) => {
            this.successfulLogin(session)
          },
          (error) => {
            this.errorOnLogin(error)
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

  errorOnLogin(error: any) {
    this._snackBar.openFromComponent(SnackbarComponent,
      {data: {'message': error.status + ' - ' + error.error}}
    );
    this.isRequestSend = false
  }

  addRegisterFields() {
    this.form.addControl('confirmPassword', new FormControl('', [Validators.required, this.checkPasswordsEquals]));
    this.form.addControl('firstName', new FormControl('', Validators.required));
    this.form.addControl('lastName', new FormControl('', Validators.required));
    this.form.addControl('recaptcha', new FormControl('', Validators.required));
    this.form.get("password")?.addValidators([this.checkContainsNumbers, this.checkContainsSymbols,
      this.checkContainsUpperAndLowerLetters, this.checkLength]);
  }

  removeRegisterFields() {
    this.form.get("password")?.removeValidators([this.checkContainsSymbols, this.checkContainsUpperAndLowerLetters, this.checkLength])
    this.form.removeControl('confirmPassword');
    this.form.removeControl('firstName');
    this.form.removeControl('lastName');
    this.form.removeControl('recaptcha');
  }

  get passwordErrorMessage(): string {
    return this.password.hasError('checkContainsUpperAndLowerLetters') ?
      'Password must contain upper and lower letters' :
      this.password.hasError('checkContainsNumbers') ?
        'Password must contain at least one number' :
        this.password.hasError('checkContainsSymbols') ?
          'Password must contain at least one special symbol' :
          this.password.hasError('checkLength') ?
            'Passwords must be at least 8 symbols length' : '';
  }

  checkPasswordsEquals: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let passwordControl = this.form.get('password');
    let confirmPasswordControl = this.form.get('confirmPassword');
    let pass = passwordControl?.value;
    let confirmPass = confirmPasswordControl?.value
    let isNotSame = passwordControl?.dirty && confirmPasswordControl?.dirty && pass !== confirmPass
    return isNotSame ? {notSame: true} : null
  }

  checkContainsUpperAndLowerLetters(control: AbstractControl): ValidationErrors | null {
    let REGEX = /^(?=.*[a-zA-Z])(?=.*[A-Z]).*$/
    let pass = control!.value;
    return !control?.dirty || REGEX.test(pass) ? null : {checkContainsUpperAndLowerLetters: true}
  }

  checkContainsNumbers(control: AbstractControl): ValidationErrors | null {
    let REGEX = /^(?=.*\d).*$/
    let pass = control!.value;
    return !control?.dirty || REGEX.test(pass) ? null : {checkContainsNumbers: true}
  }

  checkContainsSymbols(control: AbstractControl): ValidationErrors | null {
    let REGEX = /^(?=.*[^\w\d\s]).*$/
    let pass = control!.value;
    return !control?.dirty || REGEX.test(pass) ? null : {checkContainsSymbols: true}
  }

  checkLength(control: AbstractControl): ValidationErrors | null {
    let REGEX = /^.{8,}$/
    let pass = control!.value;
    return !control?.dirty || REGEX.test(pass) ? null : {checkLength: true}
  }

}
