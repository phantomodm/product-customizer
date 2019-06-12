import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GloveCustomizerVerticalViewComponent } from './glove-customizer-vertical-view.component';

describe('GloveCustomizerVerticalViewComponent', () => {
  let component: GloveCustomizerVerticalViewComponent;
  let fixture: ComponentFixture<GloveCustomizerVerticalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GloveCustomizerVerticalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GloveCustomizerVerticalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
