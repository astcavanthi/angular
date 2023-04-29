import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormalsComponent } from './add-form.component';

describe('AddaFormComponent', () => {
  let component: AddFormalsComponent;
  let fixture: ComponentFixture<AddFormalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFormalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFormalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
