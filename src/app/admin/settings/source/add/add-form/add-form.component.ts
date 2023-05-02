import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SourceService } from '../../source.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Source } from '../../source.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';


export interface DialogData {
  id: number;
  action: string;
  source: Source;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class AddSourceFormComponent {
  action: string;
  dialogTitle: string;
  source: Source;
  sourceNew! : Source ; // Temporarly stores
  sourceForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddSourceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public sourceService: SourceService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Source';
      this.source = data.source;
    } else {
      this.dialogTitle = 'Add Source';
      const blankObject = {} as Source;
      this.source = new Source(blankObject);
    }
    this.sourceForm = this.createContactForm();
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
      name: [this.source.name, [Validators.required]],
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
      const blankObject = {} as Source;
      this.sourceNew = new Source(blankObject);
      this.sourceNew.id = this.source.id;
      this.sourceNew.status=1;
      this.source = this.sourceForm.getRawValue();
      this.sourceNew.name = this.source.name;
      this.sourceService.updateSource(this.sourceNew);
    }
    else
      this.sourceService.addSource(this.sourceForm.getRawValue());
  }
}

