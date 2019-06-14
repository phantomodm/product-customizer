import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalWebViewComponent } from './vertical-web-view.component';

describe('VerticalWebViewComponent', () => {
  let component: VerticalWebViewComponent;
  let fixture: ComponentFixture<VerticalWebViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalWebViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalWebViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
