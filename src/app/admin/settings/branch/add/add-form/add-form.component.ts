import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { BranchService } from '../../branch.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Branch } from '../../branch.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {Country} from "../../../country/country.model";

export interface DialogData {
  id: number;
  action: string;
  branch: Branch;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class AddBranchFormComponent {
  action: string;
  dialogTitle: string;
  branch: Branch;
  branchNew! : Branch ; // Temporarly stores the data into branchNew
  branchForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddBranchFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public branchService: BranchService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Branch';
      this.branch = data.branch;
    } else {
      this.dialogTitle = 'Add Branch';
      const blankObject = {} as Branch;
      this.branch = new Branch(blankObject);
    }
    this.branchForm = this.createContactForm();
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
      name: [this.branch.name, [Validators.required]],
      address: [this.branch.address, [Validators.required]]
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
      const blankObject = {} as Branch;
      this.branchNew = new Branch(blankObject);
      this.branchNew.id = this.branch.id;
      this.branchNew.status=1;
      this.branch = this.branchForm.getRawValue();
      this.branchNew.name = this.branch.name;
      this.branchNew.address = this.branch.address;
      this.branchService.updateBranch(this.branchNew);
    }
    else
      this.branchService.addBranch(this.branchForm.getRawValue());
  }
}

