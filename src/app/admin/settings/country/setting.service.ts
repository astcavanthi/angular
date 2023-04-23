import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Setting } from './setting.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
@Injectable()
export class SettingService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/setting.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Setting[]> = new BehaviorSubject<Setting[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Setting;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Setting[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getCountry(): void {
    this.subs.sink = this.httpClient.get<Setting[]>(this.API_URL).subscribe({
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
  addSetting(setting: Setting): void {
    this.dialogData = setting;

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
  updateSetting(setting: Setting): void {
    this.dialogData = setting;

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
  deleteSetting(id: number): void {
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