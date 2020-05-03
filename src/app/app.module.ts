import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { createCustomElement } from "@angular/elements";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from "./app-routing.module";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from "./app.component";
import { MainComponent } from "./main/main.component";
import { QuickOrderInputElementsComponent } from "./main/quick-order-input-elements/quick-order-input-elements.component";
import { QuickOrderImageCarouselComponent } from "./main/quick-order-image-carousel/quick-order-image-carousel.component";


const firebase = {
  apiKey: "AIzaSyCZH5clhiOV3Ia38MiQQwvSMSegHL4qU_g",
  authDomain: "nystix-ui-web-data.firebaseapp.com",
  databaseURL: "https://nystix-ui-web-data.firebaseio.com",
  projectId: "nystix-ui-web-data",
  storageBucket: "nystix-ui-web-data.appspot.com",
  messagingSenderId: "243122665158",
  appId: "1:243122665158:web:c7c24a321610e16bc209c7",
  measurementId: "G-3G0Z0KDLP7",
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    QuickOrderInputElementsComponent,
    QuickOrderImageCarouselComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    NgbModule,
  ],
  providers: [],
  entryComponents: [AppComponent],
})
export class AppModule {

  constructor(private injector:Injector){}
    
  ngDoBootstrap(){
    const el = createCustomElement( MainComponent,{injector: this.injector} )
    customElements.define('nystix-quick-customs', el)
  };
    
  
 }
