import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridMapComponent } from './grid-map.component';

describe('GridMapComponent', () => {
  let component: GridMapComponent;
  let fixture: ComponentFixture<GridMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
