import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ErrorBuilder } from 'src/app/utils/ErrorBuilder';
import { InputError } from 'src/app/utils/InputError';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  inputsData: Map<string, InputError> = new Map([
    ['email', new ErrorBuilder('Email').required().email().build()],
    [
      'password',
      new ErrorBuilder('Password')
        .required()
        .minLength(8)
        .maxLength(40)
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
  }

  isValid() {
    return (
      !this.inputsData.get('email')!.hasError &&
      !this.inputsData.get('password')!.hasError
    );
  }

  submit() {
    if (this.isValid()) {
      const suscription = this.authService
        .signIn(
          this.inputsData.get('email')!.getValue(),
          this.inputsData.get('password')!.getValue()
        )
        .subscribe({
          next: (data) => {
            if (data.type === HttpEventType.DownloadProgress) console.log(data);
            {
              console.log(data);
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
      suscription.unsubscribe();
    }
  }
}
