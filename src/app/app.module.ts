import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector, Injectable, ErrorHandler } from "@angular/core";
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

import * as Sentry from "@sentry/browser";

const firebase = {
  apiKey: "AIzaSyCZH5clhiOV3Ia38MiQQwvSMSegHL4qU_g",
  authDomain: "nystix-ui-web-data.firebaseapp.com",
  databaseURL: "https://nystix-ui-web-data.firebaseio.com",
  projectId: "nystix-ui-web-data",
  storageBucket: "nystix-ui-web-data.appspot.com",
  messagingSenderId: "243122665158",
  appId: "1:243122665158:web:c7c24a321610e16bc209c7",
  measurementId: "G-3G0Z0KDLP7",
}

// Sentry.init({
//   dsn: "https://16cf816d74304ff9805b80139fb8f7cb@o213549.ingest.sentry.io/5223261"
// });

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    Sentry.showReportDialog({ eventId });
  }
}


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
  //providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
  entryComponents: [AppComponent],
})
export class AppModule {

  constructor(private injector:Injector){}
    
  ngDoBootstrap(){
    const el = createCustomElement( MainComponent,{injector: this.injector} )
    customElements.define('nystix-quick-customs', el)
  };
    
  
 }
