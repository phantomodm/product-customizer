import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'quick-order-image-carousel',
  templateUrl: './quick-order-image-carousel.component.html',
  styleUrls: ['./quick-order-image-carousel.component.css'],
  providers: [NgbCarouselConfig]
})
export class QuickOrderImageCarouselComponent implements OnInit {
  showNavigationArrows = true;
  constructor(config: NgbCarouselConfig) {
    config.showNavigationArrows = true;
   }

  ngOnInit(): void {
  }

}
