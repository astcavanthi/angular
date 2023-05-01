import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { OccupationService } from '../../occupation.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Occupation } from '../../occupation.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {Caste} from "../../../caste/caste.model";

export interface DialogData {
  id: number;
  action: string;
  occupation: Occupation;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class AddOccupationFormComponent {
  action: string;
  dialogTitle: string;
  occupation: Occupation;
  occupationNew! : Occupation ; // Temporarly stores
  occupationForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddOccupationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public occupationService: OccupationService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Occupation';
      this.occupation = data.occupation;
    } else {
      this.dialogTitle = 'Add Occupation';
      const blankObject = {} as Occupation;
      this.occupation = new Occupation(blankObject);
    }
    this.occupationForm = this.createContactForm();
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
      name: [this.occupation.name, [Validators.required]],
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
      const blankObject = {} as Occupation;
      this.occupationNew = new Occupation(blankObject);
      this.occupationNew.id = this.occupation.id;
      this.occupationNew.status=1;
      this.occupation = this.occupationForm.getRawValue();
      this.occupationNew.name = this.occupation.name;
      this.occupationService.updateOccupation(this.occupationNew);
    }
    else
      this.occupationService.addOccupation(this.occupationForm.getRawValue());
  }
}

