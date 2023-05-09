import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City,CityResponse } from './city.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {environment} from 'src/environments/environment';

@Injectable()
export class CityService extends UnsubscribeOnDestroyAdapter {
  // private API_URL = 'http://127.0.0.1:8000/';
  isTblLoading = true;
  dataChange: BehaviorSubject<City[]> = new BehaviorSubject<City[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: City;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): City[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getCity(): void {
    this.subs.sink = this.httpClient.get<CityResponse>(environment.apiUrl+"/masters/city/")
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
  addCity(city: City): void {
    this.dialogData = city;
    this.httpClient.post(environment.apiUrl+"/masters/city/", city)
      .subscribe({
        next: (data) => {
          this.dialogData = city;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  updateCity(city: City): void {
    this.dialogData = city;
    this.httpClient.put(environment.apiUrl + "/masters/city/", city)
      .subscribe({
        next: (data) => {
          this.dialogData = city;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  deleteCity(id: number): void {
    this.httpClient.delete(environment.apiUrl+"/masters/city/" + id)
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  statusCity(id: number): void {
    this.httpClient.patch(environment.apiUrl+"/masters/city/" + id,{},{})
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
