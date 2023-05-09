import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatMenuModule } from '@angular/material/menu';

import { SettingsRoutingModule } from './settings-routing.module';
import { CountryComponent } from './country/country.component';
import { AddFormComponent } from './country/add/add-form/add-form.component';
import { CountryService } from './country/country.service';

import { BranchComponent } from './branch/branch.component';
import { AddBranchFormComponent } from './branch/add/add-form/add-form.component';
import { BranchService } from './branch/branch.service';

import { ReligionComponent } from './religion/religion.component';
import { AddReligionFormComponent } from './religion/add/add-form/add-form.component';
import { ReligionService } from './religion/religion.service';

import { CasteComponent} from "./caste/caste.component";
import {AddCasteFormComponent} from './caste/add/add-form/add-form.component';
import {CasteService} from "./caste/caste.service";

import { OccupationComponent } from './occupation/occupation.component';
import {OccupationService} from "./occupation/occupation.service";
import {AddOccupationFormComponent} from './occupation/add/add-form/add-form.component';

import { EducationdetailsComponent } from './educationdetails/educationdetails.component';
import {EducationdetailsService} from "./educationdetails/educationdetails.service";
import {AddEducationdetailsFormComponent} from "./educationdetails/add/add-form/add-form.component";

import { LanguagesComponent } from './languages/languages.component';
import {LanguagesService} from "./languages/languages.service";
import {AddLanguageFormComponent} from "./languages/add/add-form/add-form.component";

import {SourceComponent} from "./source/source.component";
import {SourceService} from "./source/source.service";
import {AddSourceFormComponent} from "./source/add/add-form/add-form.component";

import {StateComponent} from "./state/state.component";
import {StateService} from "./state/state.service";
import {AddStateFormComponent} from "./state/add/add-form/add-form.component";

import { DistrictComponent } from './district/district.component';
import { DistrictService } from './district/district.service';
import { AddDistrictFormComponent } from './district/add/add-form/add-form.component';

import { CityComponent } from './city/city.component';
import { CityService } from './city/city.service';
import { AddCityFormComponent } from './city/add/add-form/add-form.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from './../../shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [

    CountryComponent,
    AddFormComponent,
    BranchComponent,
    AddBranchFormComponent,
    ReligionComponent,
    AddReligionFormComponent,
    CasteComponent,
    AddCasteFormComponent,
    OccupationComponent,
    AddOccupationFormComponent,
    EducationdetailsComponent,
    AddEducationdetailsFormComponent,
    LanguagesComponent,
    AddLanguageFormComponent,
    SourceComponent,
    AddSourceFormComponent,
    StateComponent,
    AddStateFormComponent,
    DistrictComponent,
    AddDistrictFormComponent,
    CityComponent,
    AddCityFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMenuModule,
    MatTooltipModule,

    SettingsRoutingModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [
    {provide:CountryService},
    {provide:BranchService},
    {provide:ReligionService},
    {provide:CasteService},
    {provide:OccupationService},
    {provide:EducationdetailsService},
    {provide:LanguagesService},
    {provide:SourceService},
    {provide:StateService},
    {provide:DistrictService},
    {provide:CityService}
    /*CountryService,
              BranchService*/],
})
export class SettingsModule {}
