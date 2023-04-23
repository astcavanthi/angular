import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CountryService } from '../../country.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Country } from '../../country.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export interface DialogData {
  id: number;
  action: string;
  country: Country;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class AddFormComponent {
  action: string;
  dialogTitle: string;
  // countryForm: UntypedFormGroup;
  // country: Country;
  countryForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public departmentService: CountryService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.country.name;
      // this.country = data.setting;
    } else {
      this.dialogTitle = 'Add Country';
      const blankObject = {} as Country;
      // this.country = new Setting(blankObject);
    }
    this.countryForm = this.createContactForm();
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
      // id: [this.setting.id],
      // dName: [this.setting.dName, [Validators.required]],
      // hod: [this.setting.hod, [Validators.required]],
      // phone: [this.setting.phone, [Validators.required]],
      // email: [
      //   this.setting.email,
      //   [Validators.required, Validators.email, Validators.minLength(5)],
      // ],
      // sYear: [this.setting.sYear, [Validators.required]],
      // sCapacity: [this.setting.sCapacity, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    // this.departmentService.addSetting(this.settingForm.getRawValue());
  }
}
