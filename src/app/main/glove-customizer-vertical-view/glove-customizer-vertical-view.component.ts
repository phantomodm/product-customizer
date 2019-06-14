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

  public carouselTile =
  {
    grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
    slide: 2,
    speed: 400,
    animation: 'lazy',
    loop: true,
    point: {
      visible: true
    },
    load: 2,
    touch: true,
    easing: 'ease'
  }

  constructor(config: NgbCarouselConfig) {
    config.interval = null;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
   }

  ngOnInit() {
    console.log("vert")
  }


}
