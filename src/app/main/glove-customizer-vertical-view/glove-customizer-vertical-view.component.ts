import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { IntroJsService } from 'src/app/shared/services/intro-js.service';

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

  constructor(config: NgbCarouselConfig, private intro: IntroJsService) {
    config.interval = null;
    config.showNavigationArrows = true;
    config.showNavigationIndicators = false;

  }

  ngOnInit() {
    
  }

  startIntro(){
    setTimeout(() => {
      this.intro.startIntro();
    }, 3000);
  }


}
