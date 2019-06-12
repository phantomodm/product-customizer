import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { gloveDesignData, embroiderySliderData } from 'src/app/shared/data/api-data';
import { GloveColors, NavFormControl, GloveSlider } from 'src/app/shared/models/nine-positions-models';
import { Options, CustomStepDefinition, LabelType } from 'ng5-slider';
import { GloveDataService } from 'src/app/shared/services/gloveData';
import { GloveApi } from 'src/app/shared/lib/gloveApi';
import * as _ from 'lodash';


@Component({
  selector: 'horizontal-view',
  templateUrl: './horizontal-view.component.html',
  styleUrls: ['./horizontal-view.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HorizontalViewComponent implements OnInit {
  
  private unsubscribe$ = new Subject<void>();
  @Input() slider;
  @Input() gloveDesignData; //Glove Leather Colors
  @Input() gloveColorsMap;
  @Input() emitComponent;
  @Input() embroiderySliderData;
  @Input() formValues: NavFormControl;
  @Input() wizardPrompts;gloveEmbroiderySlider: any;
  
 //Glove Questions & Attributes
  @Input() sliderStatus;
  @Input('gloveWebs') filteredGloveWebs;
  @Input('stepIndex') indexForWizardStep: number;
  @Output() stepIndexChange: EventEmitter<any> = new EventEmitter();
  @Output() updateFormValues: EventEmitter<any> = new EventEmitter();
  @Output() notifyCurrentComponent: EventEmitter<any> = new EventEmitter();
  @ViewChild('mainMenu1') mMenu;
  @ViewChild('sliderOne') sliderOne;
  
  //**Carousel Indicators */
  showNavigationIndicators = false;
  showNavigationArrows = false;
  
  //** Filtered images array */
  filteredImages: Observable<Array<any>>;
 
  //** Form Properties */
  horizontalForm: FormGroup;
  formFields = {};
  formStatus: any; //Subscribes to form observable
  formSubscrip: any; //Subscribes to form observable

  //**internal object of selected radio options. Compared against new values emitted by observable */
  currentFormResults = {}

  //** Template properties*/
  slideConfig = {"slidesToShow": 3, "slidesToScroll": 3, "variableWidth": true, "lazyLoad":'progressive'};
  gloveCustomColors = [];

  //** properties and functions to manage Ng5-slider*/
  embroiderySliderColors: GloveColors[];
  gloveSliderColors: GloveColors[];

  //** Horizontal Glove Leather Slider */
  gloveDataSlider = [];  
  filteredDataSlider:GloveSlider[] = [];

  gloveCustomSlider = [];
  gloveSlider: Options;
  value: number;

  valueEmbroidery: number;
  embroiderySlider: Options;

  constructor(private nysApi:GloveApi, 
              private fb:FormBuilder,
              private gloveData: GloveDataService            
              ) { 
  }

  ngOnInit() {
    this.filteredDataSlider = gloveDesignData;
    this.gloveData.getGloveSliderColors().subscribe(
      (res:GloveSlider[]) => this.filteredDataSlider = res
    )
    this.formFields = this.nysApi.getFormValues();
    this.formValues = this.nysApi.getFormValues();
    this.horizontalForm = this.fb.group(this.formFields);
    this.onChanges();
    this.filteredImages = this.nysApi.loadFilteredImages();
    this.gloveData.getGloveSliderColors().subscribe(
      (res:GloveSlider[]) => this.gloveDataSlider = this.filteredDataSlider = res
    )

    this.nysApi.currentLeatherType$.subscribe(res => {
      var filter = []
      switch (res) {
        case "kip":
          _.filter(this.filteredDataSlider,(f)=>{
            _.find(f.leather,m => {
              if(m == res){
                filter.push(f)
              }
            })
          })
          this.leatherSliderColors(filter);
          break;
      
        default:
          this.leatherSliderColors(this.filteredDataSlider)
          this.embSliderColors(embroiderySliderData)
          break;
      }
    })
  }

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
    this.mMenu.next();
  }

  //** Function initiates subscriptions listening to changes in form emitting and editing values */
  onChanges(){
    this.formSubscrip = this.horizontalForm.valueChanges.pipe(takeUntil(this.unsubscribe$),distinctUntilChanged()).subscribe((val)=>{
      if(_.isEmpty(this.currentFormResults)){         
          this.currentFormResults = _.assignIn(this.currentFormResults,val)
          //console.log("fired from hComponent: 1st condition")
          this.updateFormValues.emit(this.currentFormResults)
      } else if(!_.isEqual(val,this.currentFormResults)){
        this.currentFormResults = _.assignIn(this.currentFormResults,val)
        //console.log("fired from hComponent: 2nd condition")
        this.updateFormValues.emit(val)
        this.emitComponent = "horizontal";
        this.notifyCurrentComponent.emit(this.emitComponent);
      }else{ return null; }
    });

    this.formStatus = this.nysApi.formObservable$.pipe(takeUntil(this.unsubscribe$), distinctUntilChanged()).subscribe((res)=>{
      if(this.emitComponent != "vertical"){
        let data = {};
        data = _.assignIn(data,this.formValues,res)
        //console.log("Data received in Observable "+ data)
        //console.log("Form Status Observable :" + data)
        this.horizontalForm.setValue(data)
        //console.log(this.horizontalForm.value)
      }
    })
    this.filteredImages = this.nysApi.loadFilteredImages();    
  }

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

  setGloveHand(event){
    console.log(event)
    // const id = event.target.parentElement.id;
    // this.nysApi.setGloveHand(id);
  }

  setGloveOptions(menu:string, formControl:string, optionId:string){
    this.nysApi.setWorkFlowValidity(menu, formControl);
    this.nysApi.applyHtmlInput(optionId)
  }

  setGloveSeries(event:string, value:string, attributeName:string){
    //console.log(event,value,attributeName)
    this.nysApi.setGloveSeries(_.lowerCase(event),value,attributeName);
  }

  setGloveSize(event, info?:string){
    console.log(this.sliderOne.displayValue);
    this.nysApi.setGloveSize(event);
  } 

  setGloveCanvas(value:string){
    const id = value;
    this.nysApi.setGloveCanvas(id);
  }

  onFinishSliderOne(event){
    const setting = event;
    this.nysApi.setGloveCanvas(this.nysApi.indexToValue(setting,this.gloveCustomSlider));
  }

  onFinishSliderTwo(event){
    const setting = event;    
    this.nysApi.setGloveCanvas(this.nysApi.indexToValue(setting,this.gloveEmbroiderySlider));
  }

  emitHorizontalStep(index:number){
    this.indexForWizardStep = index;
    this.stepIndexChange.emit(this.indexForWizardStep);
  }

  verifySubMenuCompletion(subMenu:string): boolean{
    return this.nysApi.getWizardStatus(subMenu);
  }

  onSubmit(){
    (<HTMLElement>document.getElementById("form-action-addToCart")).click();
  }

  ngOnDestroy(){
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
  }
} 

