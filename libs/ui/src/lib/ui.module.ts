import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormSignInComponent } from './form-sign-in/form-sign-in.component';
import { AlertComponent } from './alert/alert.component';
import { ItiaDataComponent } from './itia-data/itia-data.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FormSignInComponent, AlertComponent, ItiaDataComponent],
  exports: [FormSignInComponent, AlertComponent, ItiaDataComponent],
})
export class UiModule {}
