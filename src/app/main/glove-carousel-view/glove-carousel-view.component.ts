import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { GloveApi } from 'src/app/shared/lib/gloveApi';

@Component({
  selector: 'glove-carousel-view',
  templateUrl: './glove-carousel-view.component.html',
  styleUrls: ['./glove-carousel-view.component.css']
})

export class GloveCarouselViewComponent implements OnInit {
  @ViewChild('gloveCarousel') carousel: NguCarousel<any>;

  
  public carouselTile: NguCarouselConfig =
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
  filteredGloveImages: any[];

  constructor(private nysApi: GloveApi, private cdr: ChangeDetectorRef,) { }

  ngOnInit() {
    this.nysApi.imageFilter$.subscribe((res)=>{
      if(!res){
        return false;
      } else {
        console.log(res)
        this.filteredGloveImages = res;
        this.cdr.detectChanges();
      }
    })
  }

}
