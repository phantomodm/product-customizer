import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { GloveApiService } from '../shared/services/glove-api.service';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  @Input() glove;
  @Input() profile;
  // data$: Observable<any>;
  // watcher$ = false;
  currentInput = new Subject<string>();
  currentInput$ = this.currentInput.asObservable();
  gloveType: { "name": string; "type": string; }[];

  constructor(private gloveApi: GloveApiService) { }

  ngOnInit() {

    this.gloveType = [
      { "name":"dual welt glove","type":"inf_dw" },
      { "name":"outfield glove","type":"of" },
      { "name":"catcher mitt","type":"catcher-mitt" },
      { "name":"fastback catcher mitt","type":"catcher-fastback" },
      { "name":"first base mitt","type":"fbase" },
      { "name":"infield glove","type":"inf" },
    ]
    
    if (typeof $ == undefined ){
      var $ = jQuery;

      $('.ywapo_single_option_image .ywapo_input').on({
        hover: function(){
          const e = $(this).parent().siblings().text().trim();
          this.currentInput.next(e)
        },
        change: function(){
          let value = Number($(this).val()), values = [];
          value = value+=1;
          values.push( $(this).context[ value.toString() ] );
          if (values.length){
            this.applyFill({id:this.currentInput, domValue:values[0]})
          }          
        },
        click: function(){
          let value = $(this)[0].textContent;
          this.applyFill({id:this.currentInput, domValue:value})
        }
      })      

    }
    
  }

  applyFill(obj:{id:string,domValue:string}) {
    this.gloveApi.getHexIdFromDomSelection({section: obj.id,value: obj.domValue});
  }

  ngAfterViewInit(): void {
    _.forEach(this.gloveType, g=>{
      _.forEach(g,(v,k) =>{
        if (v == this.glove.toLowerCase()){
          this.gloveApi.init(this.profile,g.type.toLowerCase());
        }
      })
    })
    
  }

}
