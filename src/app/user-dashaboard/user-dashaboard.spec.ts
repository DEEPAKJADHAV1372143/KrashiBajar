import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashaboard } from './user-dashaboard';

describe('UserDashaboard', () => {
  let component: UserDashaboard;
  let fixture: ComponentFixture<UserDashaboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDashaboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDashaboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
