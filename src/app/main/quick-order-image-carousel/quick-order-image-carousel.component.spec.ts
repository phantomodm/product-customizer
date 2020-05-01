import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickOrderImageCarouselComponent } from './quick-order-image-carousel.component';

describe('QuickOrderImageCarouselComponent', () => {
  let component: QuickOrderImageCarouselComponent;
  let fixture: ComponentFixture<QuickOrderImageCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickOrderImageCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOrderImageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
