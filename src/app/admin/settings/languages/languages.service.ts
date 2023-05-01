import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Language,LanguageResponse } from './languages.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {environment} from 'src/environments/environment';

@Injectable()
export class LanguagesService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<Language[]> = new BehaviorSubject<Language[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Language;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Language[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getLanguage(): void {
    this.subs.sink = this.httpClient.get<LanguageResponse>(environment.apiUrl+"/masters/language/")
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
  addLanguage(language: Language): void {
    this.dialogData = language;

    this.httpClient.post(environment.apiUrl+"/masters/language/", language)
      .subscribe({
        next: (data) => {
          this.dialogData = language;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  updateLanguage(language: Language): void {
    this.dialogData = language;
    this.httpClient.put(environment.apiUrl + "/masters/language/", language)
      .subscribe({
        next: (data) => {
          this.dialogData = language;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
  deleteLanguage(id: number): void {

    this.httpClient.delete(environment.apiUrl+"/masters/language/" + id)
      .subscribe({
        next: (data) => {
          console.log(id);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  statusLanguage(id: number): void {
    this.httpClient.patch(environment.apiUrl+"/masters/language/" + id,{},{})
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
