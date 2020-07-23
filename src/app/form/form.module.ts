import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FormComponent } from './form.component';






@NgModule({
  declarations: [
    FormComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class FormModule { }
