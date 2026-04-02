import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnctionTest } from './connction-test';

describe('ConnctionTest', () => {
  let component: ConnctionTest;
  let fixture: ComponentFixture<ConnctionTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnctionTest],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnctionTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
