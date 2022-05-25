import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormSignInComponent } from './form-sign-in/form-sign-in.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FormSignInComponent, AlertComponent],
  exports: [FormSignInComponent, AlertComponent],
})
export class UiModule {}
