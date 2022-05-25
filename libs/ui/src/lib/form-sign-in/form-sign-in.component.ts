import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';

interface Credentials {
  email: string;
  password: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'form-sign-in',
  templateUrl: './form-sign-in.component.html',
  styleUrls: ['./form-sign-in.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSignInComponent {
  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit(credentials: Credentials) {
    console.log(credentials);
  }
}
