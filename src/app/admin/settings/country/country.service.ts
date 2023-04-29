import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Country, CountryResponse} from './country.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
@Injectable()
export class CountryService extends UnsubscribeOnDestroyAdapter {
   // private readonly API_URL = 'assets/data/country.json';
  private API_URL = 'http://127.0.0.1:8000/';
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
    this.subs.sink = this.httpClient.get<CountryResponse>(this.API_URL+"masters/country/")
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

    this.httpClient.post(this.API_URL+"masters/country/", country)
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
    this.httpClient.put(this.API_URL + "masters/country/", country)
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

    this.httpClient.delete(this.API_URL+"masters/country/" + id)
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
    this.httpClient.patch(this.API_URL+"masters/country/" + id,{},{})
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
