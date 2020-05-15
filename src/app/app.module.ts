import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { NgModule, Injector, Injectable, ErrorHandler } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { NguCarouselModule} from '@ngu/carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as Sentry from "@sentry/browser";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';

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

Sentry.init({
  dsn: "https://c97a385c4a8d4d268ff84a13fac917b0@sentry.io/1883251"
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    Sentry.showReportDialog({ eventId });
  }
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    NguCarouselModule,
    NgbModule
  ],
  // providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
  entryComponents:[MainComponent]
})
export class AppModule {

  constructor(private injector:Injector){}
    
  ngDoBootstrap(){
    const el = createCustomElement(MainComponent,{injector: this.injector})
    customElements.define('nine-positions-quick-customs', el)
  };
    
  
 }
