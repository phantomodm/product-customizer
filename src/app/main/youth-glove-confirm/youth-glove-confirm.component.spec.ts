import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouthGloveConfirmComponent } from './youth-glove-confirm.component';

describe('YouthGloveConfirmComponent', () => {
  let component: YouthGloveConfirmComponent;
  let fixture: ComponentFixture<YouthGloveConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YouthGloveConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YouthGloveConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
