import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerDashaboard } from './farmer-dashaboard';

describe('FarmerDashaboard', () => {
  let component: FarmerDashaboard;
  let fixture: ComponentFixture<FarmerDashaboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerDashaboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerDashaboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
