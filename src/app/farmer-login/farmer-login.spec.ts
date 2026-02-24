import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerLogin } from './farmer-login';

describe('FarmerLogin', () => {
  let component: FarmerLogin;
  let fixture: ComponentFixture<FarmerLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
