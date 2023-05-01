import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Educationdetails,EducationdetailsResponse } from './educationdetails.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {environment} from 'src/environments/environment';
@Injectable()
export class EducationdetailsService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<Educationdetails[]> = new BehaviorSubject<Educationdetails[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Educationdetails;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Educationdetails[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getEducation(): void {
    this.subs.sink = this.httpClient.get<EducationdetailsResponse>(environment.apiUrl+"/masters/education/")
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
  addEducation(education: Educationdetails): void {
    this.dialogData = education;

    this.httpClient.post(environment.apiUrl+"/masters/education/", education)
      .subscribe({
        next: (data) => {
          this.dialogData = education;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  updateEducation(education: Educationdetails): void {
    this.dialogData = education;
    this.httpClient.put(environment.apiUrl + "/masters/education/", education)
      .subscribe({
        next: (data) => {
          this.dialogData = education;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  deleteEducation(id: number): void {

    this.httpClient.delete(environment.apiUrl+"/masters/education/" + id)
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  statusEducation(id: number): void {
    this.httpClient.patch(environment.apiUrl+"/masters/education/" + id,{},{})
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
