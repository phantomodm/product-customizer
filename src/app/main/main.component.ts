import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable, Subject, fromEvent, Subscription } from 'rxjs';
import { takeUntil, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { GloveColors, WizardPrompts } from '../shared/models/nine-positions-models';
import { GloveDataService } from '../shared/services/gloveData';
import { MatDialog } from '@angular/material';
import { GloveApi } from '../shared/lib/gloveApi';
import * as _ from 'lodash';
import { YouthGloveConfirmComponent } from './youth-glove-confirm/youth-glove-confirm.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  
  //** Component properties Subscription/Observables  */
  private unsubscribe$ = new Subject<void>();
  screenSubscription: Subscription;
  gloveSliderView: Subscription;
  gloveWebs$: Subscription;
  customPartsValue$: Observable<any>;
  isScreenSmall$: Observable<boolean>;

  //** Boolean properties */
  isLoading: boolean;
  gloveSliderSelector: boolean = true;
  canvasLoaded: boolean = true;  

  //** Property which is an array of color name descriptions (ex.Black) for slider inputs  */
  gloveCustomColors = [];
  customGloveValue = [];
  customPartsValue = [];

  /** Tracks the current web step location and synchronization between horizontal and vertical views. */
  currentWizardIndex: number = 0;
  status: Subscription;

  /**Tracks updating of session data to save to localStorage */
  storageWatcher: Subscription; 
  
  //** */
  allGloveWebs;
  emitComponent: string;  
  filteredGloveWebs;
  gloveColorsMap;  
  gloveSeries;
  gloveBuildData: any;
  handSizeConfirmationDialog: any;
  slider = {};

  //* Properties whose values for down tree components */
  formValues = {}; //Holds/sync values from horizonatal and vertical menus
  gloveColorsMap$: Observable<GloveColors>; 
  gloveWizardSteps$: Observable<WizardPrompts>;
  
  
  constructor(public dialog: MatDialog, private gloveData:GloveDataService, private nysApi: GloveApi ) {
    const checkScreenSize = () => document.body.clientWidth < 960;
    const source$ = fromEvent(window,'resize').pipe(takeUntil(this.unsubscribe$), distinctUntilChanged());
    const screenSizeChanged$ = source$.pipe(map(checkScreenSize));
    this.isScreenSmall$ = screenSizeChanged$.pipe(startWith(checkScreenSize()));
  
    this.handSizeConfirmationDialog = this.nysApi.notifyObservables$.pipe(takeUntil(this.unsubscribe$)).subscribe((res)=>{
      if (res.hasOwnProperty('option') && res.option === 'Hand Size'){
        this.openDialog();
      } 
    })
  }

  ngOnInit() {
    this.slider = this.nysApi.customGloveData.slider;
    this.gloveColorsMap$ = this.gloveData.getGloveColors();
    this.gloveColorsMap$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      val => this.gloveColorsMap = val
    );

    this.gloveWizardSteps$ = this.gloveData.getWizardSteps();
    this.gloveSliderView = this.nysApi.currentGlovePart$.subscribe((res)=>{
      this.gloveSliderSelector = res;
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next();
    this.unsubscribe$.complete();    
  }

  ngAfterViewInit(): void {
    let el = (<HTMLElement><unknown>document.querySelectorAll(".mat-horizontal-stepper-header-container"));
    el[1].style.display = "none";
    el[2].style.display = "none";
    el[3].style.display = "none";
    el[4].style.display = "none";
    el[5].style.display = "none";
    el[6].style.display = "none";
  }

  setGlvSize(event){
    this.nysApi.setGloveSize(event);
  }

  /**Tracks values from form child components and saves values in store. */
  syncForm(val){    
    if(!_.isEqual(val,this.formValues)){
      this.nysApi.saveFormValues(val);
      this.formValues = _.assignIn(this.formValues,val);
    } else {
     return null;
    }    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(YouthGloveConfirmComponent,{
      width: '250px',
      data: {gloveType: this.nysApi.customGloveData.isYouthGlove}
    })

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      console.log("dialog is closed")
      this.nysApi.customGloveData.isYouthGlove = result;
    })
  }

}
