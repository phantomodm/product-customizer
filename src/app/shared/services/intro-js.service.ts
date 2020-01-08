import { Injectable } from '@angular/core';
import * as introJs from 'intro.js/intro.js';


@Injectable({
  providedIn: 'root'
})
export class IntroJsService {

  introJs = introJs()

  constructor() {
    this.introJs.setOptions({
      steps: [
        { 
          element: '#guide',
          intro: `Welcome to 9P Glove Customizer. Customizing a 9P custom glove is simple and fun. 
          This short tour will guide on how to use our tool to customize your order.`
        },
        {
          element: '#logo',
          intro: "Designing your glove is so simple. First, click any button on the glove canvas."
        },
        {
          element: '#slider-control',
          intro: `Use the color slider to update glove images.`,
          position: 'left'
        },
        {
          element: '#wst',
          intro: "Click a different button on the glove canvas to customize a different glove part.",
          position: 'bottom'
        },
        {
          element: ('span.carousel-control-next-icon'),
          intro: 'Click on navigation carets to change glove view and continue customization.'
        },
        {
          intro:`Isn't this a cool tool? Enjoy designing your glove.`
        }
      ]
    });
  
  }

  startIntro(){
    this.introJs.start()
  }
}
