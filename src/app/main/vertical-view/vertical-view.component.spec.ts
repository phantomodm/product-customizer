import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalViewComponent } from './vertical-view.component';

describe('VerticalViewComponent', () => {
  let component: VerticalViewComponent;
  let fixture: ComponentFixture<VerticalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
