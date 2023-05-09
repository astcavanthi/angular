import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { District,DistrictResponse } from './district.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {environment} from 'src/environments/environment';

@Injectable()
export class DistrictService extends UnsubscribeOnDestroyAdapter {
  // private API_URL = 'http://127.0.0.1:8000/';
  isTblLoading = true;
  dataChange: BehaviorSubject<District[]> = new BehaviorSubject<District[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: District;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): District[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getDistrict(): void {
    this.subs.sink = this.httpClient.get<DistrictResponse>(environment.apiUrl+"/masters/district/")
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
  addDistrict(district: District): void {
    this.dialogData = district;
    this.httpClient.post(environment.apiUrl+"/masters/district/", district)
      .subscribe({
        next: (data) => {
          this.dialogData = district;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  updateDistrict(district: District): void {
    this.dialogData = district;
    this.httpClient.put(environment.apiUrl + "/masters/district/", district)
      .subscribe({
        next: (data) => {
          this.dialogData = district;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  deleteDistrict(id: number): void {
    this.httpClient.delete(environment.apiUrl+"/masters/district/" + id)
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  statusDistrict(id: number): void {
    this.httpClient.patch(environment.apiUrl+"/masters/district/" + id,{},{})
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
