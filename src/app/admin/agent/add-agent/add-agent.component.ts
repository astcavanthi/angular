import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss'],
})
export class AddAgentComponent {
  agentForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Agent',
      items: ['Agent'],
      active: 'Add Agent',
    },
  ];
  constructor(private fb: UntypedFormBuilder) {
    this.agentForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      surname: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      maritalStatus: [''],
      department: [''],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dob: ['', [Validators.required]],
      education: [''],
      state:[''],
      city:[''],
      pincode:[''],
      aadhar:[''],
      uploadFile: [''],
      uploadid:[''],
      account:[''],
      bankname:[''],
      ifsc:[''],
      branchname:['']
    });
  }
  onSubmit() {
    console.log('Form Value', this.agentForm.value);
  }
}

