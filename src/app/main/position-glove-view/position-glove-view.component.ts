import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { MatSnackBar } from '@angular/material';
import { GloveApi } from 'src/app/shared/lib/gloveApi';

@Component({
  selector: 'position-glove-view',
  templateUrl: './position-glove-view.component.html',
  styleUrls: ['./position-glove-view.component.css']
})
export class PositionGloveViewComponent implements OnInit {
  @Input() positions;
  @Input() formControl;
  @Output() gloveData = new EventEmitter<{}>();
  @ViewChild('positions') carousel: NguCarousel<any>;
  snackbarDuration = {'duration': 900}

  public carouselTile: NguCarouselConfig =
  {
    grid: {xs: 1, sm: 1, md: 2, lg: 2, all: 0},
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

   //** Set position choice from frontend and snackbar confirmation bar*/
   setGloveType(shortName:string, name:string, attributeId:string, value:string, control:string, menuForm:string, img?:string){
    //this.setGloveContent();
    if (control == undefined){
      control = "gloveType";
    }
    let glove = shortName;
    const inputAttribute = attributeId;
    this.snackBar.open(`${name} glove was selected`,'DISMISS',this.snackbarDuration)
    //this.setGloveOptions(glove, value, inputAttribute ,menuForm, control);
    this.nysApi.setPosition(glove);
    this.gloveData
      .emit({gloveSizeImg: img, 
            gloveType: name.toLowerCase(),
            gloveShortName: glove,
            value: value,
            attribute: inputAttribute,
            menu: menuForm,
            formControl: control
      })


  }


}
