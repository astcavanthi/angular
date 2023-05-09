import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnChanges } from '@angular/core';
import { CityService } from '../../city.service';
import { CountryService } from '../../../country/country.service';
import { StateService }   from '../../../state/state.service';
import { DistrictService } from '../../../district/district.service';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject,Observable } from 'rxjs';
import { map } from 'rxjs';  
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { City } from '../../city.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Country, CountryResponse } from '../../../country/country.model';
import {State,StateResponse} from  '../../../state/state.model';
import {District,DistrictResponse} from '../../../district/district.model'
import {environment} from 'src/environments/environment';

export interface DialogData {
  id: number;
  action: string;
  city: City;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },CountryService],
})
export class AddCityFormComponent {
  action: string;
  dialogTitle: string;
  city: City;
  cityNew! : City ; // Temporarly stores
  cityForm: UntypedFormGroup;
  public countries$: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
  public states$: BehaviorSubject<State[]> = new BehaviorSubject<State[]>([]);
  public district$: BehaviorSubject<District[]> = new BehaviorSubject<District[]>([]);
   constructor(
    public httpClient : HttpClient,
    public dialogRef: MatDialogRef<AddCityFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public districtService: DistrictService,
    public countryService : CountryService,
    public stateService : StateService,
    public cityService : CityService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit City';
      this.city = data.city;
    } else {
      this.dialogTitle = 'Add City';
      const blankObject = {} as City;
      this.city = new City(blankObject);
    }
    this.cityForm = this.createContactForm();
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
      name: [this.city.name, [Validators.required]],
      country:[this.city.country, [Validators.required]],
      code:[this.city.code, [Validators.required]],
      state:[this.city.state, [Validators.required]],
      district:[this.city.district, [Validators.required]],
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
      const blankObject = {} as City;
      this.cityNew = new City(blankObject);
      this.cityNew.id = this.city.id;
      this.cityNew.status=1;
      this.city = this.cityForm.getRawValue();
      this.cityNew.name = this.city.name;
      this.cityNew.code = this.city.code;
      this.cityNew.country = this.city.country;
      this.cityNew.state = this.city.state;
      this.cityNew.district=this.city.district;
      this.cityService.updateCity(this.cityNew);
    }
    else
      this.cityService.addCity(this.cityForm.getRawValue());
  }
}
