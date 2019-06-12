import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GloveCustomizerHorizontalViewComponent } from './glove-customizer-horizontal-view.component';

describe('GloveCustomizerHorizontalViewComponent', () => {
  let component: GloveCustomizerHorizontalViewComponent;
  let fixture: ComponentFixture<GloveCustomizerHorizontalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GloveCustomizerHorizontalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GloveCustomizerHorizontalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
