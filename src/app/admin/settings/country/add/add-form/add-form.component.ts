import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SettingService } from '../../setting.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Setting } from '../../setting.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export interface DialogData {
  id: number;
  action: string;
  setting: Setting;
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
  settingForm: UntypedFormGroup;
  setting: Setting;
  constructor(
    public dialogRef: MatDialogRef<AddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public departmentService: SettingService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.setting.dName;
      this.setting = data.setting;
    } else {
      this.dialogTitle = 'Add Country';
      const blankObject = {} as Setting;
      this.setting = new Setting(blankObject);
    }
    this.settingForm = this.createContactForm();
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
      id: [this.setting.id],
      dName: [this.setting.dName, [Validators.required]],
      hod: [this.setting.hod, [Validators.required]],
      phone: [this.setting.phone, [Validators.required]],
      email: [
        this.setting.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      sYear: [this.setting.sYear, [Validators.required]],
      sCapacity: [this.setting.sCapacity, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.departmentService.addSetting(this.settingForm.getRawValue());
  }
}
