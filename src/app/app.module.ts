import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Injector } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { NguCarouselModule} from '@ngu/carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {
//   MatIconModule,
//   MatInputModule,
//   MatCardModule,
//   MatRadioModule,
//   MatCheckboxModule,
//   MatStepperModule,
//   MatSliderModule,
//   MatDividerModule,
//   MatButtonModule,
//   MatSnackBarModule,
//   MatSlideToggleModule,
//   MatProgressSpinnerModule
// } from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
// import { QuickOrderImageCarouselComponent } from './main/quick-order-image-carousel/quick-order-image-carousel.component';
// import { QuickOrderInputElementsComponent } from './main/quick-order-input-elements/quick-order-input-elements.component';

const firebase = {
  apiKey: "AIzaSyAZzo3fKO93uAd1O4NV4gC_JjhVceRnCAM",
    authDomain: "positions-ui-web-data.firebaseapp.com",
    databaseURL: "https://positions-ui-web-data.firebaseio.com",
    projectId: "positions-ui-web-data",
    storageBucket: "positions-ui-web-data.appspot.com",
    messagingSenderId: "479822956029",
    appId: "1:479822956029:web:b938e763162d7bbffdc594",
    measurementId: "G-D3BQ4CWZX3"
}

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'home', component: MainComponent}, 
  { path: '**', component: AppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
    // QuickOrderImageCarouselComponent,
    // QuickOrderInputElementsComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    // ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    // MatIconModule,
    // MatInputModule,
    // MatCardModule,
    // MatRadioModule,
    // MatCheckboxModule,
    // MatStepperModule,
    // MatSliderModule,
    // MatDividerModule,
    // MatButtonModule,
    // MatSnackBarModule,
    // MatSlideToggleModule,
    // MatProgressSpinnerModule,
    NguCarouselModule,
    NgbModule
  ],
  providers: [],
  entryComponents:[MainComponent]
})
export class AppModule {

  constructor(private injector:Injector){}
    
  ngDoBootstrap(){
    const el = createCustomElement(MainComponent,{injector: this.injector})
    customElements.define('nine-positions-quick-customs', el)
  };
    
  
 }
