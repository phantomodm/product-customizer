import { Component, OnInit, Input, ViewChild, HostListener, OnDestroy  } from '@angular/core';
import { GloveApi } from 'src/app/shared/lib/gloveApi';
import { Observable, Subject} from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatStep, MatSnackBar, MatSnackBarConfig, MatSlider} from '@angular/material';
import * as _ from 'lodash';
import { takeUntil, take } from 'rxjs/operators';
import { GloveSlider, HtmlInputValue, Sliders, Sliders2 } from 'src/app/shared/models/nine-positions-models';
import { GloveDataService } from 'src/app/shared/services/gloveData';
import { embroiderySliderData } from 'src/app/shared/data/api-data';
import { Options, LabelType, CustomStepDefinition } from 'ng5-slider';
import { GloveSize } from 'src/app/shared/models/nine-positions-models';
import { IntroJsService } from 'src/app/shared/services/intro-js.service';

declare var jQuery: any;

@Component({
  selector: 'vertical-view',
  templateUrl: './vertical-view.component.html',
  styleUrls: ['./vertical-view.component.css']
})
export class VerticalViewComponent implements OnInit , OnDestroy {
  private unsubscribe$ = new Subject<boolean>();
  errorNotifier: any;

  @Input('') sliderStatus;
  @Input('nysWizardSteps') wizardPrompts;
  @Input('gloveWebs') filteredGloveWebs;
  @ViewChild('verticalMenu1') stepper;
  @ViewChild('verticalSubMenu2') stepper2;
  @ViewChild('customTool') customTool: MatStep;
  @ViewChild('gloveSliderCustom') gloveSliderCustom:MatSlider;
  @ViewChild('gloveSliderEmbroidery') gloveSliderEmbroidery:MatSlider;
  @ViewChild('gloveSliderSignature') gloveSliderSignature:MatSlider;

  //**Misc */
  customPartsValue$: Observable<any>;
  customPartsValue = [];

  //** Form Properties */
  verticalForm: FormGroup;
  formFields = {};
  formStatus: any;
  vStep: MatStep;

  //**Carousel Indicators */
  showNavigationIndicators = false;
  showNavigationArrows = false;

  //** Filtered images array */
  filteredImages: Observable<Array<any>>;

 //**Template properties */
  slideConfig = {"slidesToShow": 2, "slidesToScroll": 2, "swipeToslide":true};
  imgSlideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "swipeToslide":true};

 //** properties and functions to manage Ng5-slider*/
  displayValue: string;
  filteredDataSlider: GloveSlider[] = [];
  gloveDataSlider: GloveSlider[];
  gloveEmbDataSlider = [];
  gloveEmbroiderySlider: string[];
  gloveCustomSlider = [];
  gloveSizeSlider: Sliders;
  amGloveSlider: Sliders2 = {};
  amEmbGloveSlider: Sliders2 = {};

  gloveSlider: Options;
  embroiderySlider: Options;
  value: number;
  valueEmbroidery: number;
  snackbarDuration = {'duration': 900}

  // End Slider properties declaration */

  //** Step 1 SectionII Glove Size Content */
  glove: GloveSize = {
    size: '',
  }
  currentGloveType: string;
  currentGloveContent: GloveSize[] = []
  filteredGloveContent: GloveSize[] = []
  gloveSizeContent: any;
  handSizeImg: string;
  userGuide: boolean;
  


  constructor(private fb:FormBuilder,
              private snackBar:MatSnackBar,
              private nysApi: GloveApi,
              private gloveData: GloveDataService,
              private intro: IntroJsService ) {

              }

  ngOnInit() {
    this.gloveSlider = {
      stepsArray: []
    }

    this.embroiderySlider = {
      stepsArray: []
    }
    
    this.gloveSizeSlider = this.nysApi.customGloveData.slider;
    this.gloveData.getGloveSliderColors().pipe(take(1),takeUntil(this.unsubscribe$)).subscribe(
      (res:GloveSlider[]) => {
        this.gloveDataSlider = this.filteredDataSlider = res;
        console.log(this.gloveDataSlider)
        
        this.amGloveSlider = {
          min: "0",
          max: "25",
          vertical: false,
          thumbLabel: true,
          value: 0,
          step: 1,
          tickInterval: 5
        }

        this.amEmbGloveSlider = {
          min: "0",
          max: "25",
          vertical: false,
          thumbLabel: true,
          value: 0,
          step: 1,
          tickInterval: 5
        }
        
        _.filter(this.gloveDataSlider,(f)=>{
          if(f.embroidery == true){
            this.gloveEmbDataSlider.push(f.value)
          }           
        })
        this.amEmbGloveSlider.max = (this.gloveEmbDataSlider.length - 1 ).toString();
      }
    )

    this.nysApi.currentLeatherType$.subscribe(res => {
      var filter = []
      switch (res) {
        case "steer":
        case "jkip":
        case "kip":
          _.filter(this.gloveDataSlider,(f)=>{
            _.find(f.leather,leather => {
              if( leather == res ){            
                filter.push(f.value)
              }
            })
          })
          this.filteredDataSlider = filter;
          this.amGloveSlider.max = (this.filteredDataSlider.length  - 1).toString();
          break;
        default:
          break;
      }
    })

    this.errorNotifier = this.nysApi.notifyObservables$.pipe(takeUntil(this.unsubscribe$)).subscribe((res)=>{
      if(res.hasOwnProperty('option')){
        switch (res.option) {
          case 'Glove Customizer':
            this.errorSnackBar(res);
            break;
          default:
            break;
        }
      }
    })

    this.gloveData.getGloveSizeContent().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {this.currentGloveContent = this.filteredGloveContent = res})
    this.formFields = this.nysApi.getFormValues();
    this.verticalForm = this.fb.group(this.formFields);
  }

  autoStartIntroJs(){
    if(this.userGuide != true){
      this.intro.startIntro()
      this.userGuide = true;
    }
  }

  //** Advance to next step of master stepper */
  nextStep(){
    this.stepper.next();
  }

  errorSnackBar(data){
    let config = new MatSnackBarConfig();
    config.duration = 500
    config.panelClass = ['.customizehelp']
    this.snackBar.open(data.value,'CLOSE',config)
    //console.log(config)
  }

  setGloveContent(){
    this.nysApi.currentGloveType$.subscribe(
      (res:any) => {
        if(res != undefined){
          var filter = [];
          _.filter(this.currentGloveContent, (f)=>{
            _.find(f.content, (value,key) => {
              if(key == res){
                filter.push(f);
              }
            })
          })

          this.filteredGloveContent = filter;
        } else {
          return false;
        }

      }
    )
  }

  filterGloveSizeFilter(size:string){
    const gloveSize = size;
    _.find(this.filteredGloveContent, (r) =>{
      if(gloveSize !== r.size){
        return false;
      } else {
        _.find(r.content,(value, key)=>{
          if(key !== this.currentGloveType){
            //console.log(key, this.currentGloveType)
            return false;
          } else {
            this.glove.content = value;
          }
        })
      }

      switch (gloveSize) {
        case "10.75":
        case "12.25":
        case "12.75":
            this.glove.size = "";
            this.glove.content = `We currently do not have a ${gloveSize}" glove pattern.`;
        default:

          break;
      }
    })
  }

  setGloveHand(attributeId:string, value:string, valueString:string,){
    const name = valueString.toLowerCase();
    const htmlValue:HtmlInputValue = {'id': attributeId,'value': value}
    switch (name) {
      case "left":
        this.snackBar.open("You throw with LEFT",'DISMISS',this.snackbarDuration)
        break;
      default:
        this.snackBar.open("You throw with RIGHT.",'DISMISS',this.snackbarDuration)
        break;
    }
    this.nysApi.setGloveHand(name, htmlValue);
  }

  setGlovePersonalization(event: string, formValue:string, attribute:string,){
    let htmlValue;
    if(attribute != undefined){
      htmlValue = {'id': attribute,'value':formValue}
    } else {
      htmlValue = {'id':"pa_personalization-embroidery", 'value': formValue}
    }
    this.nysApi.applyHtmlInput(htmlValue);
    this.snackBar.open( `Personalization color ${event} selected.`,'DISMISS',this.snackbarDuration )
  }

  setGloveOptions(event: string, formValue:string, attribute:string, menuName?: string, control?:string){
    
    let htmlValue;
    htmlValue = {'id': attribute,'value':formValue.toLowerCase()}
    this.nysApi.setWorkFlowValidity(menuName,control);
    this.nysApi.applyHtmlInput(htmlValue);

    switch (event) {
      case "Softball":
      case "Baseball":
        this.snackBar.open(event + " model selected.", 'DISMISS',this.snackbarDuration )
        break;
      case "No Pad":
      case "Thin Pad":
        this.snackBar.open(event + " is required in palm.",'DISMISS',this.snackbarDuration )
        break;
      case "Block Font":
      case "Script Font":
        this.snackBar.open(event + " embroidery selected.",'DISMISS',this.snackbarDuration )
        break;
      case "Yes":
        this.snackBar.open(" Glove will be softened.",'DISMISS',this.snackbarDuration )
        break;
      case "No":
        this.snackBar.open(" Glove will be stiff.",'DISMISS',this.snackbarDuration )
        break;
      default:
        //
        break;
    }
  }

  setGloveSeries(event: string, value:string, attributeName: string, menuName:string, control:string){
    console.log(event)
    const htmlValue = {'id':attributeName,'value': value}
    let eventFilter
    if(control == "sportPlayed"){
      this.snackBar.open(event + " model selected.",'DISMISS',this.snackbarDuration)
    } else {
      eventFilter = event.split('(').pop().slice(0);

      switch(eventFilter){
        case "Rise Series":
        case "Elite Steerhide":
        case "Elite Kip":
        this.snackBar.open(`${eventFilter} series selected.`,'DISMISS', this.snackbarDuration)
        break;
        default:
        this.snackBar.open("Cowhide selected.",'DISMISS', this.snackbarDuration)
      }
    }

    this.nysApi.customGloveData.gloveSeries.series = _.lowerCase(eventFilter);
    this.nysApi.setGloveSeries(_.lowerCase(event), value);
    this.nysApi.applyHtmlInput(htmlValue);
    this.nysApi.setWorkFlowValidity(menuName, control);
  }

  //** Set glove size choice from frontend and snackbar confirmation bar*/
  setGloveSize(event:any){
    let id = event.value.toString();
    (id.length == 2) ? id += '.00'
      : (id.length == 4) ? id += '0'
      : null;
    this.snackBar.open(id + "\" inch glove was selected.",'DISMISS',this.snackbarDuration)
    this.glove.size = `${id}`;
    this.glove.content = '';
    this.filterGloveSizeFilter(id);
    this.nysApi.setGloveSize(id);
  }

  //** Set position choice from frontend and snackbar confirmation bar*/
  // setGloveType(shortName:string, name:string, attributeId:string, value:string, control:string, menuForm:string, img?:string){
  setGloveType(position:{gloveSizeImg:string, gloveType:string, gloveShortName:string,value:string, attribute:string, menu:string, formControl:string}){
      this.setGloveContent();
      this.setGloveOptions(position.gloveShortName, position.value, position.attribute, position.menu, position.formControl)
      this.nysApi.setPosition(position.gloveShortName)
      this.handSizeImg = position.gloveSizeImg;
      this.currentGloveType = position.gloveType.toLowerCase();
  }

  //** Function executed by mat-stepper Output(selectionChange) emitter to track subMenu steps completed */
  setMenuStatus(input:any, menu:string){
    let counter = 0;
    let stepLength = input.length - 1;

    _.forEach(input,(s)=>{
      if(!s.interacted){
      } else {
        counter+=1;
        if(counter != stepLength){
          //console.log('SubMenu steps are not complete')
        } else {
          //console.log('All required subMenu steps interacted')
          this.nysApi.setWizardStatus(menu,true);
        }
      }
    })
  }

  verifySubMenuCompletion(subMenu:string): boolean{
    return this.nysApi.getWizardStatus(subMenu);
  }

  //**Function call from click event from custom glove slider */
  leatherSliderSelections(event:number){
    const index = event;
    if(index != undefined){
      this.nysApi.setGloveCanvas(this.nysApi.indexToValue(index,this.gloveCustomSlider));
    } else {
      alert("Select a glove part before selecting a color")
    }

  }

  embroiderySliderSelections(event:number){
    const index = event;
    //console.log(index)
    if(index != undefined){
      this.nysApi.setGloveCanvas(this.nysApi.indexToValue(index,this.gloveCustomSlider));
    } else {
      alert("Select a glove part before selecting a color")
    }
    //this.nysApi.setGloveCanvas(this.nysApi.indexToValue(index,this.gloveEmbroiderySlider));
  }

  onGloveSliderChange(query = false){
    let color = this.nysApi.indexToValue(+this.gloveSliderCustom.displayValue, this.filteredDataSlider)

    switch (color) {
      case "Lemon Yellow":
        jQuery('.glove-slider .mat-slider-thumb-label-text').text("L. Yellow")
        break;
      case "Forest Green":
        jQuery('.glove-slider .mat-slider-thumb-label-text').text("F. Green")
        break;    
      default:
        jQuery('.glove-slider .mat-slider-thumb-label-text').text(color)
        break;
    }
    console.log(color)
    if (query == false){
      if(color.toLowerCase() === "navy"){
        this.nysApi.setGloveCanvas("navy blue")
      } else {
        this.nysApi.setGloveCanvas(color);
      }      
    }
    
  }

  onEmbroiderySliderChange(query=false){
    let color = this.nysApi.indexToValue(+this.gloveSliderEmbroidery.displayValue, this.gloveEmbDataSlider)
    console.log(this.gloveSliderEmbroidery.displayValue)
    switch (color) {
      case "Yellow Gold":
        jQuery('.embroidery-slider .mat-slider-thumb-label-text').text("Y. Gold")
        break;
      case "Neon Green":
        jQuery('.embroidery-slider .mat-slider-thumb-label-text').text("Neon")
        break;
      case "Forest Green":
        jQuery('.embroidery-slider .mat-slider-thumb-label-text').text("F. Green")
        break;
      default:
        jQuery('.embroidery-slider .mat-slider-thumb-label-text').text(color)
        break;
    }

    if (query == false){
      if(color.toLowerCase() === "navy"){
        this.nysApi.setGloveCanvas("navy blue")
      } else {
        this.nysApi.setGloveCanvas(color);
      }      
    }
  }

  onSignatureChange(payload, query = false ){
    let color = this.nysApi.indexToValue(+this.gloveSliderSignature.displayValue, this.gloveEmbDataSlider)
    switch (color) {
      case "Yellow Gold":
        jQuery('.signature-slider .mat-slider-thumb-label-text').text("Y. Gold")
        break;
      case "Neon Green":
        jQuery('.signature-slider .mat-slider-thumb-label-text').text("Neon")
        break;
      case "Forest Green":
        jQuery('.signature-slider .mat-slider-thumb-label-text').text("F. Green")
        break;    
      default:
        jQuery('.signature-slider .mat-slider-thumb-label-text').text(color)
        break;
    }
    
    if (query == false){
      _.forEach(payload,(p)=>{
        _.forEach(p,(value,key)=>{
          if ( value == color ){
            this.nysApi.applyHtmlInput({'id':"pa_personalization-embroidery",'value': p.value });
            console.log(p.value)
          } else if ( ( color == "Navy" ) && _.includes( p.valueString, color ) ) {
            this.nysApi.applyHtmlInput({'id':"pa_personalization-embroidery",'value': p.value });
            console.log(p.value)
          }
        })
      })
    }
 
  }

  onSubmit(){
    const submit = jQuery('.single_add_to_cart_button').removeClass('disabled').click();
  }

  @HostListener('window:beforeunload',['$event'])
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
