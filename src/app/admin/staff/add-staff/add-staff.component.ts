import { Component,SkipSelf } from '@angular/core';
import { StateService } from '../../settings/state/state.service';
import { DistrictService } from '../../settings/district/district.service';
import { CountryService } from '../../settings/country/country.service';
import { CityService } from '../../settings/city/city.service';
import { BranchService } from '../../settings/branch/branch.service';
import { ReligionService } from '../../settings/religion/religion.service';
import { CasteService } from '../../settings/caste/caste.service';
import { EducationdetailsService } from '../../settings/educationdetails/educationdetails.service';
import { SourceService } from '../../settings/source/source.service';
import {BehaviorSubject,Observable } from 'rxjs';
import { Country, CountryResponse } from '../../settings/country/country.model';
import { State,StateResponse } from '../../settings/state/state.model';
import { District, DistrictResponse } from '../../settings/district/district.model';
import { City, CityResponse } from '../../settings/city/city.model';
import { Branch,BranchResponse } from '../../settings/branch/branch.model';
import { Religion,ReligionResponse } from '../../settings/religion/religion.model';
import { Caste,CasteResponse } from '../../settings/caste/caste.model';
import { Educationdetails,EducationdetailsResponse } from '../../settings/educationdetails/educationdetails.model';
import { Source,SourceResponse } from '../../settings/source/source.model';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { StaffService } from '../staff.service';
import { Staff,StaffResponse,User } from '../staff.model';
import { Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
  providers: [ StateService,CountryService,DistrictService,CityService,BranchService,ReligionService,
                CasteService,EducationdetailsService,SourceService,StaffService ]
})
export class AddStaffComponent {
  staffForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Staff',
      items: ['Staff'],
      active: 'Add Staff',
    },
  ];
  public countries$: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
  public states$: BehaviorSubject<State[]> = new BehaviorSubject<State[]>([]);
  public districts$: BehaviorSubject<District[]> = new BehaviorSubject<District[]>([]);
  public cities$: BehaviorSubject<City[]> = new BehaviorSubject<City[]>([]);
  public branches$: BehaviorSubject<Branch[]> = new BehaviorSubject<Branch[]>([]);
  public religions$: BehaviorSubject<Religion[]> = new BehaviorSubject<Religion[]>([]);
  public castes$: BehaviorSubject<Caste[]> = new BehaviorSubject<Caste[]>([]);
  public educations$: BehaviorSubject<Educationdetails[]> = new BehaviorSubject<Educationdetails[]>([]);
  public sources$: BehaviorSubject<Source[]> = new BehaviorSubject<Source[]>([]);
  staff!:Staff;
  user!:User;
  userNew!:User;
  staffNew!:Staff;
  constructor(private fb: UntypedFormBuilder,
    private stateService: StateService,
    private countryService : CountryService,
    private districtService : DistrictService,
    private cityService : CityService,
    private branchService : BranchService,
    private religionService : ReligionService,
    private casteService : CasteService,
    private educationService : EducationdetailsService,
    private sourceService : SourceService,
    private staffService : StaffService,
    private snackBar: MatSnackBar,
    private router: Router
    ) {
    this.staffForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last_name: [''],
      username: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      matrialStatus : [''],
      officeMobile : [''],
      country : [''],
      state : [''],
      district : [''],
      city : [''],
      branch : [''],
      religion : [''],
      caste : [''],
      eduType : [''],
      qual : [''],
      aadharno : [''],
      fname : [''],
      fmobile : [''],
      faddress : [''],
      refname : [''],
      refmobile : [''],
      refaddress : [''],
      jdate : ['',[Validators.required]],
      source : [''],
      pexp : [''],
      password: ['', [Validators.required]],
      conformPassword: ['', [Validators.required]],
      designation: [''],
      department: [''],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      pemail: [
        '',
        [Validators.email, Validators.minLength(5)],
      ],
      dob: ['', [Validators.required]],
      education: [''],
      sscUploadFile: [''],
      higherUploadFile: [''],
      aadharUploadFile: [''],
      pancardUploadFile: [''],
      profilePicUploadFile: [''],
      bankPassBookUploadFile: [''],
    });
  }
  onSubmit() {
    console.log('Form Value', this.staffForm.value);
    if(this.staffForm.value.password !== this.staffForm.value.conformPassword){
      this.showNotification(
        'snackbar-danger',
        'Password and ConfirmPassword Mismatch...!!!',
        'top',
        'center'
      );
      return;
    }
    
    this.user = this.staffForm.getRawValue();
    this.staff = this.staffForm.getRawValue();
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
    this.userNew.is_staff=1;

      const blankObject = {} as Staff;
      this.staffNew = new Staff(blankObject);
      this.staffNew.gender = this.staff.gender;
      this.staffNew.maritalStatus = this.staff.maritalStatus;
      this.staffNew.officeMobile = this.staff.officeMobile;
      this.staffNew.pemail = this.staff.pemail;
      this.staffNew.eduType = this.staff.eduType;
      this.staffNew.qual = this.staff.qual;
      this.staffNew.aadharno = this.staff.aadharno;
      this.staffNew.fname = this.staff.fname;
      this.staffNew.fmobile = this.staff.fmobile;
      this.staffNew.faddress = this.staff.faddress;
      this.staffNew.refname = this.staff.refname;
      this.staffNew.refmobile = this.staff.refmobile;
      this.staffNew.refaddress = this.staff.refaddress;
      this.staffNew.dob = this.staff.dob;
      this.staffNew.jdate = this.staff.jdate;
      this.staffNew.source = this.staff.source;
      this.staffNew.pexp = this.staff.pexp;
      this.staffNew.status = 1;
      this.staffNew.branch = this.staff.branch;
      this.staffNew.religion = this.staff.religion;
      this.staffNew.caste = this.staff.caste;
      this.staffNew.user= this.userNew; 

      // console.log(this.staffNew);

    this.staffService.addStaff(this.staffNew);

    this.showNotification(
      'snackbar-success',
      'Add Record Successfully...!!!',
      'top',
      'center'
    );
    this.router.navigate(['admin/dashboard/main']);
  }
  onInput(event: any) {
    // Get input value and remove non-numeric characters
    const inputValue = event.target.value.replace(/[^0-9]/g, '');
    // Update input value
    event.target.value = inputValue;
    // Update ngModel value
    // this.mobile = inputValue;
  }
  
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  ngOnInit() {
    this.countryService.getCountries();
    this.countries$ = this.countryService.countries$;
    this.branchService.getBranches();
    this.branches$=this.branchService.branches$;
    this.religionService.getReligions();
    this.religions$=this.religionService.religions$;
    this.casteService.getCastes();
    this.castes$=this.casteService.castes$;
    this.educationService.getEducations();
    this.educations$=this.educationService.educations$;
    this.sourceService.getSources();
    this.sources$ = this.sourceService.sources$;
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


}
