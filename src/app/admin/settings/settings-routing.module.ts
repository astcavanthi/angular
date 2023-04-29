import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { BranchComponent } from './branch/branch.component';
import { ReligionComponent} from "./religion/religion.component";

const routes: Routes = [

  {
    path: 'country',
    component: CountryComponent
  },
  {
    path: 'branch',
    component: BranchComponent
  },
  {
    path: 'religion',
    component: ReligionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
