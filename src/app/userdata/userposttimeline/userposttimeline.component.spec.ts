import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserposttimelineComponent } from './userposttimeline.component';

describe('UserposttimelineComponent', () => {
  let component: UserposttimelineComponent;
  let fixture: ComponentFixture<UserposttimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserposttimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserposttimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
