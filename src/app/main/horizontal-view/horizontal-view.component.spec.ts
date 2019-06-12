import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalViewComponent } from './horizontal-view.component';

describe('HorizontalViewComponent', () => {
  let component: HorizontalViewComponent;
  let fixture: ComponentFixture<HorizontalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
