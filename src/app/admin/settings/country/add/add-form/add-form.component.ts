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
  country: Country;
  countryNew! : Country ; // Temporarly stores the data into countryNew
  countryForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public countryService: CountryService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Country';
      this.country = data.country;
    } else {
      this.dialogTitle = 'Add Country';
      const blankObject = {} as Country;
      this.country = new Country(blankObject);
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
      code: [this.country.code, [Validators.required]],
      name: [this.country.name, [Validators.required]]
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
        const blankObject = {} as Country;
        this.countryNew = new Country(blankObject);
        this.countryNew.id = this.country.id;
        this.countryNew.status=1;
        this.country = this.countryForm.getRawValue();
        this.countryNew.code = this.country.code;
        this.countryNew.name = this.country.name;
        this.countryService.updateCountry(this.countryNew);
      }

      else
        this.countryService.addCountry(this.countryForm.getRawValue());
  }


}
