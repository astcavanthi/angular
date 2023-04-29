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
    AddReligionFormComponent
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
    /*CountryService,
              BranchService*/],
})
export class SettingsModule {}
