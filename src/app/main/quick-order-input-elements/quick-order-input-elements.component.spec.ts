import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickOrderInputElementsComponent } from './quick-order-input-elements.component';

describe('QuickOrderInputElementsComponent', () => {
  let component: QuickOrderInputElementsComponent;
  let fixture: ComponentFixture<QuickOrderInputElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickOrderInputElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOrderInputElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
