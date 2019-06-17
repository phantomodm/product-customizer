import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GloveApiService } from '../shared/services/glove-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  
  data$:Observable<any>;
  watcher$ = false;

  constructor(private gloveApi: GloveApiService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    this.gloveApi.init()
  }

}
