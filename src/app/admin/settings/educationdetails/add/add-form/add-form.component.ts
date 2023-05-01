import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { EducationdetailsService } from '../../educationdetails.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Educationdetails } from '../../educationdetails.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';


export interface DialogData {
  id: number;
  action: string;
  educationdetails: Educationdetails;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class AddEducationdetailsFormComponent {
  action: string;
  dialogTitle: string;
  educationdetails: Educationdetails;
  educationdetailsNew! : Educationdetails ; // Temporarly stores
  educationdetailsForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddEducationdetailsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public educationdetailsService: EducationdetailsService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Education';
      this.educationdetails = data.educationdetails;
    } else {
      this.dialogTitle = 'Add Education';
      const blankObject = {} as Educationdetails;
      this.educationdetails = new Educationdetails(blankObject);
    }
    this.educationdetailsForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      name: [this.educationdetails.name, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if(this.action === 'edit'){
      const blankObject = {} as Educationdetails;
      this.educationdetailsNew = new Educationdetails(blankObject);
      this.educationdetailsNew.id = this.educationdetails.id;
      this.educationdetailsNew.status=1;
      this.educationdetails = this.educationdetailsForm.getRawValue();
      this.educationdetailsNew.name = this.educationdetails.name;
      this.educationdetailsService.updateEducation(this.educationdetailsNew);
    }
    else
      this.educationdetailsService.addEducation(this.educationdetailsForm.getRawValue());
  }
}

