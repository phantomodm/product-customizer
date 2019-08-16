import { Component, OnInit, AfterViewInit } from '@angular/core';
//import { GloveApiService } from 'src/app/shared/services/glove-api.service';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'quick-order-image-carousel',
  templateUrl: './quick-order-image-carousel.component.html',
  styleUrls: ['./quick-order-image-carousel.component.css'],
  providers: [NgbCarouselConfig]
})
export class QuickOrderImageCarouselComponent implements OnInit, AfterViewInit {

  constructor(config: NgbCarouselConfig) {
    config.showNavigationArrows = false
   }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }

}
