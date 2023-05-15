import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatecustomerComponent } from './createcustomer/createcustomer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
const routes: Routes = [
  {
    path: 'createcustomer',
    component: CreatecustomerComponent
  },
  {
    path: 'add-customer',
    component: AddCustomerComponent
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}

