import { Injectable } from '@angular/core';
import { GloveDataService } from './glove-data.service';
import * as _ from 'lodash';
import { TweenLite, Power2 } from 'gsap';
import * as Snap from 'snapsvg-cjs';
import {interval, timer} from 'rxjs';
import { takeWhile, take} from 'rxjs/operators';
import { gloveColor } from '../data/data';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class GloveApiService {
  gloveSeries: any;
  gloveData: any;
  design: any;
  data: any;
  build: any;
  svgMain: any;
  svgInside: any;
  svgSide: any;
  oView: any;
  iView: any;
  sView: any;
  colors: any;
  c_svgMain: any;
  c_svgInside: any;
  c_svgSide: any;
  svgInSide: any;
  gloveCloneMainVertical: any;
  gloveCloneSideVertical: any;
  optionTitle: any;
  canvas: any;
  watcher$ = false;


  constructor(private customData:GloveDataService) { 
    
    this.colors = gloveColor;

    console.log('running...')

    //this.customData.getQuickOrderColor().subscribe(res => {this.colors = res; console.log(this.colors)})

    this.gloveData = {
      gloveSeries: {}, design: {}, data: { build:{} }, domTitle: ["series", "body", "accent", "trim", "logo"], canvas: [{ "element": "svgMain", "svgBase": "_x5F_vw3" },
      { "element": "svgInside", "svgBase": "_x5F_vw2" }, { "element": "svgSide", "svgBase": "_x5F_vw1" }],
    }

    this.design = this.gloveData.design;
    this.canvas = this.gloveData.canvas;
    this.data = this.gloveData.data;
    this.build = this.gloveData.data.build;
    this.optionTitle = this.gloveData.domTitle;
    this.gloveSeries = this.gloveData.gloveSeries;
      
  }

  init(){

    this.customData.getQuickOrderData().subscribe(
      (data)=>{
        let self = this;
        const productId = "170"
        function checkData(){
          return _.forEach(data,(r)=>{
            if (productId === r.product_id){
              self.data = r;
              console.log(self.data)
              this.watcher$ = true;
              return true;
            } else {
              return false;
            }         
          })
          
        }

        /** Observable timer for slow connections */
        const starter = interval(1000);
        const timer$ = timer(5000)
        starter.pipe(takeWhile(checkData),take(1)).subscribe((res) => {
          this.initCanvas();
          console.log(this.data)
        });           
        
      }
    )
  }  
  

  initCanvas() {

    this.svgMain = Snap("#svgMain");
    this.svgInside = Snap("#svgInside");
    this.svgSide = Snap("#svgSide");

    /* Glove Group Containers */
    this.oView = this.svgMain.group(), this.iView = this.svgInside.group(), this.sView = this.svgSide.group();

    switch (this.data.imgBase) {
      case "cm":
        this.loadCatcher();
        break;
      case "cmf":
        this.loadCatcherFB();
        break;
      case "inf":
        this.loadInfield();
        break;
      case "inf_dw":
        this.loadInfield2Welt();
        break;
      case "fbase":
        this.loadFbase();
        break;
      case "of":
        this.loadOutfield();
        break;
      case "pitcher":
        this.loadPitcher();
        break;
      default:
        break;
    }

    const fill = _.random(0, 11);
    setTimeout(() => {      
      _.forEach(this.optionTitle, (d) => {          
        switch (d) {          
          case "body":
          case "trim":
          case "accent":
            console.log(this.colors[fill])
            this.applyFillToCanvas(d, this.colors[fill], this.data.imgBase);
            break;
          case "logo":
            this.applyFillToCanvas(d, "#c5b358", this.data.imgBase);
            break;
        }

      })
    }, 2500);
  }


  //** Function run to return current glove section and color chosen to render in glove canvas */
  getSelectedColorHex(colorString) {
    let colorCode;
    _.forEach(this.colors, (r) => {
      if (_.lowerCase(colorString) === _.lowerCase(r.value)) {
        colorCode = r.hex;
      }
    })
    return colorCode;
  }

  getHexIdFromDomSelection(event:any,fill:string,value:string,element:string) {
    let self = this;
    const gloveSection = event.target.dataset.glove_section;
    const imgBase = self.data.imgBase;
    const domValue = value;
    const elementId = element;
    // let attrName = event.target.name;
    // console.log(at)
    // let attrValue = event.target.value;
    // console.log(attrValue)
    

    _.forEach(self.data.attributes, (value, key) => {

      switch (value) {
        case ("rise_series"):
        case ("elite_japanese_steer"):
        case ("elite_kip"):
          // if (value.name == attrName && value.value == attrValue) {
          //   const html = value.html;
          //   self.selectAndFillToGloveSeries(html, imgBase);
          // }
          console.log(gloveSection.split('_').pop())
          self.selectAndFillToGloveSeries(gloveSection,imgBase);
          break;
        default:
          self.applyFillToCanvas(gloveSection,fill,imgBase)
          self.applyHtmlInput(elementId,domValue);
          // if (value.name == attrName && value.value == attrValue) {
          //   const fill = value.hex;
          //   const html = value.id;
          //   self.applyFillToCanvas(html, fill, imgBase);
          //   self.applyHtmlInput(value);
          // }

          //self.applyFillToCanvas("body",fill,imgBase)
      }

    })
  }

  selectAndFillToGloveSeries(sectionToFill, gloveType) {
    let self = this;
    const bodyPart = sectionToFill;
    //const fillHex = colorValue;
    const glveType = gloveType;
    const fillObj = Object.assign({}, self.data.build);
    _.forEach(self.canvas, (value, key) => {
      let el = value.element;
      let svgLayerId = value.svgBase;
      let svgElement = (`#${glveType}${svgLayerId}`);
      switch (bodyPart) {
        case "rise":
          _.forEach(fillObj.logo, (f) => {
            let element = (svgElement + f);
            switch (el) {
              case "svgMain":
                if ($(element).length != 0) {
                  self.svgMain.select(element).attr({ opacity: 1 });
                } else {
                  if ($(element).length = 0) {
                    self.svgMain.select(element).attr({ opacity: 0 });
                    self.svgMain.select(`#${glveType}_elite_x5F_logo`).attr({ opacity: 0 })
                    break;
                  }
                  //TweenLite.to(element,1,{ease:Power2.easeInOut, fill:fillHex,delay:0.5});
                  break;
                }
                break;
              case "svgInside":
                if ($(element).length != 0) {
                  if ((_.includes(element, 'rse')) && ($(element).length != 0)) {
                    self.svgInside.select(element).attr({ opacity: 1 });
                    self.svgInside.select(`#${glveType}_x5F_rise_x5F_logo`).attr({ opacity: 1 })
                  } else {
                    console.log(element)
                    self.svgInside.select(element).attr({ opacity: 0 });
                    if ($(`#${glveType}_x5F_elite_x5F_logo`).length != 0) {
                      self.svgInside.select(`#${glveType}_x5F_elite_x5F_logo`).attr({ opacity: 0 })
                    }
                  }

                } else {
                  if ($(element).length = 0) {
                    self.svgMain.select(element).attr({ opacity: 0 });
                    break;
                  }
                  //TweenLite.to(element,1,{ease:Power2.easeInOut, fill:fillHex,delay:0.5});
                  break;
                }
              default:
                break;
            }
          })
          break;
        case "elite":
          _.forEach(fillObj.logo, (f) => {
            let element = (svgElement + f);
            switch (el) {
              case "svgMain":
                if ($(element).length != 0) {
                  self.svgMain.select(element).attr({ opacity: 1 });
                  if ($(`#${glveType}_elite_x5F_logo`).length != 0) {
                    self.svgMain.select(`#${glveType}_x5F_elite_x5F_logo`).attr({ opacity: 1 })
                  } else { return null; }
                } else {
                  if ($(element).length = 0) {
                    self.svgMain.select(element).attr({ opacity: 0 });
                    if ($(`#${glveType}_x5F_rise_x5F_logo`).length != 0) {
                      self.svgMain.select(`#${glveType}_x5F_rise_x5F_logo`).attr({ opacity: 0 })
                    } else { return null; }
                    break;
                  }
                  break;
                }
              case "svgInside":
                if ($(element).length != 0) {
                  if ((_.includes(element, 'elt')) && ($(element).length != 0)) {
                    self.svgInside.select(element).attr({ opacity: 1 });
                    self.svgInside.select(`#${glveType}_x5F_elite_x5F_logo`).attr({ opacity: 1 })
                  } else {
                    self.svgInside.select(element).attr({ opacity: 0 });
                    if ($(`#${glveType}_x5F_rise_x5F_logo`).length != 0) {
                      self.svgInside.select(`#${glveType}_x5F_rise_x5F_logo`).attr({ opacity: 0 })
                    }
                  }

                } else {
                  if ($(element).length = 0) {
                    self.svgMain.select(element).attr({ opacity: 0 });
                    if ($(`#${glveType}_x5F_rise_x5F_logo`).length != 0) {
                      self.svgMain.select(`#${glveType}_x5F_rise_x5F_logo`).attr({ opacity: 0 })
                    }
                    break;
                  }
                  break;
                }
              default:
                break;
            }
          })
          break;
        default:
      }
      this.c_svgMain.append(this.svgMain.clone(this.oView));
      this.c_svgInside.append(this.svgInside.clone(this.iView));
      this.c_svgSide.append(this.svgSide.clone(this.sView));
    })
  }


  cloneCanvas() {
    console.log("clone div");
    this.c_svgMain.append(this.svgMain.clone(this.oView));
    this.c_svgInside.append(this.svgInside.clone(this.iView));
    this.c_svgSide.append(this.svgSide.clone(this.sView));
  }

  applyFillToCanvas(sectionToFill, colorValue, gloveType) {
    let self = this;
    const bodyPart = sectionToFill;
    const fillHex = colorValue;
    const glveType = gloveType;
    const fillObj = Object.assign({}, self.data.build);

    _.forEach(this.canvas, (value, key) => {
      let el = value.element;
      let svgLayerId = value.svgBase;
      let svgElement = (`#${glveType}${svgLayerId}`);
      switch (bodyPart) {
        case "body":
          _.forEach(fillObj.body, (f) => {
            let element = (svgElement + f);
            switch (el) {
              case "svgMain":
                if ($(element).length != 0) {
                  if (_.includes(element, "stch")) {
                    self.svgMain.select(element).attr({ "fill": 'none', stroke: fillHex });
                    break;
                  }
                  TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                  //self.svgMain.select(element).attr({ fill: fillHex });
                  break;
                }
              case "svgInside":
                //console.log(element)
                if ($(element).length != 0) {
                  if (_.includes(element, "stch") || _.includes(element, "fgrl")) {
                    self.svgInside.select(element).attr({ "fill": 'none', stroke: fillHex });
                    break;
                  }
                  TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                  //self.svgInside.select(element).attr({ fill: fillHex });
                  break;
                }
              case "svgSide":
                //console.log(element)
                if ($(element).length != 0) {
                  if (_.includes(element, "stch")) {
                    self.svgSide.select(element).attr({ "fill": 'none', stroke: fillHex });
                    break;
                  }
                  TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                  //self.svgSide.select(element).attr({ fill: fillHex });
                  break;
                }
              default:
                break;
            }
          })

          break;
        case "accent":
          _.forEach(fillObj.accent, (d) => {
            let element = (svgElement + d);
            switch (el) {
              case "svgMain":
                if ($(element).length != 0) {
                  if (_.includes(element, "stch")) {
                    self.svgMain.select(element).attr({ "fill": 'none', stroke: fillHex });
                    break;
                  }
                  //self.svgMain.select(element).attr({ fill: fillHex });
                  TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                }
                break;
              case "svgInside":
                if ($(element).length != 0) {
                  if (_.includes(element, "stch")) {
                    self.svgInside.select(element).attr({ "fill": 'none', stroke: fillHex });
                    break;
                  }
                  //self.svgInside.select(element).attr({ fill: fillHex });
                  TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                }
                break;
              case "svgSide":
                if ($(element).length != 0) {
                  if (_.includes(element, "stch")) {
                    self.svgInSide.select(element).attr({ "fill": 'none', stroke: fillHex });
                    break;
                  }
                  //self.svgSide.select(element).attr({ fill: fillHex });
                  TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                }
                break;
              default:
                break;
            }
          })
          break;
        case "trim":
          _.forEach(fillObj.trim, (d) => {
            let element = (svgElement + d);
            switch (el) {
              case "svgMain":
                if ($(element).length != 0) {
                  if (_.includes(element, "stch")) {
                    self.svgMain.select(element).attr({ "fill": 'none', stroke: fillHex });
                    break;
                  }
                  TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 1 });
                  //self.svgMain.select(element).attr({ fill: fillHex });
                }
                break;
              case "svgInside":
                if ($(element).length != 0) {
                  if (_.includes(element, "stch")) {
                    self.svgInside.select(element).attr({ "fill": 'none', stroke: fillHex });

                    break;
                  }
                  //self.svgInside.select(element).attr({ fill: fillHex });
                  TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                }

                break;
              case "svgSide":
                if ($(element).length != 0) {
                  if (_.includes(element, "stch")) {
                    self.svgSide.select(element).attr({ "fill": 'none', stroke: fillHex });

                    break;
                  }
                  //self.svgSide.select(element).attr({ fill: fillHex });
                  TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                }
                break;
              default:
                break;
            }
          })
          break;
        case "logo":
          _.forEach(fillObj.logo, (d) => {
            let element = (svgElement + d);
            switch (el) {
              case "svgMain":
                if ($(element).length != 0) {
                  TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                  //self.svgMain.select(element).attr({ fill: fillHex });
                }
                break;
              case "svgInside":
                if ($(element).length != 0) {
                  //console.log(element);
                  TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                  //self.svgInside.select(element).attr({ fill: fillHex });
                }
                break;
              case "svgSide":
                //console.log('logos')
                if ($(element).length != 0) {
                  TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                  //self.svgSide.select(element).attr({ fill: fillHex });
                }
                break;
              default:
                break;
            }
          })
          break;
        default:
      }
    })

  }

  applyHtmlInput(element:string,value:string){
    try {
      try {
        (<HTMLInputElement>document.getElementById(`${element}_${value}`)).checked = true;
        
      } catch (error) {
        (<HTMLInputElement>document.getElementById(element)).value = value;
      }
      
    } catch (error) {
      console.log("Dev mode")
    }
  }

  //** Set glove series selection in local model*/
  // TODO - Examine value output from frontend and make necessary changes
  setGloveSeries(valueString, formValue) {
    let key = "series";
    let value = "value";

    this.gloveData.gloveSeries[key] = valueString;
    this.gloveData.gloveSeries[value] = formValue;
  }

  //** Set glove emobroidery on canvas */
  setSeriesOnGlove(input, element) {
    let self = this;
    let series = input;

    let currentSeries = self.gloveSeries.series;
    let comparison = _.includes(currentSeries, series);

    if (comparison) {
      switch (series) {
        case "elite":
          element.attr({ opacity: 1 })
          break;
        case "rise":
          element.attr({ opacity: 1 })
          break;
        default:
          element.attr({ opacity: 0 })
          break;
      }
    }

  }


  //** Loads Catcher's mitt glove canvas */
  loadCatcher() {
    let self = this;
    Snap.load("assets/images/nine-positions/catcher_back_view.svg", (f) => {

      this.svgMain.attr({ viewBox: "0 0 400 400" });

      var g = f.selectAll('#cm_x5F_vw3_x5F_utoe, #cm_x5F_vw3_x5F_thb, #cm_x5F_vw3_x5F_bfg, #cm_x5F_vw3_x5F_web, #cm_x5F_vw3_x5F_plm, #cm_x5F_vw3_x5F_lin, #cm_x5F_vw3_x5F_bnd, #cm_x5F_vw3_x5F_fpad, #cm_x5F_vw3_x5F_stch, #cm_x5F_vw3_x5F_lce, #cm_x5F_vw3_x5F_logo, #cm_x5F_open_x5F_back');
      g.forEach(function (el, i) {
        var p = ["cm_x5F_vw3_x5F_utoe", "cm_x5F_vw3_x5F_thb", "cm_x5F_vw3_x5F_bfg", "cm_x5F_vw3_x5F_web", "cm_x5F_vw3_x5F_plm", "cm_x5F_vw3_x5F_lin", "cm_x5F_vw3_x5F_bnd", "cm_x5F_vw3_x5F_fpad", "cm_x5F_vw3_x5F_stch", "cm_x5F_vw3_x5F_lce", "cm_x5F_vw3_x5F_logo", "#cm_x5F_open_xF_back"];
        var layer = p[i];


        //Apply default fills & add to group
        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }

        self.oView.add(el);
        self.svgMain.append(self.oView);
        // self.cloneCanvas();
        //self.defaultColor();
      });

    });

    Snap.load("assets/images/nine-positions/catcher_inside_view.svg", (f) => {
      this.svgInside.attr({ viewBox: "0 0 400 400" });
      var g = f.selectAll('#cm_x5F_vw2_x5F_plm, #cm_x5F_vw2_x5F_web, #cm_x5F_vw2_x5F_tgt, #cm_x5F_vw2_x5F_stch, #cm_x5F_vw2_x5F_bnd, #cm_x5F_vw2_x5F_lce, #cm_x5F_pocket_x5F_view, #cm_x5F_vw2_x5F_rse, #cm_x5F_rise_x5F_logo');

      g.forEach((el, i) => {
        var p = ["cm_x5F_vw2_x5F_plm", "cm_x5F_vw2_x5F_web", "cm_x5F_vw2_x5F_tgt", "cm_x5F_vw2_x5F_stch", "cm_x5F_vw2_x5F_bnd", "cm_x5F_vw2_x5F_lce", "cm_x5F_pocket_x5F_view", "cm_x5F_vw2_x5F_rse", "cm__x5F_rise_x5F_logo"];
        var layer = p[i];

        //Apply default fills & add to group
        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }

        self.iView.add(el);
        self.svgInside.append(self.iView);
        //self.defaultColor();
      });

    });

    Snap.load("assets/images/nine-positions/catcher_side_view.svg", (f) => {
      this.svgSide.attr({ viewBox: "0 0 400 400" });
      var g = f.selectAll('#cm_x5F_vw1_x5F_utoe, #cm_x5F_vw1_x5F_thb, #cm_x5F_vw1_x5F_logo, #cm_x5F_vw1_x5F_bnd, #cm_x5F_vw1_x5F_plm, #cm_x5F_vw1_x5F_web, #cm_x5F_vw1_x5F_fpad, #cm_x5F_vw1_x5F_stch, #cm_x5F_vw1_x5F_lce, #cm_x5F_side_x5F_view');

      g.forEach((el, i) => {
        var p = ["cm_x5F_vw1_x5F_utoe", "cm_x5F_vw1_x5F_thb", "cm_x5F_vw1_x5F_logo", "cm_x5F_vw1_x5F_bnd", "cm_x5F_vw1_x5F_plm", "cm_x5F_vw1_x5F_web", "cm_x5F_vw1_x5F_fpad", "cm_x5F_vw1_x5F_stch", "cm_x5F_vw1_x5F_lce", "cm_x5F_side_x5F_view"];
        var layer = p[i];


        //Apply default fills & add to group
        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }

        self.sView.add(el);
        self.svgSide.append(self.sView);
        //self.defaultColor();
      });

    });

  }

  //** Loads outfield glove canvas */
  loadOutfield() {
    let self = this;
    Snap.load("assets/images/nine-positions/outfield_back_view.svg", (f) => {
      this.svgMain.attr({ viewBox: "0 0 400 400" });
      // this.gloveCloneMainVertical.attr({ viewBox: "0 0 400 400" });
      var g = f.selectAll('#of_x5F_vw3_x5F_wst, #of_x5F_vw3_x5F_logo, #of_x5F_vw3_x5F_indo, #of_x5F_vw3_x5F_indi, #of_x5F_vw3_x5F_mid, #of_x5F_vw3_x5F_rngo, #of_x5F_vw3_x5F_rngi, #of_x5F_vw3_x5F_pnko, #of_x5F_vw3_x5F_pnki, #of_x5F_vw3_x5F_plm, #of_x5F_vw3_x5F_wlt, #of_x5F_vw3_x5F_bnd, #of_x5F_vw3_x5F_stch, #of_x5F_vw3_x5F_web, #of_x5F_vw3_x5F_lce, #of_x5F_open_x5F_back');

      g.forEach(function (el, i) {
        var p = ["of_x5F_vw3_x5F_wst", "of_x5F_vw3_x5F_logo", "of_x5F_vw3_x5F_indo", "of_x5F_vw3_x5F_indi", "of_x5F_vw3_x5F_mid", "of_x5F_vw3_x5F_rngo", "of_x5F_vw3_x5F_rngi", "of_x5F_vw3_x5F_pnko", "of_x5F_vw3_x5F_pnki", "of_x5F_vw3_x5F_plm", "of_x5F_vw3_x5F_wlt", "of_x5F_vw3_x5F_bnd", "of_x5F_vw3_x5F_stch", "of_x5F_vw3_x5F_web", "of_x5F_vw3_x5F_lce", "of_x5F_open_x5F_back"];
        var layer = p[i];

        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }

        self.oView.add(el);
        self.svgMain.append(self.oView);
        //self.defaultColor();
      });

    });

    Snap.load("assets/images/nine-positions/outfield_inside_view.svg", (f) => {
      this.svgInside.attr({ viewBox: "0 0 400 400" });
      // this.gloveCloneInsideVertical.attr({ viewBox: "0 0 400 400" });
      var g = f.selectAll('#of_x5F_vw2_x5F_thbo, #of_x5F_vw2_x5F_thbi, #of_x5F_vw2_x5F_plm, #of_x5F_vw2_x5F_indo, #of_x5F_vw2_x5F_indi, #of_x5F_vw2_x5F_mid, #of_x5F_vw2_x5F_rngo, #of_x5F_vw2_x5F_rngi, #of_x5F_vw2_x5F_pnki, #of_x5F_vw2_x5F_pnko, #of_x5F_vw2_x5F_wlt, #of_x5F_vw2_x5F_web, #of_x5F_vw2_x5F_bnd, #of_x5F_vw2_x5F_stch, #of_x5F_vw2_x5F_lce, #of_x5F_open_x5F_pocket');

      g.forEach((el, i) => {
        var p = ["of_x5F_vw2_x5F_thbo", "of_x5F_vw2_x5F_thbi", "of_x5F_vw2_x5F_plm", "of_x5F_vw2_x5F_indo", "of_x5F_vw2_x5F_indi", "of_x5F_vw2_x5F_mid", "of_x5F_vw2_x5F_rngo", "of_x5F_vw2_x5F_rngi", "of_x5F_vw2_x5F_pnki", "of_x5F_vw2_x5F_pnko", "of_x5F_vw2_x5F_wlt", "of_x5F_vw2_x5F_web", "of_x5F_vw2_x5F_bnd", "of_x5F_vw2_x5F_stch", "of_x5F_vw2_x5F_lce", "of_x5F_open_x5F_pocket"];
        var layer = p[i];

        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }

        self.iView.add(el);
        self.svgInside.append(self.iView);

      });

    });

    Snap.load("assets/images/nine-positions/outfield_side_view.svg", (f) => {
      this.svgSide.attr({ viewBox: "0 0 400 400" });
      // this.gloveCloneSideVertical.attr({ viewBox: "0 0 400 400" });
      var g = f.selectAll('#of_x5F_vw1_x5F_wst,#of_x5F_vw1_x5F_logo, #of_x5F_vw1_x5F_thbi, #of_x5F_vw1_x5F_thbo, #of_x5F_vw1_x5F_indo, #of_x5F_vw1_x5F_plm,#of_x5F_vw1_x5F_web, #of_x5F_vw1_x5F_bnd, #of_x5F_vw1_x5F_wlt, #of_x5F_vw1_x5F_stch, #of_x5F_vw1_x5F_lce, #of_x5F_side_x5F_view');

      g.forEach((el, i) => {
        var p = ["of_x5F_vw1_x5F_wst", "of_x5F_vw1_x5F_logo", "of_x5F_vw1_x5F_thbi", "of_x5F_vw1_x5F_thbo", "of_x5F_vw1_x5F_indo", "of_x5F_vw1_x5F_plm", "of_x5F_vw1_x5F_web", "of_x5F_vw1_x5F_bnd", "of_x5F_vw1_x5F_wlt", "of_x5F_vw1_x5F_stch", "of_x5F_vw1_x5F_lce", "of_x5F_side_x5F_view"];
        var layer = p[i];

        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }

        self.sView.add(el);
        self.svgSide.append(self.sView);
        //self.defaultColor();
      });

    });


  };

  //** Loads infield glove canvas */
  loadInfield() {
    let self = this;

    Snap.load("assets/images/nine-positions/infield_swelt_back.svg", (f) => {
      this.svgMain.attr({ viewBox: "0 0 400 400" });

      var g = f.selectAll('#inf_x5F_vw3_x5F_wst, #inf_x5F_vw3_x5F_thbi, #inf_x5F_vw3_x5F_web, #inf_x5F_vw3_x5F_indo, #inf_x5F_vw3_x5F_plm, #inf_x5F_vw3_x5F_indi, #inf_x5F_vw3_x5F_mid, #inf_x5F_vw3_x5F_rngo, #inf_x5F_vw3_x5F_rngi, #inf_x5F_vw3_x5F_pnko, #inf_x5F_vw3_x5F_pnki, #inf_x5F_vw3_x5F_logo, #inf_x5F_vw3_x5F_wlt, #inf_x5F_vw3_x5F_stch, #inf_x5F_vw3_x5F_bnd, #inf_x5F_vw3_x5F_lce, #inf_x5F_open_x5F_back,#inf_x5F_vw3_x5F_rise,#inf_x5F_vw3_x5F_elite,#inf_x5F_logo_x5F_elite,#inf_x5F_logo_x5F_rise');
      g.forEach((el, i) => {
        var p = ["inf_x5F_vw3_x5F_wst", "inf_x5F_vw3_x5F_thbi", "inf_x5F_vw3_x5F_web", "inf_x5F_vw3_x5F_indo", "inf_x5F_vw3_x5F_plm", "inf_x5F_vw3_x5F_indi", "inf_x5F_vw3_x5F_mid", "inf_x5F_vw3_x5F_rngo", "inf_x5F_vw3_x5F_rngi", "inf_x5F_vw3_x5F_pnko", "inf_x5F_vw3_x5F_pnki", "inf_x5F_vw3_x5F_logo", "inf_x5F_vw3_x5F_wlt", "inf_x5F_vw3_x5F_stch", "inf_x5F_vw3_x5F_bnd", "inf_x5F_vw3_x5F_lce", "inf_x5F_open_x5F_back", "inf_x5F_vw3_x5F_rise", "inf_x5F_vw3_x5F_elite", "inf_x5F_logo_x5F_elite", "inf_x5F_logo_x5F_rise"];
        var layer = p[i];
        var filter = layer.split('_').pop();

        //Apply default fills & add to group
        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }

        if (filter === "rise" || filter === "elite") {
          el.attr({ opacity: 0 })
          this.setSeriesOnGlove(filter, el);
        }

        self.oView.add(el);
        self.svgMain.append(self.oView);

      });

    });

    Snap.load("assets/images/nine-positions/infield_swelt_pocket.svg", (f) => {
      this.svgInside.attr({ viewBox: "0 0 400 400" });
      // this.gloveCloneInsideVertical.attr({ viewBox: "0 0 400 400" });
      var g = f.selectAll('#inf_x5F_vw2_x5F_plm, #inf_x5F_vw2_x5F_thbo, #inf_x5F_vw2_x5F_thbi, #inf_x5F_vw2_x5F_indo, #inf_x5F_vw2_x5F_indi,#inf_x5F_vw2_x5F_mid,#inf_x5F_vw2_x5F_rngo,#inf_x5F_vw2_x5F_rngi,#inf_x5F_vw2_x5F_pnko,#inf_x5F_vw2_x5F_pnki, #inf_x5F_vw2_x5F_web, #inf_x5F_vw2_x5F_stch, #inf_x5F_vw2_x5F_bnd , #inf_x5F_vw2_x5F_wlt, #inf_x5F_vw2_x5F_lce, #inf_x5F_open_x5F_pocket');
      g.forEach((el, i) => {
        var p = ["inf_x5F_vw2_x5F_plm", "inf_x5F_vw2_x5F_thbo", "inf_x5F_vw2_x5F_thbi", "inf_x5F_vw2_x5F_indo", "inf_x5F_vw2_x5F_indi", "inf_x5F_vw2_x5F_mid", "inf_x5F_vw2_x5F_rngo", "inf_x5F_vw2_x5F_rngi", "inf_x5F_vw2_x5F_pnko", "inf_x5F_vw2_x5F_pnki", "inf_x5F_vw2_x5F_web", "inf_x5F_vw2_x5F_stch", "inf_x5F_vw2_x5F_bnd", "inf_x5F_vw2_x5F_wlt", "inf_x5F_vw2_x5F_lce", "inf_x5F_open_x5F_pocket"];
        var layer = p[i];

        //Apply default fills & add to group
        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }

        self.iView.add(el);
        self.svgInside.append(this.iView);
      });

    });

    Snap.load("assets/images/nine-positions/infield_swelt_side.svg", (f) => {
      this.svgSide.attr({ viewBox: "0 0 400 400" });
      // this.gloveCloneSideVertical.attr({ viewBox: "0 0 400 400" });
      var g = f.selectAll('#inf_x5F_vw1_x5F_thbi, #inf_x5F_vw1_x5F_mid, #inf_x5F_vw1_x5F_indi, #inf_x5F_vw1_x5F_wst, #inf_x5F_vw1_x5F_logo, #inf_x5F_vw1_x5F_plm, #inf_x5F_vw1_x5F_bnd, #inf_x5F_vw1_x5F_indo, #inf_x5F_vw1_x5F_thbo, #inf_x5F_vw1_x5F_wlt, #inf_x5F_vw1_x5F_web, #inf_x5F_vw1_x5F_stch,  #inf_x5F_vw1_x5F_lce, #inf_x5F_open_x5F_side');

      g.forEach((el, i) => {
        var p = ["inf_x5F_vw1_x5F_thbi", "inf_x5F_vw1_x5F_mid", "inf_x5F_vw1_x5F_indi", "inf_x5F_vw1_x5F_wst", "inf_x5F_vw1_x5F_logo", "inf_x5F_vw1_x5F_plm", "inf_x5F_vw1_x5F_bnd", "inf_x5F_vw1_x5F_indo", "inf_x5F_vw1_x5F_thbo", "inf_x5F_vw1_x5F_wlt", "inf_x5F_vw1_x5F_web", "inf_x5F_vw1_x5F_stch", "inf_x5F_vw1_x5F_lce", "inf_x5F_open_x5F_side"];
        var layer = p[i];

        //Apply default fills & add to group
        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }

        self.sView.add(el);
        self.svgSide.append(self.sView);

      });

    });

  };

  //** Loads first base mitt canvas */
  loadFbase() {
    let self = this;

    Snap.load("assets/images/nine-positions/fbase_back_view.svg", function (f) {
      self.svgMain.attr({ viewBox: "0 0 400 400" });
      // self.gloveCloneMainVertical.attr({viewBox:"0 0 400 400"});
      var g = f.selectAll('#fbase_x5F_vw3_x5F_thb, #fbase_x5F_vw3_x5F_bfg, #fbase_x5F_vw3_x5F_plm, #fbase_x5F_vw3_x5F_utoe, #fbase_x5F_vw3_x5F_wst, #fbase_x5F_vw3_x5F_logo, #fbase_x5F_vw3_x5F_web, #fbase_x5F_vw3_x5F_stch, #fbase_x5F_vw3_x5F_bnd, #fbase_x5F_vw3_x5F_lce, #fbase_x5F_vw3_x5F_rise, #fbase_x5F_vw3_x5F_elite, #fbase_x5F_open_x5F_back, #fbase_x5F_logo_x5F_elite, #fbase_x5F_logo_x5F_rise');
      g.forEach(function (el, i) {
        var p = ["fbase_x5F_vw3_x5F_thb", "fbase_x5F_vw3_x5F_bfg", "fbase_x5F_vw3_x5F_plm", "fbase_x5F_vw3_x5F_utoe", "fbase_x5F_vw3_x5F_wst", "fbase_x5F_vw3_x5F_logo", "fbase_x5F_vw3_x5F_web", "fbase_x5F_vw3_x5F_stch", "fbase_x5F_vw3_x5F_bnd", "fbase_x5F_vw3_x5F_lce", "fbase_x5F_vw3_x5F_rise", "fbase_x5F_vw3_x5F_elite", "fbase_x5F_open_x5F_back", "fbase_x5F_logo_x5F_elite", "fbase_x5F_logo_x5F_rise"];
        var layer = p[i];
        var filter = layer.split('_').pop();

        //Apply default fills & add to group
        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }

        if (filter === "rise" || filter === "elite") {
          el.attr({ opacity: 0 })
          self.setSeriesOnGlove(filter, el);
        }
        self.oView.add(el);
        self.svgMain.append(self.oView);

      });

    });

    Snap.load("assets/images/nine-positions/fbase_inside_view.svg", function (f) {
      self.svgInside.attr({ viewBox: "0 0 400 400" });
      // self.gloveCloneInsideVertical.attr({viewBox:"0 0 400 400"});
      var g = f.selectAll('#fbase_x5F_vw2_x5F_plm, #fbase_x5F_vw2_x5F_bnd, #fbase_x5F_vw2_x5F_web, #fbase_x5F_vw2_x5F_stch, #fbase_x5F_vw2_x5F_lce, #fbase_x5F_open_x5F_pocket');

      g.forEach(function (el, i) {
        var p = ["fbase_x5F_vw2_x5F_plm", "fbase_x5F_vw2_x5F_bnd", "fbase_x5F_vw2_x5F_web", "fbase_x5F_vw2_x5F_stch", "fbase_x5F_vw2_x5F_lce", "fbase_x5F_open_x5F_pocket"];
        var layer = p[i];

        //Apply default fills & add to group
        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }
        self.iView.add(el);
        self.svgInside.append(self.iView);
      });
    });

    Snap.load("assets/images/nine-positions/fbase_side_view.svg", function (f) {
      self.svgSide.attr({ viewBox: "0 0 400 400" });
      // self.gloveCloneSideVertical.attr({viewBox:"0 0 400 400"});
      var g = f.selectAll('#fbase_x5F_vw1_x5F_wst, #fbase_x5F_vw1_x5F_logo, #fbase_x5F_vw1_x5F_plm, #fbase_x5F_vw1_x5F_thb, #fbase_x5F_vw1_x5F_bfg, #fbase_x5F_vw1_x5F_utoe, #fbase_x5F_vw1_x5F_web, #fbase_x5F_vw1_x5F_stch, #fbase_x5F_vw1_x5F_bnd, #fbase_x5F_vw1_x5F_lce, #fbase_x5F_side_x5F_view');

      g.forEach(function (el, i) {
        var p = ["fbase_x5F_vw1_x5F_wst", "fbase_x5F_vw1_x5F_logo", "fbase_x5F_vw1_x5F_plm", "fbase_x5F_vw1_x5F_thb", "fbase_x5F_vw1_x5F_bfg", "fbase_x5F_vw1_x5F_utoe", "fbase_x5F_vw1_x5F_web", "fbase_x5F_vw1_x5F_stch", "fbase_x5F_vw1_x5F_bnd", "fbase_x5F_vw1_x5F_lce", "fbase_x5F_side_x5F_view"];
        var layer = p[i];

        //Apply default fills & add to group
        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }

        self.sView.add(el);
        self.svgSide.append(self.sView);

      });

    });
  };

  loadCatcherFB() {
    let self = this;
    Snap.load("assets/images/nine-positions/catcher_fastback_back.svg", (f) => {

      this.svgMain.attr({ viewBox: "0 0 400 400" });
      var g = f.selectAll('#cmf_x5F_vw3_x5F_utoe, #cmf_x5F_vw3_x5F_thb, #cmf_x5F_vw3_x5F_logo, #cmf_x5F_vw3_x5F_mid, #cmf_x5F_vw3_x5F_bfg, #cmf_x5F_vw3_x5F_plm, #cmf_x5F_vw3_x5F_wlt ,#cmf_x5F_vw3_x5F_stch, #cmf_x5F_vw3_x5F_bnd, #cmf_x5F_vw3_x5F_web, #cmf_x5F_vw3_x5F_lce, #cmf_x5F_vw3_x5F_fpad, #cmf_x5F_fastback_x5F_back');
      g.forEach(function (el, i) {
        var p = ["cmf_x5F_vw3_x5F_utoe", "cmf_x5F_vw3_x5F_thb", "#cmf_x5F_vw3_x5F_logo", "#cmf_x5F_vw3_x5F_mid", "cmf_x5F_vw3_x5F_bfg", "#cmf_x5F_vw3_x5F_plm", "#cmf_x5F_vw3_x5F_wlt", "#cmf_x5F_vw3_x5F_stch", "cmf_x5F_vw3_x5F_bnd", "cmf_x5F_vw3_x5F_web", "cmf_x5F_vw3_x5F_lce", "cmf_x5F_vw3_x5F_fpad", "cmf_x5F_fastback_x5F_back"];
        var layer = p[i];

        //Apply default fills & add to group
        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }

        //Apply default fills & add to group
        self.oView.add(el);
        self.svgMain.append(self.oView);
        //self.defaultColor();
      });

    });

    Snap.load("assets/images/nine-positions/catcher_fastback_inside_view.svg", (f) => {
      this.svgInside.attr({ viewBox: "0 0 400 400" });
      var g = f.selectAll('#cmf_x5F_vw2_x5F_plm, #cmf_x5F_vw2_x5F_web, #cmf_x5F_vw2_x5F_tgt, #cmf_x5F_vw2_x5F_stch, #cmf_x5F_vw2_x5F_bnd, #cmf_x5F_vw2_x5F_lce, #cmf_x5F_pocket_x5F_view, #cmf_x5F_vw2_x5F_rse, #cmf_x5F_rise_x5F_logo');

      g.forEach((el, i) => {
        var p = ["cmf_x5F_vw2_x5F_plm", "cmf_x5F_vw2_x5F_web", "cmf_x5F_vw2_x5F_tgt", "cmf_x5F_vw2_x5F_stch", "cmf_x5F_vw2_x5F_bnd", "cmf_x5F_vw2_x5F_lce", "cmf_x5F_pocket_x5F_view", "cmf_x5F_vw2_x5F_rse", "cmf_x5F_rise_x5F_logo"];
        var layer = p[i];

        //Apply default fills & add to group
        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }

        self.iView.add(el);
        self.svgInside.append(self.iView);
        //self.defaultColor();
      });

    });

    Snap.load("assets/images/nine-positions/catcher_fastback_side.svg", (f) => {
      this.svgSide.attr({ viewBox: "0 0 400 400" });
      var g = f.selectAll('#cmf_x5F_vw1_x5F_thb, #cmf_x5F_vw1_x5F_logo, #cmf_x5F_vw1_x5F_utoe, #cmf_x5F_vw1_x5F_wlt, #cmf_x5F_vw1_x5F_web, #cmf_x5F_vw1_x5F_bnd, #cmf_x5F_vw1_x5F_plm, #cmf_x5F_vw1_x5F_stch, #cmf_x5F_vw1_x5F_blt, #cmf_x5F_vw1_x5F_lce, #cmf_x5F_vw1_x5F_fastback_x5F_side');

      g.forEach((el, i) => {
        var p = ["cmf_x5F_vw1_x5F_thb", "cmf_x5F_vw1_x5F_logo", "cmf_x5F_vw1_x5F_utoe", "cmf_x5F_vw1_x5F_wlt", "cmf_x5F_vw1_x5F_web", "cmf_x5F_vw1_x5F_bnd", "cmf_x5F_vw1_x5F_plm", "cmf_x5F_vw1_x5F_stch", "cmf_x5F_vw1_x5F_blt", "cmf_x5F_vw1_x5F_lce", "cmf_x5F_vw1_x5F_fastback_x5F_side"];
        var layer = p[i];

        //Apply default fills & add to group
        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }

        //Apply default fills & add to group
        self.sView.add(el);
        self.svgSide.append(self.sView);
        //self.defaultColor();
        //self.gloveCloneSideVertical.append(self.svgSide.clone(self.sView));
      });

    });

  };

  loadInfield2Welt() {
    let self = this;

    Snap.load("assets/images/nine-positions/infield_dwelt_back.svg", (f) => {
      this.svgMain.attr({ viewBox: "0 0 400 400" });

      var g = f.selectAll('#inf_dw_x5F_vw3_x5F_bfg, #inf_dw_x5F_vw3_x5F_mid, #inf_dw_x5F_vw3_x5F_wst, #inf_dw_x5F_vw3_x5F_wlt, #inf_dw_x5F_vw3_x5F_bnd, #inf_dw_x5F_vw3_x5F_logo, #inf_dw_x5F_vw3_x5F_web, #inf_dw_x5F_vw3_x5F_plm, #inf_dw_x5F_vw3_x5F_stch, #inf_dw_x5F_vw3_x5F_lce, #inf_dw_x5F_dwelt_x5F_back, #inf_dw_x5F_vw3_x5F_rse, inf_dw_x5F_vw3_x5F_elt, inf_dw_x5F_elite_x5F_logo, inf_dw_x5F_rise_x5F_logo');
      g.forEach((el, i) => {
        var p = ["inf_dw_x5F_vw3_x5F_bfg", "inf_dw_x5F_vw3_x5F_mid", "inf_dw_x5F_vw3_x5F_wst", "inf_dw_x5F_vw3_x5F_wlt", "inf_dw_x5F_vw3_x5F_bnd", "inf_dw_x5F_vw3_x5F_logo", "inf_dw_x5F_vw3_x5F_web", "inf_dw_x5F_vw3_x5F_plm", "inf_dw_x5F_vw3_x5F_stch", "inf_dw_x5F_vw3_x5F_lce", "inf_dw_x5F_dwelt_x5F_back", "inf_dw_x5F_vw3_x5F_rse", "inf_dw_x5F_vw3_x5F_elt", "inf_dw_x5F_elite_x5F_logo", "inf_dw_x5F_rise_x5F_logo"];
        var layer = p[i];
        var filter = layer.split('_').pop();

        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
          el.attr({ stroke: "#FFFAFA" })
        } else {

          el.attr({ fill: "#FFFAFA" })
        }

        if (filter === "rise" || filter === "elite") {
          el.attr({ opacity: 0 })
          this.setSeriesOnGlove(filter, el);
        }

        self.oView.add(el);
        self.svgMain.append(self.oView);

      });

    });

    Snap.load("assets/images/nine-positions/infield_dwelt_pocket.svg", (f) => {
      this.svgInside.attr({ viewBox: "0 0 400 400" });
      // this.gloveCloneInsideVertical.attr({ viewBox: "0 0 400 400" });
      var g = f.selectAll('#inf_dw_x5F_vw2_x5F_web, #inf_dw_x5F_vw2_x5F_plm, #inf_dw_x5F_vw2_x5F_mid, #inf_dw_x5F_vw2_x5F_bfg, #inf_dw_x5F_vw2_x5F_wlt, #inf_dw_x5F_vw2_x5F_bnd,#inf_dw_x5F_vw2_x5F_stch, #inf_dw_x5F_vw2_x5F_lce, #inf_dw_x5F_dwelt_x5F_inside');
      g.forEach((el, i) => {
        var p = ["inf_dw_x5F_vw2_x5F_web", "inf_dw_x5F_vw2_x5F_plm", "inf_dw_x5F_vw2_x5F_mid", "inf_dw_x5F_vw2_x5F_bfg", "inf_dw_x5F_vw2_x5F_wlt", "inf_dw_x5F_vw2_x5F_bnd", "inf_dw_x5F_vw2_x5F_stch", "inf_dw_x5F_vw2_x5F_lce", "inf_dw_x5F_dwelt_x5F_inside"];
        var layer = p[i]
        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }

        self.iView.add(el);
        self.svgInside.append(this.iView);
        //self.defaultColor();

      });
    });

    Snap.load("assets/images/nine-positions/infield_dwelt_side.svg", (f) => {
      this.svgSide.attr({ viewBox: "0 0 400 400" });
      // this.gloveCloneSideVertical.attr({ viewBox: "0 0 400 400" });
      var g = f.selectAll('#inf_dw_x5F_vw1_x5F_plm, #inf_dw_x5F_vw1_x5F_bfg, #inf_dw_x5F_vw1_x5F_mid, #inf_dw_x5F_vw1_x5F_wlt, #inf_dw_x5F_vw1_x5F_web, #inf_dw_x5F_vw1_x5F_wst, #inf_dw_x5F_vw1_x5F_stch, #inf_dw_x5F_vw1_x5F_bnd, #inf_dw_x5F_vw1_x5F_lce, #inf_dw_x5F_vw1_x5F_logo, #inf_dw_x5F_dwelt_x5F_side');

      g.forEach((el, i) => {
        var p = ["inf_dw_x5F_vw1_x5F_plm", "inf_dw_x5F_vw1_x5F_bfg", "inf_dw_x5F_vw1_x5F_mid", "inf_dw_x5F_vw1_x5F_wlt", "inf_dw_x5F_vw1_x5F_web", "inf_dw_x5F_vw1_x5F_wst", "inf_dw_x5F_vw1_x5F_stch", "inf_dw_x5F_vw1_x5F_bnd", "inf_dw_x5F_vw1_x5F_lce", "inf_dw_x5F_vw1_x5F_logo, inf_dw_x5F_dwelt_x5F_side"];
        var layer = p[i];
        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }

        self.sView.add(el);
        self.svgSide.append(self.sView);
      });
    });
  };

  //** Loads pitcher glove canvas */
  loadPitcher() {
    let self = this;

    Snap.load("assets/images/nine-positions/pitcher_open_back.svg", function (f) {
      self.svgMain.attr({ viewBox: "0 0 400 400" });
      self.gloveCloneMainVertical.attr({ viewBox: "0 0 400 400" });
      var g = f.selectAll(' #pitcher_x5F_vw3_x5F_wst, #pitcher_x5F_vw3_x5F_logo, #pitcher_x5F_vw3_x5F_thbi, #pitcher_x5F_vw3_x5F_plm, #pitcher_x5F_vw3_x5F_web, #pitcher_x5F_vw3_x5F_indi, #pitcher_x5F_vw3_x5F_indo, #pitcher_x5F_vw3_x5F_mid, #pitcher_x5F_vw3_x5F_rngo, #pitcher_x5F_vw3_x5F_rngi, #pitcher_x5F_vw3_x5F_pnko, #pitcher_x5F_vw3_x5F_pnki, #pitcher_x5F_vw3_x5F_stch, #pitcher_x5F_vw3_x5F_wlt, #pitcher_x5F_vw3_x5F_bnd, #pitcher_x5F_vw3_x5F_bnd, #pitcher_x5F_vw3_x5F_lce, #pitcher_x5F_open_x5F_back,#pitcher_x5F_vw3_x5F_rse,#pitcher_x5F_vw3_x5F_elt,#pitcher_x5F_logo_x5F_elite,#pitcher_x5F_logo_x5F_rise');
      g.forEach(function (el, i) {
        var p = ["pitcher_x5F_vw3_x5F_wst", "pitcher_x5F_vw3_x5F_logo", "pitcher_x5F_vw3_x5F_thbi", "pitcher_x5F_vw3_x5F_plm", "pitcher_x5F_vw3_x5F_web", "pitcher_x5F_vw3_x5F_indi", "pitcher_x5F_vw3_x5F_indo", "pitcher_x5F_vw3_x5F_mid", "pitcher_x5F_vw3_x5F_rngo", "pitcher_x5F_vw3_x5F_rngi", "pitcher_x5F_vw3_x5F_pnko", "pitcher_x5F_vw3_x5F_pnki", "pitcher_x5F_vw3_x5F_stch", "pitcher_x5F_vw3_x5F_wlt", "pitcher_x5F_vw3_x5F_bnd", "pitcher_x5F_vw3_x5F_bnd", "pitcher_x5F_vw3_x5F_lce", "pitcher_x5F_open_x5F_back", "pitcher_x5F_vw3_x5F_rse", "pitcher_x5F_vw3_x5F_elt", "pitcher_x5F_logo_x5F_elite", "pitcher_x5F_logo_x5F_rise"];
        var layer = p[i];
        var filter = layer.split('_').pop();

        //Apply default fills & add to group
        if (_.includes(layer, "stch")) {
          el.attr({ fill: 'none' });
        } else {
          el.attr({ fill: "#FFFAFA" })
        }

        if (filter === "rise" || filter === "elite") {
          el.attr({ opacity: 0 })
          this.setSeriesOnGlove(filter, el);
        }

        self.oView.add(el);
        self.svgMain.append(self.oView);
        //self.defaultColor();
      });
    });

    Snap.load("assets/images/nine-positions/pitcher_side_view.svg", function (f) {
      self.svgInside.attr({ viewBox: "0 0 400 400" });
      self.gloveCloneSideVertical.attr({ viewBox: "0 0 400 400" });
      var g = f.selectAll('#pitcher_x5F_vw1_x5F_lin,#pitcher_x5F_vw1_x5F_bfg,#pitcher_x5F_vw1_x5F_plm,#pitcher_x5F_vw1_x5F_web,#pitcher_x5F_vw1_x5F_wst,#pitcher_x5F_vw1_x5F_logo, #pitcher_x5F_vw1_x5F_wlt, #pitcher_x5F_vw1_x5F_bnd, #pitcher_x5F_vw1_x5F_stch, #pitcher_x5F_vw1_x5F_lce,#pitcher_x5F_open_x5F_side');
      g.forEach(function (el, i) {
        var p = ["pitcher_x5F_vw1_x5F_lin", "pitcher_x5F_vw1_x5F_bfg", "pitcher_x5F_vw1_x5F_plm", "pitcher_x5F_vw1_x5F_web", "pitcher_x5F_vw1_x5F_wst", "pitcher_x5F_vw1_x5F_logo", "pitcher_x5F_vw1_x5F_wlt", "pitcher_x5F_vw1_x5F_bnd", "pitcher_x5F_vw1_x5F_stch", "pitcher_x5F_vw1_x5F_lce", "pitcher_x5F_open_x5F_side"];
        var layer = p[i];

        //Apply default fills & add to group
        //self.defaultColor(p[i], el, self.iView);

        self.iView.add(el);
        self.svgInside.append(self.iView);
        //self.defaultColor();
      });

    });
  };

}
