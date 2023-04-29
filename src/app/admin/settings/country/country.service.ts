import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Country, CountryResponse} from './country.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
@Injectable()
export class CountryService extends UnsubscribeOnDestroyAdapter {
   // private readonly API_URL = 'assets/data/country.json';
  //private API_URL = 'http://127.0.0.1:8000/';
  isTblLoading = true;
  dataChange: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Country;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Country[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getCountry(): void {
    this.subs.sink = this.httpClient.get<CountryResponse>(environment.apiUrl+"masters/country/")
      .subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }
  addCountry(country: Country): void {
    this.dialogData = country;

    this.httpClient.post(environment.apiUrl+"masters/country/", country)
      .subscribe({
        next: (data) => {
          this.dialogData = country;
        },
        error: (error: HttpErrorResponse) => {
           console.log(error);
        },
      });
  }
  updateCountry(country: Country): void {
    this.dialogData = country;
    this.httpClient.put(environment.apiUrl + "masters/country/", country)
        .subscribe({
          next: (data) => {
            this.dialogData = country;
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          },
        });
  }
  deleteCountry(id: number): void {

    this.httpClient.delete(environment.apiUrl+"masters/country/" + id)
        .subscribe({
          next: (data) => {
            console.log(id);
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          },
        });
  }

  statusCountry(id: number): void {
    this.httpClient.patch(environment.apiUrl+"masters/country/" + id,{},{})
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

}
