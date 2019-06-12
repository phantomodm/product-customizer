import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GloveCarouselViewComponent } from './glove-carousel-view.component';

describe('GloveCarouselViewComponent', () => {
  let component: GloveCarouselViewComponent;
  let fixture: ComponentFixture<GloveCarouselViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GloveCarouselViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GloveCarouselViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
