import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Injector } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
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
  "apiKey":'',
  "authDomain":'',
  "databaseURL": '',
  "projectId":'',
  "storageBucket":'',
  "messagingSenderId":''
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
  bootstrap: [MainComponent]
})
export class AppModule {
  constructor(private injector:Injector){
    const el = createCustomElement(MainComponent,{injector: this.injector})
    customElements.define('name-of-app', el)
  }
 }
