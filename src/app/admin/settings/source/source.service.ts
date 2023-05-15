import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Source,SourceResponse } from './source.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {environment} from 'src/environments/environment';

@Injectable()
export class SourceService extends UnsubscribeOnDestroyAdapter {
  // private API_URL = 'http://127.0.0.1:8000/';
  isTblLoading = true;
  dataChange: BehaviorSubject<Source[]> = new BehaviorSubject<Source[]>(
    []
  );
  public sources$: BehaviorSubject<Source[]> = new BehaviorSubject<Source[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Source;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Source[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getSource(): void {
    this.subs.sink = this.httpClient.get<SourceResponse>(environment.apiUrl+"/masters/source/")
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
  addSource(source: Source): void {
    this.dialogData = source;

    this.httpClient.post(environment.apiUrl+"/masters/source/", source)
      .subscribe({
        next: (data) => {
          this.dialogData = source;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  updateSource(source: Source): void {
    this.dialogData = source;
    this.httpClient.put(environment.apiUrl + "/masters/source/", source)
      .subscribe({
        next: (data) => {
          this.dialogData = source;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  deleteSource(id: number): void {

    this.httpClient.delete(environment.apiUrl+"/masters/source/" + id)
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  statusSource(id: number): void {
    this.httpClient.patch(environment.apiUrl+"/masters/source/" + id,{},{})
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }


  getSources() {
    this.httpClient.get<SourceResponse>(environment.apiUrl+"/masters/source/")
     .subscribe({
               next : (data1) => {
                 this.sources$.next(data1.data);
               },
               error: (error: HttpErrorResponse) => {
                 console.log(error.name + ' ' + error.message);
               },
           });
   }


}
