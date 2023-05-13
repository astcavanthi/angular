import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SubCasteService } from '../../subcast.service';
import { CasteService } from '../../../caste/caste.service';
import {BehaviorSubject,Observable } from 'rxjs';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { SubCaste } from '../../subcast.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Caste,CasteResponse } from '../../../caste/caste.model';

export interface DialogData {
  id: number;
  action: string;
  subcaste: SubCaste;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class AddSubCasteFormComponent {
  action: string;
  dialogTitle: string;
  subcaste: SubCaste;
  subcasteNew! : SubCaste ; // Temporarly stores the data into casteNew
  subcasteForm: UntypedFormGroup;
  public castes$: BehaviorSubject<Caste[]> = new BehaviorSubject<Caste[]>([]);
  constructor(
    public dialogRef: MatDialogRef<AddSubCasteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public subCasteService: SubCasteService,
    public casteService : CasteService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Sub Caste';
      this.subcaste = data.subcaste;
    } else {
      this.dialogTitle = 'Add Sub Caste';
      const blankObject = {} as SubCaste;
      this.subcaste = new SubCaste(blankObject);
    }
    this.subcasteForm = this.createContactForm();
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
      name: [this.subcaste.name, [Validators.required]],
      caste: [this.subcaste.caste, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.casteService.getCastes();
      this.castes$ = this.casteService.castes$;
   }

  public confirmAdd(): void {
    if(this.action === 'edit'){
      const blankObject = {} as SubCaste;
      this.subcasteNew = new SubCaste(blankObject);
      this.subcasteNew.id = this.subcaste.id;
      this.subcasteNew.status=1;
      this.subcaste = this.subcasteForm.getRawValue();
      this.subcasteNew.name = this.subcaste.name;
      this.subcasteNew.caste = this.subcaste.caste;
      this.subCasteService.updateSubCaste(this.subcasteNew);
    }
    else
      this.subCasteService.addSubCaste(this.subcasteForm.getRawValue());
  }
}

