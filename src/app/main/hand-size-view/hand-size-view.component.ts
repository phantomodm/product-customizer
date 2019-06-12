import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { MatSnackBar } from '@angular/material';
import { GloveApi } from 'src/app/shared/lib/gloveApi';

@Component({
  selector: 'hand-size-view',
  templateUrl: './hand-size-view.component.html',
  styleUrls: ['./hand-size-view.component.css']
})
export class HandSizeViewComponent implements OnInit {
  @Input() hands;
  @ViewChild('handSize') carousel: NguCarousel<any>;

  public carouselTile: NguCarouselConfig =
  {
    grid: {xs: 1, sm: 2, md: 2, lg: 3, all: 0},
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

  ngOnInit() {

  }

  setGloveHand(event){
    const id = event.target.parentElement.id;
    switch (id) {
      case "leftHand":
        this.snackBar.open("You wear your glove on LEFT",'DISMISS',{duration:2000})
        break;    
      default:
        this.snackBar.open("You wear your glove on RIGHT",'DISMISS',{duration:2000})
        break;
    }
    this.nysApi.setGloveHand(id);
  }

  setHandSize(label:string,value:string,formName:string){
    const id = label;
    console.log(id)
    switch (id) {
      case "small":
      this.snackBar.open("Glove opening adjusted for SMALL hands",'DISMISS',{duration:2000})
        break;
      case "average":
      this.snackBar.open("Glove opening adjusted for AVERAGE hands",'DISMISS',{duration:2000})
        break;
      case "large":
      this.snackBar.open("Glove opening adjusted for LARGE hands",'DISMISS',{duration:2000})
        break;
      default:
        break;
    }
    this.nysApi.setHandSize(id);
  }
}
