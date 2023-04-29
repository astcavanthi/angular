import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CasteService } from '../../caste.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Caste } from '../../caste.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';


export interface DialogData {
  id: number;
  action: string;
  caste: Caste;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class AddCasteFormComponent {
  action: string;
  dialogTitle: string;
  caste: Caste;
  casteNew! : Caste ; // Temporarly stores the data into casteNew
  casteForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddCasteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public casteService: CasteService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Caste';
      this.caste = data.caste;
    } else {
      this.dialogTitle = 'Add Caste';
      const blankObject = {} as Caste;
      this.caste = new Caste(blankObject);
    }
    this.casteForm = this.createContactForm();
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
      name: [this.caste.name, [Validators.required]],
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
      const blankObject = {} as Caste;
      this.casteNew = new Caste(blankObject);
      this.casteNew.id = this.caste.id;
      this.casteNew.status=1;
      this.caste = this.casteForm.getRawValue();
      this.casteNew.name = this.caste.name;
      this.casteService.updateCaste(this.casteNew);
    }
    else
      this.casteService.addCaste(this.casteForm.getRawValue());
  }
}

