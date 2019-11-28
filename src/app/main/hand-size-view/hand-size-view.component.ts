import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { MatSnackBar } from '@angular/material';
import { GloveApi } from 'src/app/shared/lib/gloveApi';

@Component({
  selector: 'hand-size-view',
  templateUrl: './hand-size-view.component.html',
  styleUrls: ['./hand-size-view.component.css']
})
export class HandSizeViewComponent {
  @Input() hands;
  @ViewChild('handSize') carousel: NguCarousel<any>;

  public carouselTile: NguCarouselConfig =
  {
    grid: {xs: 1, sm: 1, md: 2, lg: 3, all: 0},
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

  constructor(private snackBar:MatSnackBar, private nysApi: GloveApi) { }


  setHandSize(label:string, attribute:string, value:string,formName:string){
    const id = label.toLowerCase(); 
    const htmlValue = {'id': attribute,'value': value}
    this.snackBar.open(`Glove opening adjusted for ${label.toUpperCase()} hands`,'DISMISS',{duration:2000})
    this.nysApi.setHandSize(id, htmlValue);
  }
}
