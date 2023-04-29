import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Caste,CasteResponse } from './caste.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {environment} from 'src/environments/environment';
import {Branch} from "../branch/branch.model";
@Injectable()
export class CasteService extends UnsubscribeOnDestroyAdapter {
 // private API_URL = 'http://127.0.0.1:8000/';
  isTblLoading = true;
  dataChange: BehaviorSubject<Caste[]> = new BehaviorSubject<Caste[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Caste;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Caste[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getCaste(): void {
    this.subs.sink = this.httpClient.get<CasteResponse>(environment.apiUrl+"masters/caste/")
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
  addCaste(caste: Caste): void {
    this.dialogData = caste;

    this.httpClient.post(environment.apiUrl+"masters/caste/", caste)
      .subscribe({
        next: (data) => {
          this.dialogData = caste;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  updateCaste(caste: Caste): void {
    this.dialogData = caste;
    this.httpClient.put(environment.apiUrl + "masters/caste/", caste)
      .subscribe({
        next: (data) => {
          this.dialogData = caste;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  deleteCaste(id: number): void {

    this.httpClient.delete(environment.apiUrl+"masters/caste/" + id)
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  statusCaste(id: number): void {
    this.httpClient.patch(environment.apiUrl+"masters/caste/" + id,{},{})
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
