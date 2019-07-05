import { Component, OnInit } from '@angular/core';
import { CapDataService } from '../shared/services/cap-data.service';
import { CapApiService } from '../shared/services/cap-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private capApi:CapApiService) { }

  ngOnInit() {
    this.capApi.init("one-color-cap");
  }

}
