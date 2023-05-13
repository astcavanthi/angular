import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SubCaste,SubCasteResponse } from './subcast.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {environment} from 'src/environments/environment';
@Injectable()
export class SubCasteService extends UnsubscribeOnDestroyAdapter {
 // private API_URL = 'http://127.0.0.1:8000/';
  isTblLoading = true;
  dataChange: BehaviorSubject<SubCaste[]> = new BehaviorSubject<SubCaste[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: SubCaste;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): SubCaste[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getSubCaste(): void {
    this.subs.sink = this.httpClient.get<SubCasteResponse>(environment.apiUrl+"/masters/subcaste/")
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
  addSubCaste(subcaste: SubCaste): void {
    this.dialogData = subcaste;

    this.httpClient.post(environment.apiUrl+"/masters/subcaste/", subcaste)
      .subscribe({
        next: (data) => {
          this.dialogData = subcaste;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  updateSubCaste(subcaste: SubCaste): void {
    this.dialogData = subcaste;
    this.httpClient.put(environment.apiUrl + "/masters/subcaste/", subcaste)
      .subscribe({
        next: (data) => {
          this.dialogData = subcaste;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  deleteSubCaste(id: number): void {

    this.httpClient.delete(environment.apiUrl+"/masters/subcaste/" + id)
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  statusSubCaste(id: number): void {
    this.httpClient.patch(environment.apiUrl+"/masters/subcaste/" + id,{},{})
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
