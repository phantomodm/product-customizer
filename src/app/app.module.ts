import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Injector } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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

const firebase = {
  "apiKey": "AIzaSyCx7LYeap73Rn3VKs7U1GRlndySXHHu0Dw",
  "authDomain": "bc-qo-custom.firebaseapp.com",
  "databaseURL": "https://bc-qo-custom.firebaseio.com",
  "projectId": "bc-qo-custom",
  "storageBucket": "",
  "messagingSenderId": "298814992358"
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
    MatProgressSpinnerModule
  ],
  providers: [],
  entryComponents:[MainComponent]
})
export class AppModule {
  constructor(private injector:Injector){}

  ngDoBootstrap(){
    const el = createCustomElement(MainComponent,{injector: this.injector})
    customElements.define('cap-customs', el)
  };

 }
