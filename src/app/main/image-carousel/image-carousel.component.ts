import { Component,Input} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent{
  @Input() carouselImages;


  slideConfig = {"slidesToShow":1 , "slidesToScroll": 1, "swipeToslide":true};
  
  constructor(config:NgbCarouselConfig) {
    config.interval = null;
   }

}
