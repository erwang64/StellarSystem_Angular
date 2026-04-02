import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsPage } from './systems-page';

describe('SystemsPage', () => {
  let component: SystemsPage;
  let fixture: ComponentFixture<SystemsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SystemsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
