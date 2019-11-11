import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { GloveApi } from 'src/app/shared/lib/gloveApi';
import { takeUntil } from 'rxjs/operators';
import { GloveDataService } from 'src/app/shared/services/gloveData';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { GloveWebs } from 'src/app/shared/models/nine-positions-models';
import * as _ from 'lodash';

@Component({
  selector: 'web-view',
  templateUrl: './web-view.component.html',
  styleUrls: ['./web-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebViewComponent implements OnInit, AfterViewInit {

  private unsubscribe$ = new Subject<void>();

  @Input() webs;
  @Input() slideConfig;
  @Output() updateFormValues = new EventEmitter(); 
  @ViewChild('carousel') carousel: NguCarousel<any>;

  public carouselTile: NguCarouselConfig =
  {
    grid: {xs: 1, sm: 2, md: 3, lg: 3, all: 0},
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

  constructor(private snackBar: MatSnackBar, 
              private nysApi:GloveApi,
              private cdr: ChangeDetectorRef,
              private gloveData: GloveDataService) { }

  ngOnInit() {
    
    this.gloveWebs$ = this.gloveData.getWizardSteps().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      _.forOwn(res,(value,key)=>{ 
        !_.isEqual(key,'gloveWeb') ? false : this.allGloveWebs = this.filteredGloveWebs = value[0]['options'] ;  
      })
      
    })

    this.nysApi.canvasListener$.subscribe(res => this.canvasLoaded = res);

    this.nysApi.currentGloveType$.subscribe(res => {
      
      console.log(res)
      console.log(this.filteredGloveWebs)
      if(res != undefined){
        var filter = [];
        _.filter(this.filteredGloveWebs,(f)=> {
          console.log(f)
          _.find(f.gloveType,m =>{
            
            if(m == res){
             filter.push(f);
            }
          })
        })
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

  setWebOptions(name: string, formValue:string, control:string){
    console.log(name, formValue, control)
    var id = control;
    this.snackBar.open(name + " selected",'DISMISS',{duration:2000})
    this.results = _.assignIn(this.results,{[id]:formValue});
    this.nysApi.saveFormValuesFromComponent(this.results);
    this.updateFormValues.emit(this.results);
    this.webSelected(name, formValue);
  }

  onSubmit(){
    (<HTMLElement>document.getElementById("form-action-addToCart")).click();
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
