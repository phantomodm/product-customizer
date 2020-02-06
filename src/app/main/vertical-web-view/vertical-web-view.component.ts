import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, HostListener } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { GloveWebs } from 'src/app/shared/models/nine-positions-models';
import { MatSnackBar } from '@angular/material';
import { GloveApi } from 'src/app/shared/lib/gloveApi';
import { GloveDataService } from 'src/app/shared/services/gloveData';
import { takeUntil, take } from 'rxjs/operators';
import * as _ from 'lodash';
import { Subject } from 'rxjs';

@Component({
  selector: 'vertical-web-view',
  templateUrl: './vertical-web-view.component.html',
  styleUrls: ['./vertical-web-view.component.css']
})
export class VerticalWebViewComponent implements OnInit {
  private unsubscribe$ = new Subject<boolean>();
  @Input('webs') webs ;
  @ViewChild('verticalWeb') carousel: NguCarousel<any>;

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

  results: any;
  gloveWebs$: any;
  allGloveWebs: GloveWebs[] = [];
  filteredGloveWebs: GloveWebs[] = [];
  canvasLoaded: boolean = false;
  updateFormValues: any;
  webUri: any;

  constructor(private snackBar: MatSnackBar, 
              private nysApi:GloveApi,
              private cdr: ChangeDetectorRef,
              private gloveData: GloveDataService) { }

  ngOnInit() {
    
    this.gloveWebs$ = this.gloveData.getWizardSteps().pipe(take(2),takeUntil(this.unsubscribe$)).subscribe(res => {
      _.forOwn(res,(value,key)=>{
        !_.isEqual(key,'gloveWeb') ? false : this.allGloveWebs = this.filteredGloveWebs = value[0]['options'] ;
      })
    })

    this.nysApi.canvasListener$.subscribe(res => this.canvasLoaded = res);

    this.nysApi.currentGloveType$.subscribe(res => {      
      if(res != undefined){
        var filter = [];        
        _.filter(this.allGloveWebs,(f)=> {
          _.find(f.gloveType,m =>{            
            if(m == res){
             filter.push(f);
            }
          })
        });
        
        this.filteredGloveWebs = filter;
        this.cdr.detectChanges();
      } else {
        console.log('no value')
        return false;
      }

    })

  }

  ngAfterViewInit(): void {
    !_.isEqual(this.canvasLoaded,true) ? this.nysApi.initCanvas() : false;    
    this.cdr.detectChanges();
  }

  webSelected(id: string, value: string){
    this.nysApi.selectedWeb(id,value); 
  }

  setWebOptions(name: string, id:string, formValue:string, menuName:string , control:string){
    const htmlValue = {'id':id, 'value': formValue}
    var id = control;
    this.snackBar.open(name + " selected",'DISMISS',{duration:2000})
    // this.results = _.assignIn(this.results,{[id]:formValue});
    // this.nysApi.saveFormValuesFromComponent(this.results);
    //this.updateFormValues.emit(this.results);
    this.webSelected(name, formValue);
    this.nysApi.applyHtmlInput(htmlValue);
    this.nysApi.setWorkFlowValidity(menuName, control);
  }

  onSubmit(){
    (<HTMLElement>document.getElementById("form-action-addToCart")).click();
  }

  @HostListener('window:beforeunload',['$event'])
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
