import { Component, OnInit } from '@angular/core';
import { GloveApiService } from 'src/app/shared/services/glove-api.service';
import { qoData, webImages, gloveDesignData } from 'src/app/shared/data/data';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';


@Component({
  selector: 'quick-order-input-elements',
  templateUrl: './quick-order-input-elements.component.html',
  styleUrls: ['./quick-order-input-elements.component.css']
})
export class QuickOrderInputElementsComponent implements OnInit {

  gloveData;
  gloveType = 'outfield';
  leatherType = "steer";

  webs;
  webFilter;
  webCheck: boolean;
  constructor(private gloveApi: GloveApiService, private _sanitizer: DomSanitizer) { }

  public sanitizeImage(image: string) {
    console.log(image)
    return this._sanitizer.bypassSecurityTrustUrl(`url(${image})`);
  }



  ngOnInit() {
    this.gloveData = qoData;
    this.webs = this.webFilter = webImages;

  }

  filterWebInputs(collection: any[]) {
    return _.filter(collection, f => {
      return _.find(f.gloveType, m => {
        if (m === this.gloveType) {
          return true;
        }
      })
    })
  }

  filterColorInputs(collection: any[], id: string) {
    let db = collection;
    const _id = id;
    if (_id === "gloveBody" || "gloveAccent" || "gloveTrim") {
      return _.filter(collection, f => {
        return _.find(f.leather, r => {
          if (r != this.leatherType) {
            return false;
          } else {
            return true;
          }
        })
      })      
    } else if (_id === "gloveLogo" || "embroideryColor"){
      console.log(_id)
      return db;
    }

  }

  gloveWebExpressionCheck(event: string) {
    if (event !== "gloveWeb") {
      return false
    }
  }

  selectValueReceiver(event: any) {
    console.log(event)
    const value = event.target.value;
    switch (value) {
      case "elite_kip":
        this.leatherType = "kip"
        break;

      default:
        this.leatherType = "steer"
    }
  }

  applyFill(event, fill, value, elementId) {
    const target = event.target.dataset.glove_section;
    console.log(event)
    this.gloveApi.getHexIdFromDomSelection(event, fill, value, elementId)
  }



}
