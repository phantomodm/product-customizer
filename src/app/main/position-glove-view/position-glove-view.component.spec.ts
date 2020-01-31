import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionGloveViewComponent } from './position-glove-view.component';

describe('PositionGloveViewComponent', () => {
  let component: PositionGloveViewComponent;
  let fixture: ComponentFixture<PositionGloveViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionGloveViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionGloveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
