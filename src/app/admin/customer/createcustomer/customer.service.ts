import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from './customer.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
@Injectable()
export class CustomerService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/customer.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Customer;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Customer[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCustomers(): void {
    this.subs.sink = this.httpClient.get<Customer[]>(this.API_URL).subscribe({
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

  addCustomer(customer: Customer): void {
    this.dialogData = customer;

    this.httpClient.post(this.API_URL, customer)
      .subscribe({
        next: (data) => {
          this.dialogData = customer;
        },
        error: (error: HttpErrorResponse) => {
           // error code here
        },
      });
  }
  updateCustomer(customer: Customer): void {
    this.dialogData = customer;

    // this.httpClient.put(this.API_URL + customer.id, customer)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = customer;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteCustomer(id: number): void {
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
