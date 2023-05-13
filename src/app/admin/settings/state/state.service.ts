import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { State,StateResponse } from './state.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {environment} from 'src/environments/environment';

@Injectable()
export class StateService extends UnsubscribeOnDestroyAdapter {
  // private API_URL = 'http://127.0.0.1:8000/';
  isTblLoading = true;
  dataChange: BehaviorSubject<State[]> = new BehaviorSubject<State[]>(
    []
  );
  public states$: BehaviorSubject<State[]> = new BehaviorSubject<State[]>([]);
  public failureCode = 0;
  // Temporarily stores data from dialogs
  dialogData!: State;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): State[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getState(): void {
    this.subs.sink = this.httpClient.get<StateResponse>(environment.apiUrl+"/masters/state/")
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

  getStates() {
    this.httpClient.get<StateResponse>(environment.apiUrl+"/masters/state/")
     .subscribe({
               next : (data1) => {
                 this.states$.next(data1.data);
               },
               error: (error: HttpErrorResponse) => {
                 console.log(error.name + ' ' + error.message);
               },
           });
   }

  addState(state: State): void {
    this.dialogData = state;
    this.failureCode = 0;
    this.httpClient.post(environment.apiUrl+"/masters/state/", state)
      .subscribe({
        next: (data) => {
          this.dialogData = state;
        },
        error: (error: HttpErrorResponse) => {
          this.failureCode = 1;
          console.log(error);
        },
      });
  }
  updateState(state: State): void {
    console.log(state);
    this.dialogData = state;
    this.httpClient.put(environment.apiUrl + "/masters/state/", state)
      .subscribe({
        next: (data) => {
          this.dialogData = state;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  deleteState(id: number): void {
    this.httpClient.delete(environment.apiUrl+"/masters/state/" + id)
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  statusState(id: number): void {
    this.httpClient.patch(environment.apiUrl+"/masters/state/" + id,{},{})
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  public onCountryChangeState(e:any){
    this.httpClient.get<StateResponse>(environment.apiUrl+"/masters/statecountries/" + e.value)
    .subscribe({
              next : (data1) => {
                this.states$.next(data1.data);
              },
              error: (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
              },
          });
   }


}
