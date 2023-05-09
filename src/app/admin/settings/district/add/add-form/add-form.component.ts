import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnChanges } from '@angular/core';
import { DistrictService } from '../../district.service';
import { CountryService } from '../../../country/country.service';
import { StateService }   from '../../../state/state.service';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject,Observable } from 'rxjs';
import { map } from 'rxjs';  
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { District } from '../../district.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Country, CountryResponse } from '../../../country/country.model';
import {State,StateResponse} from  '../../../state/state.model';
import {environment} from 'src/environments/environment';

export interface DialogData {
  id: number;
  action: string;
  district: District;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },CountryService],
})
export class AddDistrictFormComponent {
  action: string;
  dialogTitle: string;
  district: District;
  districtNew! : District ; // Temporarly stores
  districtForm: UntypedFormGroup;
  public countries$: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
  public states$: BehaviorSubject<State[]> = new BehaviorSubject<State[]>([]);
   constructor(
    public httpClient : HttpClient,
    public dialogRef: MatDialogRef<AddDistrictFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public districtService: DistrictService,
    public countryService : CountryService,
    public stateService : StateService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit District';
      this.district = data.district;
    } else {
      this.dialogTitle = 'Add District';
      const blankObject = {} as District;
      this.district = new District(blankObject);
    }
    this.districtForm = this.createContactForm();
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
      name: [this.district.name, [Validators.required]],
      country:[this.district.country, [Validators.required]],
      code:[this.district.code, [Validators.required]],
      state:[this.district.state, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.countryService.getCountries();
      this.countries$ = this.countryService.countries$;
   }

   public onCountryChange(e:any){
    this.stateService.onCountryChangeState(e);
    this.states$ = this.stateService.states$;
   }
  // public onCountryChangeState(e:any){
  //   this.httpClient.get<StateResponse>(environment.apiUrl+"/masters/statecountries/" + e.value)
  //   .subscribe({
  //             next : (data1) => {
  //               this.states$.next(data1.data);
  //             },
  //             error: (error: HttpErrorResponse) => {
  //               console.log(error.name + ' ' + error.message);
  //             },
  //         });
  //  }

  public confirmAdd(): void {
    if(this.action === 'edit'){
      const blankObject = {} as District;
      this.districtNew = new District(blankObject);
      this.districtNew.id = this.district.id;
      this.districtNew.status=1;
      this.district = this.districtForm.getRawValue();
      this.districtNew.name = this.district.name;
      this.districtNew.code = this.district.code;
      this.districtNew.country = this.district.country;
      this.districtNew.state = this.district.state;
      this.districtService.updateDistrict(this.districtNew);
    }
    else
      this.districtService.addDistrict(this.districtForm.getRawValue());
  }
}
