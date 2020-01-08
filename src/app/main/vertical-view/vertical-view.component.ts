import { Component, OnInit, Input, Output, EventEmitter, ViewChild, wtfCreateScope  } from '@angular/core';
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

declare var jQuery: any;

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
  snackbarDuration = {'duration': 500}

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

    this.gloveData.getGloveSliderColors().subscribe(
      (res:GloveSlider[]) => this.gloveDataSlider = this.filteredDataSlider = res
    )

    this.nysApi.currentLeatherType$.subscribe(res => {
      var filter = []
      switch (res) {
        case "kip":
          _.filter(this.filteredDataSlider,(f)=>{
            _.find(f.leather,leather => {
              if(leather == res){
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

  // download(){
  //   let svgElement = document.getElementById('gloveCloneSummary1')
  //   let image = svgElement.querySelector('image')
  //   let url = image.href.baseVal,
  //   urlWidth = image.width.baseVal.value,
  //   urlHeight = image.height.baseVal.value
    
  //   //let image = document.getElementById('glove-view-1')

  //   // htmlToImage.toBlob(<HTMLImageElement> <unknown>image)
  //   // .then(function (blob) {
  //   //   window.saveAs(blob, 'my-node.png');
  //   // });

  //   htmlToImage.toPng(svgElement,{width:1000,height:urlHeight}).then(function(dataUrl){
      
  //     mergeImages([url,dataUrl]).then(b64 => {
  //       console.log(b64)
  //       download(b64,"newglove.png")
  //     })
      
  //   })
  //   var blob = new Blob([url], {type: "xlink:href"});
  //   var url2 = window.URL.createObjectURL(blob);
  //   var a = document.createElement("a");
  //   a.href = url;
  //   a.download = "glove.png";
  //   a.click();

  //   // const toBase64 = file => new Promise((resolve, reject) => {
  //   //   const reader = new FileReader();
  //   //   reader.readAsDataURL(file);
  //   //   reader.onload = () => resolve(reader.result);
  //   //   reader.onerror = error => reject(error);
  //   // });

  //   // async function Main() {
  //   //   const file = ( <HTMLInputElement> <unknown> document.querySelector('#glove-view-1')).files[0];
  //   //   console.log(await toBase64(file));
  //   // }

  //   // Main()


  //   // let el = ["gloveCloneSummary1", "gloveCloneSummary2", "gloveCloneSummary3"]
  //   // el.forEach( (s)=>{
  //   //   htmlToImage.toPng(document.getElementById('s')).then(function(dataUrl){
  //   //     download(dataUrl,'my-glove.png')
  //   //   })
  //   // })"xlink:href"

  //   // function downloadSVG(content, fileName)
  //   //   {
  //   //     var svgURL = blobURL(content, 'xlink:href');
  //   //     var newElem = document.createElement('a');
  //   //     newElem.href = svgURL;
  //   //     newElem.setAttribute('download', fileName);
  //   //     document.body.appendChild(newElem);
  //   //     newElem.click();
  //   //     document.body.removeChild(newElem);
  //   //   }

  //   // function blobURL(content, contentType)
  //   // {
  //   //   var blob = new Blob([content], {type: contentType});
  //   //   return (window.URL || window.webkitURL).createObjectURL(blob);
  //   // }

  //   // downloadSVG(image,"my-glove.png")

  //   // function downSVG(el?:any){
  //   //   let blob = new Blob([url], {type: 'xlink:href'} )
  //   //   saveAs(blob,"my-glove.png")
  //   // }

  //   // downSVG()

  //   //mergeImages([url,]).then(b64 => console.log(b64))

  // }

  // download(){
  //   let el = ["gloveCloneSummary1", "gloveCloneSummary2", "gloveCloneSummary3"]
  //   let get_image = (id:string) => {
  //     let img_png = new Image() ,
  //         serializer = new XMLSerializer(),
  //         imageElement = serializer.serializeToString(document.getElementById(id));
  //         img_png.src = 'data:image/png;base64,'+ window.btoa(imageElement);
  //         console.log(img_png.src)
  //         return img_png.src;
  //   }

  //   let merge = (images:any)=>{
  //     console.log(images)
  //     return mergeImages(images).then(console.log);
  //   }

  //   el.forEach( (s)=>{
  //     let images = [];
  //     let img = new Image(),
  //       serializer = new XMLSerializer(),
  //       svgElement = serializer.serializeToString(document.getElementById(s));
  //     img.src = 'data:image/svg+xml;base64,'+ window.btoa(svgElement);
  //     let addtoTempDb = (image,image2)=>{
  //       images.push(image2,image)
  //     }

  //     let img2 = new Image();

  //     //img2.src = 'data:image/png;base64,'+ window.btoa(document.getElementById("glove-view-1"))


  //     switch (s) {
  //       case "gloveCloneSummary1":
  //         img2.src = get_image('glove-view-1');
  //         addtoTempDb(img2,img);
  //         break;
  //       case "gloveCloneSummary2":
  //         img2.src = get_image('glove-view-2');
  //         addtoTempDb(img2,img);
  //         break;
  //       case "gloveCloneSummary3":
  //         img2.src = get_image('glove-view-3');
  //         addtoTempDb(img2,img);
  //         break;
  //       default:
  //         break;
  //     }
  //     console.log(img)
  //     var canvas = document.createElement("canvas")
  //     var w=400
  //     var h=450

  //     canvas.width = w
  //     canvas.height = h
  //     canvas.getContext("2d").drawImage(
  //      merge(images),0,0,w,h);


  //     let imageURL = canvas.toDataURL();


  //     let a = document.createElement('a');
  //     a.download = "image"
  //     a.href = imageURL
  //     a.dataset.downloadurl = ["image/png", a.download, a.href].join(':');

  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);

  //   })


  // }

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
        this.snackBar.open("You throw with LEFT",'DISMISS',this.snackbarDuration)
        break;
      default:
        this.snackBar.open("You throw with RIGHT.",'DISMISS',this.snackbarDuration)
        break;
    }
    this.nysApi.setGloveHand(name, htmlValue);
  }

  setGloveOptions(event: string, formValue:string, attribute:string, menuName?: string, control?:string){
    let htmlValue;
    if(attribute != undefined){
      htmlValue = {'id': attribute,'value':formValue}
    } else {
      htmlValue = {'id':"pa_personalization-embroidery", 'value': formValue}
    }
    
    this.nysApi.setWorkFlowValidity(menuName,control);
    this.nysApi.applyHtmlInput(htmlValue);
    console.log(htmlValue)
    switch (event) {
      case "Softball":
      case "Baseball":
        this.snackBar.open(event + " model selected.", 'DISMISS',this.snackbarDuration )
        break;
      case "No Pad":
      case "Thin Pad":
        this.snackBar.open(event + " is required in palm.",'DISMISS',this.snackbarDuration )
        break;
      case "Yes":
        this.snackBar.open(" Glove will be softened.",'DISMISS',this.snackbarDuration )
        break;
      case "No":
        this.snackBar.open(" Glove will be stiff.",'DISMISS',this.snackbarDuration )
        break;
      default:
        this.snackBar.open( `Personalization color ${event} selected.`,'DISMISS',this.snackbarDuration )
        break;
    }
  }

  setGloveSeries(event: string, value:string, attributeName: string, menuName:string, control:string){
    const htmlValue = {'id':attributeName,'value': value}
    let eventFilter
    if(control == "sportPlayed"){
      this.snackBar.open(event + " model selected.",'DISMISS',this.snackbarDuration)
      // switch(event){
      //   case "Softball":
      //     this.snackBar.open(event + " model selected.",'DISMISS',this.snackbarDuration)
      //     break;
      //   default:
      //     this.snackBar.open(event + " model selected.", 'DISMISS',this.snackbarDuration)
      // }
    } else {
      eventFilter = event.split('(').pop().slice(0);
      console.log(eventFilter)

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
  setGloveType(shortName:string, name:string, attributeId:string, value:string, control:string, menuForm:string, img?:string){
    this.setGloveContent();
    let glove = shortName;
    const inputAttribute = attributeId;
    this.snackBar.open(`${name} glove was selected`,'DISMISS',this.snackbarDuration)
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

  onSubmit(){
    const submit = jQuery('.single_add_to_cart_button').click();
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
