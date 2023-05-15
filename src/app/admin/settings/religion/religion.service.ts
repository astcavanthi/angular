import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Religion,ReligionResponse } from './religion.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {environment} from 'src/environments/environment';
@Injectable()
export class ReligionService extends UnsubscribeOnDestroyAdapter {
  //private API_URL = 'http://127.0.0.1:8000/';
  isTblLoading = true;
  dataChange: BehaviorSubject<Religion[]> = new BehaviorSubject<Religion[]>(
    []
  );
  public religions$: BehaviorSubject<Religion[]> = new BehaviorSubject<Religion[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Religion;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Religion[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getReligion(): void {
    this.subs.sink = this.httpClient.get<ReligionResponse>(environment.apiUrl+"/masters/religion/")
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
  addReligion(religion: Religion): void {
    this.dialogData = religion;

    this.httpClient.post(environment.apiUrl+"/masters/religion/", religion)
      .subscribe({
        next: (data) => {
          this.dialogData = religion;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  updateReligion(religion: Religion): void {
    this.dialogData = religion;

    this.httpClient.put(environment.apiUrl+ "/masters/religion/", religion)
      .subscribe({
        next: (data) => {
          this.dialogData = religion;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  deleteReligion(id: number): void {
    console.log(id);

    this.httpClient.delete(environment.apiUrl+"/masters/religion/" + id)
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  statusReligion(id: number): void {
    this.httpClient.patch(environment.apiUrl+"/masters/religion/" + id,{},{})
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  getReligions() {
    this.httpClient.get<ReligionResponse>(environment.apiUrl+"/masters/religion/")
     .subscribe({
               next : (data1) => {
                 this.religions$.next(data1.data);
               },
               error: (error: HttpErrorResponse) => {
                 console.log(error.name + ' ' + error.message);
               },
           });
   }

}
