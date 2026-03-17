import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashaboard } from './admin-dashaboard';

describe('AdminDashaboard', () => {
  let component: AdminDashaboard;
  let fixture: ComponentFixture<AdminDashaboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashaboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashaboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
