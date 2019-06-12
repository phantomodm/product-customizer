import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NguCarousel } from '@ngu/carousel';

@Component({
  selector: 'glove-customizer-horizontal-view',
  templateUrl: './glove-customizer-horizontal-view.component.html',
  styleUrls: ['./glove-customizer-horizontal-view.component.css'],
  providers: [NgbCarouselConfig]
})
export class GloveCustomizerHorizontalViewComponent implements OnInit {
  @Input() slideConfig;
  @Input() showNavigationIndicators;
  @Input() showNavigationArrows;
  @Input() question;

  @ViewChild('horizontalGloveCustomizer') carousel: NguCarousel<any>;

  
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
  }

  ngOnInit() {
    console.log("horiz")
  }


}
