import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { GloveApi } from 'src/app/shared/lib/gloveApi';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatStep, MatSnackBar } from '@angular/material';
import * as _ from 'lodash';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { GloveColors, GloveSlider } from 'src/app/shared/models/nine-positions-models';
import { GloveDataService } from 'src/app/shared/services/gloveData';
import { gloveDesignData, embroiderySliderData } from 'src/app/shared/data/api-data';
import { Options, LabelType, CustomStepDefinition } from 'ng5-slider';
import { GloveSize } from 'src/app/shared/models/nine-positions-models';


@Component({
  selector: 'vertical-view',
  templateUrl: './vertical-view.component.html',
  styleUrls: ['./vertical-view.component.css']
})
export class VerticalViewComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  @Input() wizardPrompts;
  @Input() slider;
  @Input() positions;
  @Input() customParts;
  @Input() gloveColorsMap;
  //@Input('stepIndex') indexForWizardStep: number;
  @Input() formValues;
  @Input() gloveSeries;
  @Input() gloveBuildData;
  @Input('gloveWebs') filteredGloveWebs;
  //@Input() syncStatus: Boolean;
  @Input() emitComponent;
  //@Input() customGloveValue;
  @Input() sliderStatus;
  @Output() notifyCurrentComponent = new EventEmitter();
 // @Output() stepIndexChange = new EventEmitter();
  @Output() updateFormValues = new EventEmitter();
  @ViewChild('verticalMenu1') stepper;

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

  // //**internal object of selected radio options. Compared against new values emitted by observable */
  // private results = {};

  //** properties and functions to manage Ng5-slider*/
  // //** properties and functions to manage Ng5-slider*/
  // gloveCustomSlider = _.map(this.gloveSliderColors, 'value');
  // gloveSlider = this.nysApi.gloveSlider; 
  
  // //**Embroidery color slider */
  // gloveEmbroiderySlider = _.map(this.embroiderSliderColors,'value');
  // embroiderySlider = this.nysApi.embroiderySlider;
  // gloveDesignData = [];
  // leatherColors = [];
  // embroideryColors = [];


 //** properties and functions to manage Ng5-slider*/ 
  embroiderSliderColors: GloveColors[];
  gloveSliderColors: GloveColors[];
  filteredDataSlider: GloveSlider[] = [];
  gloveDataSlider: GloveSlider[];
  gloveEmbroiderySlider: string[];
  gloveCustomSlider = [];
  gloveSlider: Options;
  embroiderySlider: Options;
  value: number;
  valueEmbroidery: number;
  glove: GloveSize;
  
  // End Slider properties declaration */
  
  
  
  constructor(private fb:FormBuilder, 
              private snackBar:MatSnackBar,
              private nysApi: GloveApi,
              private gloveData: GloveDataService ) {}

  ngOnInit() {
    this.filteredDataSlider = gloveDesignData;
    this.formFields = this.nysApi.getFormValues();
    // this.gloveData.getGloveSliderColors().subscribe(
    //   (res:GloveSlider[]) => this.filteredDataSlider = res
    // )
    this.formValues = this.nysApi.getFormValues();
    this.verticalForm = this.fb.group(this.formFields);
    
    this.onChanges();
    this.filteredImages = this.nysApi.loadFilteredImages();
    this.gloveData.getGloveSliderColors().subscribe(
      (res:GloveSlider[]) => {
        this.gloveDataSlider = this.filteredDataSlider = res;
        this.initilizeGloveSlider();
      }
    )
    
    // this.nysApi.currentLeatherType$.subscribe(res => {
    //   console.log('connected')
    //   var filter = []
    //   switch (res) {
    //     case "kip":
    //       _.filter(this.filteredDataSlider,(f)=>{
    //         _.find(f.leather,m => {
    //           if(m == res){
    //             filter.push(f)
    //           }
    //         })
    //       })
    //       this.leatherSliderColors(filter);
    //       break;
      
    //     default:
    //       this.leatherSliderColors(this.filteredDataSlider)
    //       this.embSliderColors(embroiderySliderData)
    //       break;
    //   }
    //   console.log(this.filteredDataSlider)
    // })
    
    this.tobedetermined();

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

  initilizeGloveSlider(){
    this.leatherSliderColors(this.filteredDataSlider);
    this.embSliderColors(embroiderySliderData);
  }

  //**Glove Leather Slider */
  leatherSliderColors(db:GloveSlider[]){    
    this.gloveCustomSlider = _.map(db, 'value');
    this.value = this.nysApi.valueToIndex("Start", this.gloveCustomSlider)
    this.gloveSlider = {
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

  //** Function initiates subscriptions listening to changes in form emitting and editing values */
  onChanges(){
    // this.subscripiton = this.verticalForm.valueChanges.pipe(takeUntil(this.unsubscribe$),distinctUntilChanged()).subscribe((val)=>{
    //   if(_.isEmpty(this.results)){
    //     this.results = _.assignIn(this.results,val)
    //     //console.log("fired from vComponent: 1st condition",this.results)
    //     this.updateFormValues.emit(this.results)
    //   } else if(!_.isEqual(val,this.results)){
    //     this.results = _.assignIn(this.results,val)
    //     console.log("fired from vComponent: 2nd condition")
    //     this.updateFormValues.emit(this.results)
    //     this.emitComponent = "vertical";
    //     this.notifyCurrentComponent.emit(this.emitComponent)
    //   } else { return null; }
      
    // })

    // this.formStatus = this.nysApi.formObservable$.pipe(takeUntil(this.unsubscribe$),distinctUntilChanged()).subscribe((res)=>{      
    //   if(this.emitComponent != "horizontal"){
    //       let data = {};
    //       data = _.assignIn(data,this.formValues,res)
    //       //console.log("Data received in Observable "+ data)
    //       //console.log("Form Status Observable :" + data)
    //       this.verticalForm.setValue(data)
    //       //console.log(this.verticalForm.value)
    //   }
      
    // })

    this.filteredImages = this.nysApi.loadFilteredImages();
    
  }

  setGloveHand(event){
    console.log(event);
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

  setGloveOptions(event: string, formValue:string, optionAttribute:string, menuName: string, control:string){
      //this.nysApi.customGloveData.gloveSeries.series = _.lowerCase(event);
      var id = control;
      // this.results = _.assignIn(this.results,{[id]:formValue});        
      // this.emitComponent = "vertical";
      this.nysApi.setWorkFlowValidity(menuName,control);
      this.nysApi.applyHtmlInput(optionAttribute);

      switch (event) {
        case "Softball":
          this.snackBar.open(event + " model selected",'DISMISS',{duration:2000})
          break;
        case "Baseball":
          this.snackBar.open(event + " model selected", 'DISMISS',{duration:2000})
          break;
        case "No padding":
          this.snackBar.open(event + " is required in palm.",'DISMISS',{duration:2000})
          break;
        case "Padding":
          this.snackBar.open(event + " is required in palm.",'DISMISS',{duration:2000})
          break;
        case "Yes":
          this.snackBar.open("Glove will be softened.",'DISMISS',{duration:2000})
          break;
        case "No":
          this.snackBar.open(" Glove will be stiff.",'DISMISS',{duration:2000})
        default:
          break;
      }

      // this.updateFormValues.emit(this.results)      
      // this.notifyCurrentComponent.emit(this.emitComponent);
  }

  setGloveSeries(event: string, value:string, attributeName: string, menuName:string, control:string){
    
    if(control == "sportPlayed"){
      //this.results = _.assignIn(this.results,{sportPlayed:value});
      //this.updateFormValues.emit(this.results)
      // this.emitComponent = "vertical";
      // this.notifyCurrentComponent.emit(this.emitComponent);
      console.log(event)
      switch(event){
        case "Softball":
          this.snackBar.open(event + " model selected",'DISMISS',{duration:2000})
          break;
        default:
          this.snackBar.open(event + " model selected", 'DISMISS',{duration:2000})
      }

    } 
    //COMMENT OUT SERIES NAME FOR NYStix Gloves
    // else {
    //   let eventFilter = event.split('(').pop().slice(0,-1);
    //   console.log(eventFilter)

    //   switch(eventFilter){
    //     case "Rise":
    //     this.snackBar.open("RISE series selected.",'DISMISS',{duration:2000})
    //     break;
    //     case "Elite JS":
    //     this.snackBar.open("Elite JS series selected.",'DISMISS',{duration:2000})
    //     break;
    //     case "Elite Kip":
    //     this.snackBar.open("Elite Kip series selected.",'DISMISS',{duration:2000})
    //     break;
    //     default:
    //     this.snackBar.open("Cowhide selected.",'DISMISS',{duration:2000})
    //   }
      
    //   this.nysApi.customGloveData.gloveSeries.series = _.lowerCase(eventFilter);
    //   this.results = _.assignIn(this.results,{gloveSeries:value});
    //   this.updateFormValues.emit(this.results)
    //   this.emitComponent = "vertical";
    //   this.notifyCurrentComponent.emit(this.emitComponent)
    // }

    this.nysApi.applyHtmlInput(attributeName);
    //this.nysApi.setGloveSeries(_.lowerCase(event),value,attributeName);
    this.nysApi.setWorkFlowValidity(menuName, control);

  } 

  //** Set glove size choice from frontend and snackbar confirmation bar*/
  setGloveSize(event){
    const id = event
    this.snackBar.open(id.value + "\" inch glove was selected.",'DISMISS',{duration:2000})
    this.glove.size = `${id.value}`;
    this.nysApi.setGloveSize(id);
  }

  //** Set position choice from frontend and snackbar confirmation bar*/
  setGloveType(event:string, message:string, value:string, control:string, menuForm:string){
    let glove = event;
    const inputAttribute = `attribute_${value}`;
    
    // setTimeout(() => {
      
    // }, 500);
    
    this.snackBar.open(`${message} glove was selected`,'DISMISS',{duration:500})
    this.setGloveOptions(event,value, inputAttribute ,menuForm, control);
    this.nysApi.setPosition(glove);
  }

  setHandSize(event){
    const id = event.target.parentElement.id;
    console.log(id)
    switch (id) {
      case "smallHand":
      this.snackBar.open("Glove opening adjusted for SMALL hands",'DISMISS',{duration:2000})
        break;
      case "averageHand":
      this.snackBar.open("Glove opening adjusted for AVERAGE hands",'DISMISS',{duration:2000})
        break;
      case "largeHand":
      this.snackBar.open("Glove opening adjusted for LARGE hands",'DISMISS',{duration:2000})
        break;
      default:
        break;
    }
    
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
  onFinishSliderOne(event){
    const setting = event;
    this.nysApi.setGloveCanvas(this.nysApi.indexToValue(setting,this.gloveCustomSlider));
  }

  onFinishSliderTwo(event){
    const setting = event;
    this.nysApi.setGloveCanvas(this.nysApi.indexToValue(setting,this.gloveEmbroiderySlider));
  }

  //**Emits current stepper index*/
  // emitVerticalStep(index:number){
  //   this.indexForWizardStep = index;
  //   this.stepIndexChange.emit(this.indexForWizardStep);
  // }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  } 

}
