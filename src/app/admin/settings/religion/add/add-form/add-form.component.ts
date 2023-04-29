import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ReligionService } from '../../religion.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Religion } from '../../religion.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {Country} from "../../../country/country.model";

export interface DialogData {
  id: number;
  action: string;
  religion: Religion;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class AddReligionFormComponent {
  action: string;
  dialogTitle: string;
  religion: Religion;
  religionNew! : Religion ; // Temporarly stores the data into religionNew
  religionForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddReligionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public religionService: ReligionService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Religion';
      this.religion = data.religion;
    } else {
      this.dialogTitle = 'Add Religion';
      const blankObject = {} as Religion;
      this.religion = new Religion(blankObject);
    }
    this.religionForm = this.createContactForm();
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
      name: [this.religion.name, [Validators.required]]
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
      const blankObject = {} as Religion;
      this.religionNew = new Religion(blankObject);
      this.religionNew.id = this.religion.id;
      this.religionNew.status=1;
      this.religion = this.religionForm.getRawValue();
      this.religionNew.name = this.religion.name;
      this.religionService.updateReligion(this.religionNew);
    }
    else
      this.religionService.addReligion(this.religionForm.getRawValue());
  }
}

