import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { BranchComponent } from './branch/branch.component';
import { ReligionComponent} from "./religion/religion.component";
import { CasteComponent} from "./caste/caste.component";
import { OccupationComponent } from "./occupation/occupation.component";
import { EducationdetailsComponent } from "./educationdetails/educationdetails.component";
import {LanguagesComponent} from "./languages/languages.component";
import {SourceComponent} from "./source/source.component";
import {StateComponent} from "./state/state.component";
import { DistrictComponent } from './district/district.component';
import { CityComponent } from './city/city.component';

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
  {
    path: 'occupation',
    component: OccupationComponent
  },
  {
    path: 'education',
    component: EducationdetailsComponent
  },
  {
    path: 'language',
    component: LanguagesComponent
  },
  {
    path: 'source',
    component: SourceComponent
  },
  {
    path: 'state',
    component: StateComponent
  },
  {
    path: 'district',
    component: DistrictComponent
  },
  {
    path: 'city',
    component: CityComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
