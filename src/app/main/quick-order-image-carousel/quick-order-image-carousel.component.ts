import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GloveApiService } from 'src/app/shared/services/glove-api.service';


@Component({
  selector: 'quick-order-image-carousel',
  templateUrl: './quick-order-image-carousel.component.html',
  styleUrls: ['./quick-order-image-carousel.component.css']
})
export class QuickOrderImageCarouselComponent implements OnInit, AfterViewInit {

  constructor(private gloveApi:GloveApiService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }

}
