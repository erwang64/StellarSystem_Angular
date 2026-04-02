import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSystemForm } from './add-system-form';

describe('AddSystemForm', () => {
  let component: AddSystemForm;
  let fixture: ComponentFixture<AddSystemForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSystemForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AddSystemForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
