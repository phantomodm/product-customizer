import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandSizeViewComponent } from './hand-size-view.component';

describe('HandSizeViewComponent', () => {
  let component: HandSizeViewComponent;
  let fixture: ComponentFixture<HandSizeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandSizeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandSizeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
