import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AgentService } from '../../agent.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Agent } from '../../agent.model';
import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  agent: Agent;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent {
  action: string;
  dialogTitle: string;
  agentForm: UntypedFormGroup;
  agent: Agent;
  constructor(
    public dialogRef: MatDialogRef<AddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public agentService: AgentService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.agent.name;
      this.agent = data.agent;
    } else {
      this.dialogTitle = 'New Agent';
      const blankObject = {} as Agent;
      this.agent = new Agent(blankObject);
    }
    this.agentForm = this.createContactForm();
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
      id: [this.agent.id],
      img: [this.agent.img],
      name: [this.agent.name],
      surname: [this.agent.surname],
      gender: [this.agent.gender],
      email: [
        this.agent.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.agentService.addAgent(this.agentForm.getRawValue());
  }
}

