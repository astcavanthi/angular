import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Branch,BranchResponse } from './branch.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {environment} from 'src/environments/environment';
import {Country} from "../country/country.model";
@Injectable()
export class BranchService extends UnsubscribeOnDestroyAdapter {
  //private API_URL = 'http://127.0.0.1:8000/';
  isTblLoading = true;
  dataChange: BehaviorSubject<Branch[]> = new BehaviorSubject<Branch[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Branch;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Branch[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getBranch(): void {
    this.subs.sink = this.httpClient.get<BranchResponse>(environment.apiUrl+"/masters/branch/")
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
  addBranch(branch: Branch): void {
    this.dialogData = branch;

    this.httpClient.post(environment.apiUrl+"/masters/branch/", branch)
      .subscribe({
        next: (data) => {
          this.dialogData = branch;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  updateBranch(branch: Branch): void {
    this.dialogData = branch;
    this.httpClient.put(environment.apiUrl + "/masters/branch/", branch)
      .subscribe({
        next: (data) => {
          this.dialogData = branch;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  deleteBranch(id: number): void {

    this.httpClient.delete(environment.apiUrl+"/masters/branch/" + id)
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  statusBranch(id: number): void {
    this.httpClient.patch(environment.apiUrl+"/masters/branch/" + id,{},{})
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
