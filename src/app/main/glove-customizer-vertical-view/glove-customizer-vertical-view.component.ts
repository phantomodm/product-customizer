import { Component, OnInit, Input } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'glove-customizer-vertical-view',
  templateUrl: './glove-customizer-vertical-view.component.html',
  styleUrls: ['./glove-customizer-vertical-view.component.css']
})
export class GloveCustomizerVerticalViewComponent implements OnInit {

  @Input() showNavigationIndicators;
  @Input() showNavigationArrows;  
  @Input() question;

  constructor(config: NgbCarouselConfig) {
    config.interval = null;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
   }

  ngOnInit() {
    console.log("vert")
  }


}
