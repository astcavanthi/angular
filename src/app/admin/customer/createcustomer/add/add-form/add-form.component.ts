import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CustomerService } from '../../customer.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Customer } from '../../customer.model';
import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  customer: Customer;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent {
  action: string;
  dialogTitle: string;
  customerForm: UntypedFormGroup;
  customer: Customer;
  constructor(
    public dialogRef: MatDialogRef<AddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public customerService: CustomerService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.customer.fname;
      this.customer = data.customer;
    } else {
      this.dialogTitle = 'New Customer';
      const blankObject = {} as Customer;
      this.customer = new Customer(blankObject);
    }
    this.customerForm = this.createContactForm();
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
      id: [this.customer.id],
      img: [this.customer.img],
      fname: [this.customer.fname],
      surname: [this.customer.surname],
      gender: [this.customer.gender],
      email: [
        this.customer.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],

      aadhar:[this.customer.aadhar],
      dob: [this.customer.dob],
      birth:[this.customer.birth],
      religion: [this.customer.religion],
      caste: [this.customer.caste],
      subcaste: [this.customer.subcaste],
      star: [this.customer.star],
      rasi: [this.customer.rasi],
      paadam: [this.customer.paadam],
      gothram: [this.customer.gothram],
      dosham: [this.customer.dosham],
      height: [this.customer.height],
      blood: [this.customer.blood],
      tongue: [this.customer.tongue],
      health: [this.customer.health],
      complex: [this.customer.complex],
      marital: [this.customer.marital],
      smoke: [this.customer.smoke],
      drink: [this.customer.drink],
      food: [this.customer.food],
      address: [this.customer.address], 
      hobbies: [this.customer.hobbies],
      interest: [this.customer.interest],
      music: [this.customer.music],
      sports: [this.customer.sports],
      altmobile:[this.customer.altmobile],
      altemail:[this.customer.altemail],
      altaddress:[this.customer.altaddress], 
      cuisine: [this.customer.cuisine],
      reads: [this.customer.reads],
      movies: [this.customer.movies],
      style: [this.customer.style],
      spoken: [this.customer.spoken],
      country: [this.customer.country],
      state: [this.customer.state],
      district: [this.customer.district],
      city: [this.customer.city],
     
      intercaste: [this.customer.aadhar],
      parentno: [this.customer.aadhar],
      appl: [this.customer.appl],
      source: [this.customer.source],
      looking: [this.customer.looking],
      age: [this.customer.age],
      status:[this.customer.status],
      education:[this.customer.education],
      profession:[this.customer.profession],
      universe:[this.customer.universe],
      emply:[this.customer.emply],
      design:[this.customer.design],
      work:[this.customer.work],
      property:[this.customer.property],
      annual:[this.customer.annual],
      fathername:[this.customer.fathername],
      freligion:[this.customer.freligion],
      fcaste:[this.customer.fcaste],
      isconvert:[this.customer.isconvert],
      fatherstatus:[this.customer.fatherstatus],
      pension:[this.customer.pension],
      mname:[this.customer.mname],
      maidenname:[this.customer.maidenname],
      mreligion:[this.customer.mreligion],
      mcaste:[this.customer.mcaste],
      mconvert:[this.customer.mconvert],
      peraddress:[this.customer.peraddress],
      presentaddress:[this.customer.presentaddress],
      motherstat:[this.customer.motherstat],
      brothers:[this.customer.brothers],
      sisters:[this.customer.sisters],
      refname:[this.customer.refname],
      refmobile:[this.customer.refmobile],
      refaddress:[this.customer.refaddress],
      plooking:[this.customer.plooking],
      pheight:[this.customer.pheight],
      pfstatus:[this.customer.pfstatus],
      pintercaste:[this.customer.pintercaste],
      khujadosham:[this.customer.khujadosham],
      complexion:[this.customer.complexion],
      pprofession:[this.customer.pprofession],
      passport:[this.customer.passport],
      psmoke:[this.customer.psmoke],
      pdrink:[this.customer.pdrink],
      peducation:[this.customer.peducation],
      near: [this.customer.near],
      ftype: [this.customer.ftype],
      fstatus: [this.customer.fstatus],
      department: [this.customer.department],
      uploadFile: [this.customer.uploadFile],

    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.customerService.addCustomer(this.customerForm.getRawValue());
  }
}
