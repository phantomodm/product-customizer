import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { GloveApi } from 'src/app/shared/lib/gloveApi';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatStep, MatSnackBar } from '@angular/material';
import * as _ from 'lodash';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { GloveColors } from 'src/app/shared/models/nine-positions-models';
import { GloveDataService } from 'src/app/shared/services/gloveData';


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
  @Input('stepIndex') indexForWizardStep: number;
  @Input() formValues;
  @Input() gloveSeries;
  @Input() gloveBuildData;
  @Input('gloveWebs') filteredGloveWebs;
  //@Input() syncStatus: Boolean;
  @Input() emitComponent;
  //@Input() customGloveValue;
  @Input() sliderStatus;
  @Output() notifyCurrentComponent = new EventEmitter();
  @Output() stepIndexChange = new EventEmitter();
  @Output() updateFormValues = new EventEmitter();
  @ViewChild('verticalMenu1') stepper;

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
  embroiderSliderColors: GloveColors[];
  gloveSliderColors: GloveColors[];
  
  //**internal object of selected radio options. Compared against new values emitted by observable */
  private results = {};

  //** properties and functions to manage Ng5-slider*/
  gloveCustomSlider = _.map(this.gloveSliderColors, 'value');
  gloveSlider = this.nysApi.gloveSlider; 
  
  //**Embroidery color slider */
  gloveEmbroiderySlider = _.map(this.embroiderSliderColors,'value');
  embroiderySlider = this.nysApi.embroiderySlider;
  gloveDesignData = [];
  leatherColors = [];
  embroideryColors = [];

  customPartsValue$: Observable<any>;
  customPartsValue = [];
  
  constructor(private fb:FormBuilder, 
              private snackBar:MatSnackBar,
              private nysApi: GloveApi,
              private gloveData: GloveDataService ) {}

  ngOnInit() {
    this.formFields = this.nysApi.getFormValues();
    this.verticalForm = this.fb.group(this.formFields);
    this.formValues = this.nysApi.getFormValues();
    this.onChanges();
    this.filteredImages = this.nysApi.loadFilteredImages();
    this.customPartsValue$ = this.gloveData.getCustomParts();

    this.customPartsValue$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      val => _.forEach(val,(v)=>{
        this.customPartsValue.push(v);
      })
    );

    console.log(this.filteredImages)
    
  }
  //** Advance to next step of master stepper */
  nextStep(){
    this.stepper.next(); 
  }

  //** Function initiates subscriptions listening to changes in form emitting and editing values */
  onChanges(){
    this.subscripiton = this.verticalForm.valueChanges.pipe(takeUntil(this.unsubscribe$),distinctUntilChanged()).subscribe((val)=>{
      if(_.isEmpty(this.results)){
        this.results = _.assignIn(this.results,val)
        //console.log("fired from vComponent: 1st condition",this.results)
        this.updateFormValues.emit(this.results)
      } else if(!_.isEqual(val,this.results)){
        this.results = _.assignIn(this.results,val)
        console.log("fired from vComponent: 2nd condition")
        this.updateFormValues.emit(this.results)
        this.emitComponent = "vertical";
        this.notifyCurrentComponent.emit(this.emitComponent)
      } else { return null; }
      
    })

    this.formStatus = this.nysApi.formObservable$.pipe(takeUntil(this.unsubscribe$),distinctUntilChanged()).subscribe((res)=>{      
      if(this.emitComponent != "horizontal"){
          let data = {};
          data = _.assignIn(data,this.formValues,res)
          //console.log("Data received in Observable "+ data)
          //console.log("Form Status Observable :" + data)
          this.verticalForm.setValue(data)
          //console.log(this.verticalForm.value)
      }
      
    })

    this.filteredImages = this.nysApi.loadFilteredImages();
    
    this.gloveData.getCustomParts().subscribe(val => {
      //console.log(val)
      this.gloveDesignData.push(val);
      _.forEach(this.gloveDesignData,(v)=>{
        _.forEach(v.gloveSection,(f)=>{
            if(f === "leather"){
              this.leatherColors.push(v);          
            }

            if(f === "embroidery"){
              this.embroideryColors.push(v)
            }            
        })
      })
    });
  }

  setGloveHand(event){
    const id = event.target.parentElement.id;
    console.log(id);
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
      this.results = _.assignIn(this.results,{[id]:formValue});        
      this.emitComponent = "vertical";
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

      this.updateFormValues.emit(this.results)      
      this.notifyCurrentComponent.emit(this.emitComponent);
  }

  setGloveSeries(event: string, value:string, attributeName: string, menuName:string, control:string){
    
    if(control == "sportPlayed"){
      this.results = _.assignIn(this.results,{sportPlayed:value});
      this.updateFormValues.emit(this.results)
      this.emitComponent = "vertical";
      this.notifyCurrentComponent.emit(this.emitComponent);
      console.log(event)
      switch(event){
        case "Softball":
          this.snackBar.open(event + " model selected",'DISMISS',{duration:2000})
          break;
        default:
          this.snackBar.open(event + " model selected", 'DISMISS',{duration:2000})
      }

    } else {
      let eventFilter = event.split('(').pop().slice(0,-1);
      console.log(eventFilter)

      switch(eventFilter){
        case "Rise":
        this.snackBar.open("RISE series selected.",'DISMISS',{duration:2000})
        break;
        case "Elite JS":
        this.snackBar.open("Elite JS series selected.",'DISMISS',{duration:2000})
        break;
        case "Elite Kip":
        this.snackBar.open("Elite Kip series selected.",'DISMISS',{duration:2000})
        break;
        default:
        this.snackBar.open("Cowhide selected.",'DISMISS',{duration:2000})
      }
      
      this.nysApi.customGloveData.gloveSeries.series = _.lowerCase(eventFilter);
      this.results = _.assignIn(this.results,{gloveSeries:value});
      this.updateFormValues.emit(this.results)
      this.emitComponent = "vertical";
      this.notifyCurrentComponent.emit(this.emitComponent)
    }

    this.nysApi.applyHtmlInput(attributeName);
    //this.nysApi.setGloveSeries(_.lowerCase(event),value,attributeName);
    this.nysApi.setWorkFlowValidity(menuName, control);

  } 

  //** Set glove size choice from frontend and snackbar confirmation bar*/
  setGloveSize(event){
    this.snackBar.open(event.value + "\" inch glove was selected.",'DISMISS',{duration:2000})
    this.nysApi.setGloveSize(event);
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

  //**Emits current stepper index */
  emitVerticalStep(index:number){
    this.indexForWizardStep = index;
    this.stepIndexChange.emit(this.indexForWizardStep);
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  } 

}
