import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostroomfinderComponent } from './postroomfinder.component';

describe('PostroomfinderComponent', () => {
  let component: PostroomfinderComponent;
  let fixture: ComponentFixture<PostroomfinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostroomfinderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostroomfinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
