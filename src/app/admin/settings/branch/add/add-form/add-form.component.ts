import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { BranchService } from '../../branch.service';
import { CountryService } from '../../../country/country.service';
import { StateService } from '../../../state/state.service';
import { DistrictService } from '../../../district/district.service';
import { CityService } from '../../../city/city.service';
import {Country,CountryResponse} from "../../../country/country.model";
import {State,StateResponse} from "../../../state/state.model";
import {District,DistrictResponse} from "../../../district/district.model";
import {City,CityResponse} from "../../../city/city.model";
import {BehaviorSubject,Observable } from 'rxjs';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Branch,BranchResponse,User } from '../../branch.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';


export interface DialogData {
  id: number;
  action: string;
  branch: Branch;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },StateService,CountryService,DistrictService,CityService,],
})
export class AddBranchFormComponent {
  action: string;
  dialogTitle: string;
  branch: Branch;
  branchNew! : Branch ; // Temporarly stores the data into branchNew
  branchForm: UntypedFormGroup;
  public countries$: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
  public states$: BehaviorSubject<State[]> = new BehaviorSubject<State[]>([]);
  public districts$: BehaviorSubject<District[]> = new BehaviorSubject<District[]>([]);
  public cities$: BehaviorSubject<City[]> = new BehaviorSubject<City[]>([]);

  user!:User;
  userNew!:User;
  constructor(
    public dialogRef: MatDialogRef<AddBranchFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public branchService: BranchService,
    private stateService: StateService,
    private countryService : CountryService,
    private districtService : DistrictService,
    private cityService : CityService,
    private fb: UntypedFormBuilder,
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Branch';
      this.branch = data.branch;
    } else {
      this.dialogTitle = 'Add Branch';
      const blankObject = {} as Branch;
      const blankObject1 = {} as User;
      this.branch = new Branch(blankObject);
      this.branch.user = new User(blankObject1);
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
      address: [this.branch.address, [Validators.required]],      
      phone: [this.branch.user.phone, [Validators.required,Validators.pattern('^[0-9]*$')]],
      email: [
        this.branch.user.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      country : [''],
      state : [''],
      district : [''],
      city : [''],
      pincode : [this.branch.user.pincode],
      username: [this.branch.user.username, [Validators.required]],
      password: [this.branch.user.password, [Validators.required]],
      conformPassword: ['', [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.branchService.passwordValidate$=0;
    if(this.action === 'edit'){
     // this.stateService.findState(this.branch.user.state);
     // this.states$ = this.stateService.states$;
      // console.log(this.branch.user.state_name);
      // this.branchForm.patchValue(
      //   {
      //     state:this.branch.user.state_name
      //   }
      // );
    }
    else{
      this.countryService.getCountries();
      this.countries$ = this.countryService.countries$;
    }
  }

  public onCountryChange(e:any){
    this.stateService.onCountryChangeState(e);
    this.states$ = this.stateService.states$;
   }

   public onCountryStateChangeDistrict(e:any){
    this.districtService.onCountryStateChangeDistrict(e);
    this.districts$ = this.districtService.districts$;
   }

   public onCountryStateDistrictChangeCity(e:any){
    this.cityService.onCountryStateDistrictChangeCity(e);
    this.cities$ = this.cityService.cities$;
   }


  public confirmAdd(): void {
    if(this.action === 'edit'){
      const blankObject = {} as Branch;
      this.branchNew = new Branch(blankObject);
      this.branchNew.id = this.branch.id;
      this.branchNew.status=1;
      this.branch = this.branchForm.getRawValue();
      this.user = this.branchForm.getRawValue();
      this.branchNew.name = this.branch.name;
      this.branchNew.address = this.branch.address;
      this.branchNew.user.address=this.branch.address;
      this.branchNew.user.phone = this.user.phone;
      this.branchNew.user.email=this.user.email;
      this.branchNew.user.state=this.user.state;
      this.branchNew.user.district=this.user.district;
      this.branchNew.user.city=this.user.city;
      this.branchNew.user.pincode=this.user.pincode;
      this.branchNew.user.password = this.user.password;
      if(this.branchForm.value.password !== this.branchForm.value.conformPassword){
        this.branchService.passwordValidate$=1;
        // return;
      }
      this.branchService.updateBranch(this.branchNew);
    }
    else
    {

      if(this.branchForm.value.password !== this.branchForm.value.conformPassword){
        this.branchService.passwordValidate$=1;
        // return;
      }
      else{
    this.user = this.branchForm.getRawValue();
    this.branch = this.branchForm.getRawValue();
    const blankObject1 = {} as User;
    this.userNew = new User(blankObject1);
    this.userNew.password = this.user.password;
    this.userNew.email = this.user.email;
    this.userNew.phone = this.user.phone;
    this.userNew.first_name = this.user.first_name;
    this.userNew.last_name = this.user.last_name;
    this.userNew.address = this.user.address;
    this.userNew.username = this.user.username;
    this.userNew.state = this.user.state;
    this.userNew.district = this.user.district;
    this.userNew.city = this.user.city;
    this.userNew.pincode = this.user.pincode;
    this.userNew.is_branch=1;

      const blankObject = {} as Branch;
      this.branchNew = new Branch(blankObject);
      this.branchNew.name = this.branch.name;
      this.branchNew.address = this.branch. address;
      this.branchNew.status =1;
      this.branchNew.user = this.userNew;
    

      //console.log(this.branchNew);

      this.branchService.addBranch(this.branchNew);
    
    //this.branchService.addBranch(this.branchForm.getRawValue());
      }
    }
      
  }

  onInput(event: any) {
    // Get input value and remove non-numeric characters
    const inputValue = event.target.value.replace(/[^0-9]/g, '');
    // Update input value
    event.target.value = inputValue;
    // Update ngModel value
    // this.mobile = inputValue;
  }

}

