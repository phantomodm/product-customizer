import { Component, OnInit, Input, Output, EventEmitter, ViewChild  } from '@angular/core';
import { GloveApi } from 'src/app/shared/lib/gloveApi';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatStep, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import * as _ from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { GloveSlider, HtmlInputValue } from 'src/app/shared/models/nine-positions-models';
import { GloveDataService } from 'src/app/shared/services/gloveData';
import { embroiderySliderData } from 'src/app/shared/data/api-data';
import { Options, LabelType, CustomStepDefinition } from 'ng5-slider';
import { GloveSize } from 'src/app/shared/models/nine-positions-models';
import { IntroJsService } from 'src/app/shared/services/intro-js.service';



@Component({
  selector: 'vertical-view',
  templateUrl: './vertical-view.component.html',
  styleUrls: ['./vertical-view.component.css']
})
export class VerticalViewComponent implements OnInit  {
  private unsubscribe$ = new Subject<void>();
  errorNotifier: any;


  @Input('') sliderStatus;
  @Input('nysWizardSteps') wizardPrompts;
  @Input('gloveWebs') filteredGloveWebs;
  @ViewChild('verticalMenu1') stepper;
  @ViewChild('verticalSubMenu2') stepper2;
  @ViewChild('customTool') customTool: MatStep;

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
  subscripiton;

  //** Filtered images array */
  filteredImages: Observable<Array<any>>;

 //**Template properties */
  slideConfig = {"slidesToShow": 2, "slidesToScroll": 2, "swipeToslide":true};
  imgSlideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "swipeToslide":true};

 //** properties and functions to manage Ng5-slider*/ 
  filteredDataSlider: GloveSlider[] = [];
  gloveDataSlider: GloveSlider[];
  gloveEmbroiderySlider: string[];
  gloveCustomSlider = [];
  gloveSizeSlider = {}

  gloveSlider: Options;
  embroiderySlider: Options;
  value: number;
  valueEmbroidery: number;
  
  // End Slider properties declaration */

  //** */
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
              private intro: IntroJsService ) {}

  ngOnInit() {
    this.gloveSlider = {
      stepsArray: []
    }

    this.embroiderySlider = {
      stepsArray: []
    }

    

    this.gloveSizeSlider = this.nysApi.customGloveData.slider;
    this.gloveData.getGloveSliderColors().pipe(takeUntil(this.unsubscribe$)).subscribe(
      (res:GloveSlider[]) => {        
        this.gloveDataSlider = this.filteredDataSlider = res;        
        this.leatherSliderColors(this.gloveDataSlider);
        this.embSliderColors(embroiderySliderData)
      }
    )
    this.errorNotifier = this.nysApi.notifyObservables$.pipe(takeUntil(this.unsubscribe$)).subscribe((res)=>{
      if(res.hasOwnProperty('option')){
        switch (res.option) {
          case 'Glove Customizer':
            this.open(res);
            //this.snackBar.open(res.value,'CLOSE',{panelClass:'customizehelp' ,duration:2000})
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

  //** Forgotten Function */
  
  tobedetermined(){
    this.customPartsValue$ = this.gloveData.getCustomParts();
    this.customPartsValue$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      val => _.forEach(val,(v)=>{
        this.customPartsValue.push(v);
      })
      
    );
  }

  autoStartIntroJs(){
    if(this.userGuide != true){
      this.intro.startIntro()
      this.userGuide = true; 
    }    
  }

  initilizeGloveSlider(){
    this.leatherSliderColors(this.filteredDataSlider);
    this.embSliderColors(embroiderySliderData);
  }

  //**Glove Leather Slider */
  leatherSliderColors(db:GloveSlider[]){    
    this.gloveCustomSlider = _.map(db, 'value');
    this.value = this.nysApi.valueToIndex("Start", this.gloveCustomSlider);
    
    this.gloveSlider = {
      floor:0,
      ceil:0,
      showSelectionBar: true,
      stepsArray: this.gloveCustomSlider.map((color:string):CustomStepDefinition => {
      return { value: this.nysApi.valueToIndex(color,this.gloveCustomSlider) };
      }),
      translate: (value: number, label: LabelType): string =>{
      return this.nysApi.indexToValue(value, this.gloveCustomSlider);
      },
      showTicks:true,
      getPointerColor:(value:number): string =>{ return this.nysApi.setSliderColor(value,db)},
      getTickColor:(value:number): string =>{ return this.nysApi.setSliderColor(value,db)},
      getSelectionBarColor: (value:number): string => {
      return this.nysApi.setSliderColor(value,db);
      }
    }
  }

  //**Embroidery color slider */
  embSliderColors(db: { "value": string; "hex": string; }[]){    
    
    this.gloveEmbroiderySlider = _.map(db,'value');
    this.valueEmbroidery = this.nysApi.valueToIndex("Start",this.gloveEmbroiderySlider);

    this.embroiderySlider = {
      showSelectionBar: true,
      stepsArray: this.gloveEmbroiderySlider.map((color:string):CustomStepDefinition => {
      return { value: this.nysApi.valueToIndex(color,this.gloveEmbroiderySlider) };
      }),
      translate: (value: number, label: LabelType): string =>{
      return this.nysApi.indexToValue(value, this.gloveEmbroiderySlider);
      },showTicks:true,
      getPointerColor:(value:number): string =>{ return this.nysApi.setSliderColor(value,db)},
      getTickColor:(value:number): string =>{ return this.nysApi.setSliderColor(value,db)},
      getSelectionBarColor: (value:number): string => {
      return this.nysApi.setSliderColor(value,db);
      }
    }
  }

  //** Advance to next step of master stepper */
  nextStep(){
    this.stepper.next(); 
  }

  open(data){
    let config = new MatSnackBarConfig();
    config.duration = 500
    config.panelClass = ['.customizehelp']
    this.snackBar.open(data.value,'CLOSE',config)
    console.log(config)
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
    console.log(gloveSize)
    _.find(this.filteredGloveContent, (r) =>{
      if(gloveSize !== r.size){
        return false;        
      } else {
        _.find(r.content,(value, key)=>{            
          if(key !== this.currentGloveType){
            console.log(key, this.currentGloveType)   
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
        this.snackBar.open("You throw with LEFT.",'DISMISS',{duration:1000})
        break;    
      default:
        this.snackBar.open("You throw with your RIGHT.",'DISMISS',{duration:1000})
        break;
    }
    this.nysApi.setGloveHand(name, htmlValue);
  }

  setGloveOptions(event: string, formValue:string, optionAttribute:string, menuName: string, control:string){
    const htmlValue = {'id':optionAttribute,'value':formValue}
    this.nysApi.setWorkFlowValidity(menuName,control);
    this.nysApi.applyHtmlInput(htmlValue);

    switch (event) {
      case "Softball":
      case "Baseball":
        this.snackBar.open(event + " model selected.", 'DISMISS',{duration:1000})
        break;
      case "No padding":
      case "Padding":
        this.snackBar.open(event + " is required in palm.",'DISMISS',{duration:1000})
        break;
      case "Yes":
        this.snackBar.open("Glove will be softened.",'DISMISS',{duration:1000})
        break;
      case "No":
        this.snackBar.open(" Glove will be stiff.",'DISMISS',{duration:1000})
      default:
        break;
    }
  }

  setGloveSeries(event: string, value:string, attributeName: string, menuName:string, control:string){
    const htmlValue = {'id':attributeName,'value': value}
    if(control == "sportPlayed"){
      this.snackBar.open(event + " model selected.",'DISMISS',{duration:1000})
      // switch(event){
      //   case "Softball":
      //     this.snackBar.open(event + " model selected.",'DISMISS',{duration:1000})
      //     break;
      //   default:
      //     this.snackBar.open(event + " model selected.", 'DISMISS',{duration:1000})
      // }
    } 
    this.nysApi.applyHtmlInput(htmlValue);
    this.nysApi.setWorkFlowValidity(menuName, control);
  } 

  //** Set glove size choice from frontend and snackbar confirmation bar*/
  setGloveSize(event:any){
    let id = event.value.toString();
    (id.length == 2) ? id += '.00'
      : (id.length == 4) ? id += '0' 
      : null;
    this.snackBar.open(id + "\" inch glove was selected.",'DISMISS',{duration:1000})
    this.glove.size = `${id}`;
    this.glove.content = '';
    this.filterGloveSizeFilter(id);
    this.nysApi.setGloveSize(id);
  }

  //** Set position choice from frontend and snackbar confirmation bar*/
  setGloveType(shortName:string, name:string, attributeId:string, value:string, control:string, menuForm:string, img?:string){
    this.setGloveContent();
    let glove = shortName;
    const inputAttribute = attributeId;        
    this.snackBar.open(`${name} glove was selected`,'DISMISS',{duration:500})
    this.setGloveOptions(glove, value, inputAttribute ,menuForm, control);
    this.nysApi.setPosition(glove);
    this.handSizeImg = img;
    this.currentGloveType = name.toLowerCase();
    
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
          console.log('SubMenu steps are not complete')
        } else {          
          console.log('All required subMenu steps interacted')
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
    console.log(index)
    if(index != undefined){
      this.nysApi.setGloveCanvas(this.nysApi.indexToValue(index,this.gloveCustomSlider));
    } else {
      alert("Select a glove part before selecting a color")
    }
    
  }

  embroiderySliderSelections(event:number){
    const index = event;
    console.log(index)
    if(index != undefined){
      this.nysApi.setGloveCanvas(this.nysApi.indexToValue(index,this.gloveCustomSlider));
    } else {
      alert("Select a glove part before selecting a color")
    }
    //this.nysApi.setGloveCanvas(this.nysApi.indexToValue(index,this.gloveEmbroiderySlider));
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  } 

}
