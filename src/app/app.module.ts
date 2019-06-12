import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Injector } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
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
  MatProgressSpinnerModule
} from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickModule } from 'ngx-slick';
import { Ng5SliderModule } from 'ng5-slider';
import { NguCarouselModule } from '@ngu/carousel';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { HorizontalViewComponent } from './main/horizontal-view/horizontal-view.component';
import { VerticalViewComponent } from './main/vertical-view/vertical-view.component';
import { HandSizeViewComponent } from './main/hand-size-view/hand-size-view.component';
import { WebViewComponent } from './main/web-view/web-view.component';
import { GloveCustomizerHorizontalViewComponent } from './main/glove-customizer-horizontal-view/glove-customizer-horizontal-view.component';
import { GloveCustomizerVerticalViewComponent } from './main/glove-customizer-vertical-view/glove-customizer-vertical-view.component';
import { ImageCarouselComponent } from './main/image-carousel/image-carousel.component';
import { YouthGloveConfirmComponent } from './main/youth-glove-confirm/youth-glove-confirm.component';
import { GloveCarouselViewComponent } from './main/glove-carousel-view/glove-carousel-view.component';


const firebase = {
  "apiKey": "AIzaSyCx7LYeap73Rn3VKs7U1GRlndySXHHu0Dw",
  "authDomain": "bc-qo-custom.firebaseapp.com",
  "databaseURL": "https://bc-qo-custom.firebaseio.com",
  "projectId": "bc-qo-custom",
  "storageBucket": "",
  "messagingSenderId": "298814992358"
}

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'wizard', component: MainComponent}, 
  { path: '**', component: AppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HorizontalViewComponent,
    VerticalViewComponent,
    HandSizeViewComponent,
    WebViewComponent,
    GloveCustomizerHorizontalViewComponent,
    GloveCustomizerVerticalViewComponent,
    ImageCarouselComponent,
    YouthGloveConfirmComponent,
    GloveCarouselViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
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
    NgbModule,
    Ng5SliderModule,
    SlickModule.forRoot(),
    NguCarouselModule,
    NgxWebstorageModule.forRoot()
  ],
  entryComponents:[MainComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector:Injector){
    const el = createCustomElement(MainComponent,{injector: this.injector})
    customElements.define('glove-customizer', el)
  }
 }
