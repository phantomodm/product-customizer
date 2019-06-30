import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Injector } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { NguCarouselModule} from '@ngu/carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
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

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { QuickOrderImageCarouselComponent } from './main/quick-order-image-carousel/quick-order-image-carousel.component';
import { QuickOrderInputElementsComponent } from './main/quick-order-input-elements/quick-order-input-elements.component';
import { WebFilterPipe } from './shared/lib/pipe/web-filter.pipe';

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
  { path: 'home', component: MainComponent}, 
  { path: '**', component: AppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    QuickOrderImageCarouselComponent,
    QuickOrderInputElementsComponent,
    WebFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
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
