import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'glove-customizer-horizontal-view',
  templateUrl: './glove-customizer-horizontal-view.component.html',
  styleUrls: ['./glove-customizer-horizontal-view.component.css']
})
export class GloveCustomizerHorizontalViewComponent implements OnInit {
  @Input() slideConfig;
  @Input() showNavigationIndicators;
  @Input() showNavigationArrows;
  @Input() question;

  constructor(config: NgbCarouselConfig) {
    config.interval = null;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
  }

  ngOnInit() {
    console.log("horiz")
  }


}
