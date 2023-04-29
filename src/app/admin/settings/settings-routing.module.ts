import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { BranchComponent } from './branch/branch.component';
import { ReligionComponent} from "./religion/religion.component";
import { CasteComponent} from "./caste/caste.component";

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
  {
    path: 'caste',
    component: CasteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
