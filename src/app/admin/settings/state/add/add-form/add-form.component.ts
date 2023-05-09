import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StateService } from '../../state.service';
import { CountryService } from '../../../country/country.service';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject,Observable } from 'rxjs';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { State } from '../../state.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Country, CountryResponse } from '../../../country/country.model';
import {environment} from 'src/environments/environment';

export interface DialogData {
  id: number;
  action: string;
  state: State;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },CountryService],
})
export class AddStateFormComponent {
  action: string;
  dialogTitle: string;
  state: State;
  stateNew! : State ; // Temporarly stores
  stateForm: UntypedFormGroup;
  public countries$: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
   constructor(
    public httpClient : HttpClient,
    public dialogRef: MatDialogRef<AddStateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public stateService: StateService,
    public countryService : CountryService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit State';
      this.state = data.state;
    } else {
      this.dialogTitle = 'Add State';
      const blankObject = {} as State;
      this.state = new State(blankObject);
    }
    this.stateForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      name: [this.state.name, [Validators.required]],
      country:[this.state.country, [Validators.required]],
      code:[this.state.code, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.countryService.getCountries();
      this.countries$ = this.countryService.countries$;
   }

  public confirmAdd(): void {
    if(this.action === 'edit'){
      const blankObject = {} as State;
      this.stateNew = new State(blankObject);
      this.stateNew.id = this.state.id;
      this.stateNew.status=1;
      this.state = this.stateForm.getRawValue();
      this.stateNew.name = this.state.name;
      this.stateNew.code = this.state.code;
      this.stateNew.country = this.state.country;
      this.stateService.updateState(this.stateNew);
    }
    else
      this.stateService.addState(this.stateForm.getRawValue());
  }
}
