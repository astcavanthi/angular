import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { LanguagesService } from '../../languages.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Language } from '../../languages.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';


export interface DialogData {
  id: number;
  action: string;
  language: Language;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class AddLanguageFormComponent {
  action: string;
  dialogTitle: string;
  language: Language;
  languageNew! : Language ; // Temporarly stores
  languageForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddLanguageFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public languagesService: LanguagesService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Language';
      this.language = data.language;
    } else {
      this.dialogTitle = 'Add Language';
      const blankObject = {} as Language;
      this.language = new Language(blankObject);
    }
    this.languageForm = this.createContactForm();
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
      name: [this.language.name, [Validators.required]],
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
      const blankObject = {} as Language;
      this.languageNew = new Language(blankObject);
      this.languageNew.id = this.language.id;
      this.languageNew.status=1;
      this.language = this.languageForm.getRawValue();
      this.languageNew.name = this.language.name;
      this.languagesService.updateLanguage(this.languageNew);
    }
    else
      this.languagesService.addLanguage(this.languageForm.getRawValue());
  }
}

