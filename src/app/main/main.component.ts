import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { GloveApiService } from '../services/glove-api-service';
import * as _ from 'lodash';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {

  @Input() glove;
  @Input() profile;
  @Input() price;
  @Input() name;
  //data$: Observable<any>;
  watcher$ = false;
  gloveType: { name: string; type: string; }[];

  constructor(private gloveApi: GloveApiService) { }
  ngOnInit() {
    this.gloveType = [
      { name: "dual welt glove", type: "inf_dw" },
      { name: "outfield glove", type: "of" },
      { name: "catcher mitt", type: "catcher-mitt" },
      { name: "fastback catcher mitt", type: "catcher-fastback" },
      { name: "first base mitt", type: "fbase" },
      { name: "infield glove", type: "inf" },
    ];
    
  }

  ngAfterViewInit(): void {
    _.forEach(this.gloveType, (g) => {
      _.forEach(g, (v, k) => {
        if (v == _.toLower(this.glove)) {
          this.gloveApi.init(this.profile, g.type);
        }
      });
    });
  }



}
