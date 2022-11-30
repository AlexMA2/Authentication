import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ErrorBuilder } from 'src/app/utils/ErrorBuilder';
import { InputError } from 'src/app/utils/InputError';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class RegisterComponent implements OnInit {
  inputsData: Map<string, InputError> = new Map([
    [
      'username',
      new ErrorBuilder('Username')
        .required()
        .minLength(3)
        .maxLength(15)
        .build(),
    ],
    ['email', new ErrorBuilder('Email').required().email().build()],
    [
      'password',
      new ErrorBuilder('Password')
        .required()
        .minLength(8)
        .maxLength(40)
        .match('Confirm Password')
        .build(),
    ],
    [
      'confirm',
      new ErrorBuilder('Confirm password')
        .required()
        .minLength(8)
        .maxLength(40)
        .match('password')
        .build(),
    ],
  ]);

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  checkInput(id: string) {
    const value = this.inputsData.get(id)!.compliesWithAll();
    if (value.length > 0) {
      this.inputsData.get(id)!.hasError = true;
      this.inputsData.get(id)!.actualError = value;
    }
    if (id === 'password' || id === 'confirm') {
      this.checkMatch('password', 'confirm');
    }
  }

  isValid() {
    return (
      !this.inputsData.get('username')!.hasError &&
      !this.inputsData.get('email')!.hasError &&
      !this.inputsData.get('password')!.hasError &&
      !this.inputsData.get('confirm')!.hasError
    );
  }

  checkMatch(field1: string, field2: string) {
    const password: InputError | undefined = this.inputsData.get(field1);
    const confirmPassword: InputError | undefined = this.inputsData.get(field2);
    if (!password || !confirmPassword) {
      return;
    }
    if (password.value !== confirmPassword.value) {
      this.inputsData.get(field1)!.hasError = true;
      this.inputsData.get(field1)!.actualError =
        password.errorsDescription.match;
      this.inputsData.get(field2)!.hasError = true;
      this.inputsData.get(field2)!.actualError =
        confirmPassword.errorsDescription.match;
    } else {
      this.inputsData.get(field1)!.hasError = false;
      this.inputsData.get(field1)!.actualError = '';
      this.inputsData.get(field2)!.hasError = false;
      this.inputsData.get(field2)!.actualError = '';
    }
  }

  submit() {
    if (this.isValid()) {
      this.authService
        .signUp(
          this.inputsData.get('username')!.getValue(),
          this.inputsData.get('email')!.getValue(),
          this.inputsData.get('password')!.getValue(),
          this.inputsData.get('confirm')!.getValue()
        )
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
