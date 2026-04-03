import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSystemForm } from './edit-system-form';

describe('EditSystemForm', () => {
  let component: EditSystemForm;
  let fixture: ComponentFixture<EditSystemForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSystemForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EditSystemForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
