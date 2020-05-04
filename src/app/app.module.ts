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

const firebase = {}


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
