import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Injector, Injectable, ErrorHandler } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatRadioModule,
  MatCheckboxModule,
  MatStepperModule,
  MatSliderModule,
  MatDividerModule,
  MatButtonModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatTooltipModule
} from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';
import { NguCarouselModule } from '@ngu/carousel';
//import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { VerticalViewComponent } from './main/vertical-view/vertical-view.component';
import { HandSizeViewComponent } from './main/hand-size-view/hand-size-view.component';
import { GloveCustomizerVerticalViewComponent } from './main/glove-customizer-vertical-view/glove-customizer-vertical-view.component';
//import { ImageCarouselComponent } from './main/image-carousel/image-carousel.component';
//import { GloveCarouselViewComponent } from './main/glove-carousel-view/glove-carousel-view.component';
import { VerticalWebViewComponent } from './main/vertical-web-view/vertical-web-view.component';
import * as Sentry from "@sentry/browser";

Sentry.init({dsn: "https://c99465224dd4472baa076dd87c7219c8@sentry.io/1883254"})

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    Sentry.showReportDialog({ eventId });
  }
}

var firebase = {
  apiKey: "AIzaSyAZzo3fKO93uAd1O4NV4gC_JjhVceRnCAM",
  authDomain: "positions-ui-web-data.firebaseapp.com",
  databaseURL: "https://positions-ui-web-data.firebaseio.com",
  projectId: "positions-ui-web-data",
  messagingSenderId: "479822956029"
};

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'wizard', component: MainComponent}, 
  { path: '**', component: AppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,    
    VerticalViewComponent,
    HandSizeViewComponent,
    GloveCustomizerVerticalViewComponent,
    VerticalWebViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSliderModule,
    MatDividerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    NgbModule,
    Ng5SliderModule,
    NguCarouselModule
  ],
  entryComponents:[MainComponent],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }]
  
})
export class AppModule {
  constructor(private injector:Injector){}

  ngDoBootstrap(){
    const el = createCustomElement(MainComponent,{injector: this.injector})
    customElements.define('ninep-glove-customizer', el)
  }
 }
