import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractCubeComponent } from './interact-cube.component';

describe('InteractCubeComponent', () => {
  let component: InteractCubeComponent;
  let fixture: ComponentFixture<InteractCubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractCubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
