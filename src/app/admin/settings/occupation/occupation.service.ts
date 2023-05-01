import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Occupation,OccupationResponse } from './occupation.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {environment} from 'src/environments/environment';
@Injectable()
export class OccupationService extends UnsubscribeOnDestroyAdapter {
  // private API_URL = 'http://127.0.0.1:8000/';
  isTblLoading = true;
  dataChange: BehaviorSubject<Occupation[]> = new BehaviorSubject<Occupation[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Occupation;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Occupation[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getOccupation(): void {
    this.subs.sink = this.httpClient.get<OccupationResponse>(environment.apiUrl+"/masters/occupation/")
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
  addOccupation(occupation: Occupation): void {
    this.dialogData = occupation;

    this.httpClient.post(environment.apiUrl+"/masters/occupation/", occupation)
      .subscribe({
        next: (data) => {
          this.dialogData = occupation;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  updateOccupation(occupation: Occupation): void {
    this.dialogData = occupation;
    this.httpClient.put(environment.apiUrl + "/masters/occupation/", occupation)
      .subscribe({
        next: (data) => {
          this.dialogData = occupation;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  deleteOccupation(id: number): void {

    this.httpClient.delete(environment.apiUrl+"/masters/occupation/" + id)
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  statusOccupation(id: number): void {
    this.httpClient.patch(environment.apiUrl+"/masters/occupation/" + id,{},{})
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
