import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Country } from './country.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
@Injectable()
export class CountryService extends UnsubscribeOnDestroyAdapter {
   private readonly API_URL = 'assets/data/country.json';
  // private readonly API_URL = 'http://127.0.0.1:8000/masters/countrylist/';
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
    this.subs.sink = this.httpClient.get<Country[]>(this.API_URL).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }
  addCountry(country: Country): void {
    this.dialogData = country;

    // this.httpClient.post(this.API_URL, department)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = department;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateCountry(country: Country): void {
    this.dialogData = country;

    // this.httpClient.put(this.API_URL + department.id, department)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = department;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteCountry(id: number): void {
    console.log(id);

    // this.httpClient.delete(this.API_URL + id)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(id);
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
}
