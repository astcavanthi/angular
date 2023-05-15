import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Staff,StaffResponse,User } from './staff.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {environment} from 'src/environments/environment';

@Injectable()
export class StaffService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/staff.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Staff[]> = new BehaviorSubject<Staff[]>(
    []
  );
  
  // Temporarily stores data from dialogs
  dialogData!: Staff;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Staff[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getStaff(): void {
    this.subs.sink = this.httpClient.get<StaffResponse>(environment.apiUrl+"/masters/staff/")
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
  addStaff(staff: Staff): void {
    this.dialogData = staff;
    console.log(staff);
    this.httpClient.post(environment.apiUrl+"/masters/staff/", staff)
      .subscribe({
        next: (data) => {
          this.dialogData = staff;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  getAllStaffs(): void {
    this.subs.sink = this.httpClient.get<Staff[]>(this.API_URL).subscribe({
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

//   updateBranch(branch: Branch): void {
//     this.dialogData = branch;
//     this.httpClient.put(environment.apiUrl + "/masters/branch/", branch)
//       .subscribe({
//         next: (data) => {
//           this.dialogData = branch;
//         },
//         error: (error: HttpErrorResponse) => {
//           console.log(error);
//         },
//       });
//   }
//   deleteBranch(id: number): void {

//     this.httpClient.delete(environment.apiUrl+"/masters/branch/" + id)
//       .subscribe({
//         next: (data) => {
//           console.log(id);
//         },
//         error: (error: HttpErrorResponse) => {
//           console.log(error);
//         },
//       });
//   }

//   statusBranch(id: number): void {
//     this.httpClient.patch(environment.apiUrl+"/masters/branch/" + id,{},{})
//       .subscribe({
//         next: (data) => {
//           console.log(id);
//         },
//         error: (error: HttpErrorResponse) => {
//           console.log(error);
//         },
//       });
//   }

//   getBranches() {
//     this.httpClient.get<BranchResponse>(environment.apiUrl+"/masters/branch/")
//      .subscribe({
//                next : (data1) => {
//                  this.branches$.next(data1.data);
//                },
//                error: (error: HttpErrorResponse) => {
//                  console.log(error.name + ' ' + error.message);
//                },
//            });
//    }
   

}
