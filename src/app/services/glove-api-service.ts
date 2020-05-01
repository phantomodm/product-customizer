import {  HostListener, OnDestroy, Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as Snap from 'snapsvg-cjs';
import {interval, timer, BehaviorSubject, Subject} from 'rxjs';
import { gsap } from 'gsap/dist/gsap';
import { takeWhile, take, finalize, takeUntil} from 'rxjs/operators';
import { GloveDataService } from './glove-data.service';
import { gloveColor } from '../shared/data/data';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class GloveApiService implements OnDestroy {

  private unsubscribe$ = new Subject<boolean>();

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
  optionTitle: any;
  canvas: any;
  imageBase: string;
  formData: [] = [];

  gloveInputOptions = new BehaviorSubject([]);
  gloveInputOptions$ = this.gloveInputOptions.asObservable()

  gloveTypeWatcher = new BehaviorSubject("");
  gloveTypeWatcher$ = this.gloveTypeWatcher.asObservable();
  colorsHex = [];


  constructor(private customData: GloveDataService) {

    this.colors = gloveColor;
    console.log('running...');

    this.customData
      .getQuickOrderColor()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        _.forEach( res, v => {this.colorsHex.push(v.hex)} );
        this.colors = res;
      });

    this.gloveData = {
      gloveSeries: {},      
      design: {},
      data: { build: {}, imgBase:'', },
      domTitle: ['series', 'body', 'accent', 'trim', 'logo'],
      formData: [],
      canvas: [{ element: 'svgMain', svgBase: '_x5F_vw3' },
      { element: 'svgInside', svgBase: '_x5F_vw2' },
      { element: 'svgSide', svgBase: '_x5F_vw1' }],
    };

    this.design = this.gloveData.design;
    this.canvas = this.gloveData.canvas;
    this.data = this.gloveData.data;
    this.formData = this.gloveData.formData;
    this.build = this.gloveData.data.build;
    this.optionTitle = this.gloveData.domTitle;
    this.gloveSeries = this.gloveData.gloveSeries;


  }

  init(designProfile?: string, gloveType?: string) {
    const profile = designProfile;
    this.imageBase = gloveType;
    this.customData.getProfileData().subscribe(
      (data) => {
        const self = this;
        function checkData() {
          return _.forEach(data, ( v, k ) => {
            if (_.isEqual(profile, k)) {              
              self.data = Object.assign(self.data.build, v.build);              
              self.formData = v.formData;
              console.log(v.formData)
              self.gloveInputOptions.next(v.formData)
              return true;
            }
          });
        }

        /** Observable timer for slow connections */
        const starter = interval(500);
        starter.pipe(takeUntil(this.unsubscribe$),takeWhile(checkData), take(1), finalize( () => this.initCanvas() )).subscribe();
      }
    );
  }


  initCanvas() {

    this.svgMain = Snap('#svgMain');
    this.svgInside = Snap('#svgInside');
    this.svgSide = Snap('#svgSide');
    

    /* Glove Group Containers */
    this.oView = this.svgMain.group(), this.iView = this.svgInside.group(), this.sView = this.svgSide.group();

    switch (this.imageBase) {
      case 'catcher-mitt':
        this.loadCatcher();
        this.gloveTypeWatcher.next("catcher")
        break;
      case 'catcher-fastback':
        this.loadCatcherFB();
        this.gloveTypeWatcher.next("catcher")
        break;
      case 'inf':
        this.loadInfield();
        this.gloveTypeWatcher.next("infielder")
        break;
      case 'inf_dw':
        this.loadInfield2Welt();
        this.gloveTypeWatcher.next("infielder")
        break;
      case 'fbase':
        this.loadFbase();
        this.gloveTypeWatcher.next("fbase")
        break;
      case 'of':
        this.loadOutfield();
        this.gloveTypeWatcher.next("outfielder")
        break;
      case 'pitcher':
        this.loadPitcher();
        this.gloveTypeWatcher.next("glove")
        break;
      default:
        this.loadCatcher();
        break;
    }
    
    const fill = _.random(0, this.colorsHex.length - 1);
    setTimeout(() => {
      _.forEach(this.optionTitle, (d) => {
        switch (d) {
          case 'body':
          case 'trim':
          case 'accent':
            this.applyFillToCanvas(d, this.colorsHex[fill], this.imageBase);
            break;
          case 'logo':
            this.applyFillToCanvas(d, '#c5b358', this.imageBase);
            break;
        }

      });
    }, 2500);
  }


  // ** Function run to return current glove section and color chosen to render in glove canvas */
  getSelectedColorHex(colorString) {
    let colorCode;
    _.forEach(this.colors, (r) => {
      if (_.lowerCase(colorString) === _.lowerCase(r.value)) {
        colorCode = r.hex;
      }
    });
    return colorCode;
  }

  getHexIdFromDomSelection(event: any, fill: string, value: string, element: string) {
    const self = this;
    const gloveSection = event.target.dataset.glove_section;
    const imgBase = self.imageBase;
    const domValue = value;
    const elementId = element;

    self.applyFillToCanvas(gloveSection, fill, imgBase);
    self.applyHtmlInput(elementId, domValue);
  }
  
  cloneCanvas() {
    console.log('clone div');
    this.c_svgMain.append(this.svgMain.clone(this.oView));
    this.c_svgInside.append(this.svgInside.clone(this.iView));
    this.c_svgSide.append(this.svgSide.clone(this.sView));
  }

  applyFillToCanvas(sectionToFill, colorValue, gloveType) {
    const self = this;
    const bodyPart = sectionToFill;
    const fillHex = colorValue;
    const glveType = gloveType;
    const fillObj = Object.assign({}, self.data);
    _.forEach(this.canvas, (value, key) => {
      const el = value.element;
      const svgLayerId = value.svgBase;
      const svgElement = (`#${glveType}${svgLayerId}`);
      switch (bodyPart) {
        case 'body':
          _.forEach(fillObj.body, (f) => {
            const element = (svgElement + f);
            switch (el) {
              case 'svgMain':
                if ($(element).length != 0) {
                  if (_.includes(element, 'stch')) {
                    self.svgMain.select(element).attr({ fill: 'none', stroke: fillHex });
                    break;
                  }
                  gsap.to(element, 1, { ease: "power2.inOut", fill: fillHex, delay: 0.5 });
                  // self.svgMain.select(element).attr({ fill: fillHex });
                  break;
                }
              case 'svgInside':
                // console.log(element)
                if ($(element).length != 0) {
                  if (_.includes(element, 'stch') || _.includes(element, 'fgrl')) {
                    self.svgInside.select(element).attr({ fill: 'none', stroke: fillHex });
                    break;
                  }
                  gsap.to(element, 1, { ease: "power2.inOut", fill: fillHex, delay: 0.5 });
                  // self.svgInside.select(element).attr({ fill: fillHex });
                  break;
                }
              case 'svgSide':
                // console.log(element)
                if ($(element).length != 0) {
                  if (_.includes(element, 'stch')) {
                    console.log(element)
                    self.svgSide.select(element).attr({ fill: 'none', stroke: fillHex });
                    break;
                  }
                  gsap.to(element, 1, { ease: "power2.inOut", fill: fillHex, delay: 0.5 });
                  // self.svgSide.select(element).attr({ fill: fillHex });
                  break;
                }
              default:
                break;
            }
          });

          break;
        case 'accent':
          _.forEach(fillObj.accent, (d) => {
            const element = (svgElement + d);
            switch (el) {
              case 'svgMain':
                if ($(element).length != 0) {
                  if (_.includes(element, 'stch')) {
                    self.svgMain.select(element).attr({ fill: 'none', stroke: fillHex });
                    break;
                  }
                  // self.svgMain.select(element).attr({ fill: fillHex });
                  gsap.to(element, 1, { ease: "power2.inOut", fill: fillHex, delay: 0.5 });
                }
                break;
              case 'svgInside':
                if ($(element).length != 0) {
                  if (_.includes(element, 'stch')) {
                    self.svgInside.select(element).attr({ fill: 'none', stroke: fillHex });
                    break;
                  }
                  // self.svgInside.select(element).attr({ fill: fillHex });
                  gsap.to(element, 1, { ease: "power2.inOut", fill: fillHex, delay: 0.5 });
                }
                break;
              case 'svgSide':
                if ($(element).length != 0) {
                  if (_.includes(element, 'stch')) {
                    self.svgInSide.select(element).attr({ fill: 'none', stroke: fillHex });
                    break;
                  }
                  // self.svgSide.select(element).attr({ fill: fillHex });
                  gsap.to(element, 1, { ease: "power2.inOut", fill: fillHex, delay: 0.5 });
                }
                break;
              default:
                break;
            }
          });
          break;
        case 'trim':
          _.forEach(fillObj.trim, (d) => {
            const element = (svgElement + d);
            switch (el) {
              case 'svgMain':
                if ($(element).length != 0) {
                  if (_.includes(element, 'stch')) {
                    self.svgMain.select(element).attr({ fill: 'none', stroke: fillHex });
                    break;
                  }
                  gsap.to(element, 1, { ease: "power2.inOut", fill: fillHex, delay: 1 });
                  // self.svgMain.select(element).attr({ fill: fillHex });
                }
                break;
              case 'svgInside':
                if ($(element).length != 0) {
                  if (_.includes(element, 'stch')) {
                    self.svgInside.select(element).attr({ fill: 'none', stroke: fillHex });

                    break;
                  }
                  // self.svgInside.select(element).attr({ fill: fillHex });
                  gsap.to(element, 1, { ease: "power2.inOut", fill: fillHex, delay: 0.5 });
                }

                break;
              case 'svgSide':
                if ($(element).length != 0) {
                  if (_.includes(element, 'stch')) {
                    self.svgSide.select(element).attr({ fill: 'none', stroke: fillHex });

                    break;
                  }
                  // self.svgSide.select(element).attr({ fill: fillHex });
                  gsap.to(element, 1, { ease: "power2.inOut", fill: fillHex, delay: 0.5 });
                }
                break;
              default:
                break;
            }
          });
          break;
        case 'logo':
          _.forEach(fillObj.logo, (d) => {
            const element = (svgElement + d);
            switch (el) {
              case 'svgMain':
                if ($(element).length != 0) {
                  if (_.includes(element, 'stch')) {
                    self.svgMain.select(element).attr({ fill: 'none', stroke: fillHex });

                    break;
                  }
                  gsap.to(element, 1, { ease: "power2.inOut", fill: fillHex, delay: 0.5 });
                  // self.svgMain.select(element).attr({ fill: fillHex });
                }
                break;
              case 'svgInside':
                if ($(element).length != 0) {
                  if (_.includes(element, 'stch')) {
                    self.svgInside.select(element).attr({ fill: 'none', stroke: fillHex });

                    break;
                  }
                  
                  gsap.to(element, 1, { ease: "power2.inOut", fill: fillHex, delay: 0.5 });
                }                

                break;
              case 'svgSide':
                // console.log('logos')
                if ($(element).length != 0) {
                  if (_.includes(element, 'stch')) {
                    self.svgSide.select(element).attr({ fill: 'none', stroke: fillHex });

                    break;
                  }
                  gsap.to(element, 1, { ease: "power2.inOut", fill: fillHex, delay: 0.5 });
                  // self.svgSide.select(element).attr({ fill: fillHex });
                }
                break;
              default:
                break;
            }
          });
          break;
        default:
      }
    });

  }

  applyHtmlInput(element: string, value: string, event?:string) {

    if(event === "change"){
      try {
        console.log(value)
        $(`#${element}`).val(value);
        $(`#${element}`).trigger("change").trigger("select.fs");
      } catch (error) {
        ( document.getElementById(`${element}`) as HTMLInputElement).checked = true;
        $(`#${element}`).trigger("change").trigger("select.fs");
        console.log(error)
      }
    }
    //( document.getElementById(element) as HTMLInputElement).value = value;

  }

  // // ** Set glove series selection in local model*/
  // // TODO - Examine value output from frontend and make necessary changes
  // setGloveSeries(valueString, formValue) {
  //   const key = 'series';
  //   const value = 'value';
  //   this.gloveData.gloveSeries[key] = valueString;
  //   this.gloveData.gloveSeries[value] = formValue;
  // }

  // // ** Set glove emobroidery on canvas */
  // setSeriesOnGlove(input, element) {
  //   const self = this;
  //   const series = input;

  //   const currentSeries = self.gloveSeries.series;
  //   const comparison = _.includes(currentSeries, series);

  //   if (comparison) {
  //     switch (series) {
  //       case 'elite':
  //         element.attr({ opacity: 1 });
  //         break;
  //       case 'rise':
  //         element.attr({ opacity: 1 });
  //         break;
  //       default:
  //         element.attr({ opacity: 0 });
  //         break;
  //     }
  //   }

  // }

    // ** Loads Catcher's mitt glove canvas */
    loadCatcher() {
      const self = this;
      Snap.load('assets/images/nystix/nys_catcher_back_view.svg', (f) => {
  
        this.svgMain.attr({ viewBox: '0 0 400 400' });
  
        const g = f.selectAll('#catcher-mitt_x5F_vw3_x5F_utoe, #catcher-mitt_x5F_vw3_x5F_thb, #catcher-mitt_x5F_vw3_x5F_bfg, #catcher-mitt_x5F_vw3_x5F_web, #catcher-mitt_x5F_vw3_x5F_plm, #catcher-mitt_x5F_vw3_x5F_lin, #catcher-mitt_x5F_vw3_x5F_bnd, #catcher-mitt_x5F_vw3_x5F_fpad, #catcher-mitt_x5F_vw3_x5F_stch, #catcher-mitt_x5F_vw3_x5F_lce, #catcher-mitt_x5F_vw3_x5F_logo, #catcher-mitt_x5F_open_x5F_back');
        g.forEach(function (el, i) {
          const p = ['catcher-mitt_x5F_vw3_x5F_utoe', 'catcher-mitt_x5F_vw3_x5F_thb', 'catcher-mitt_x5F_vw3_x5F_bfg', 'catcher-mitt_x5F_vw3_x5F_web', 'catcher-mitt_x5F_vw3_x5F_plm', 'catcher-mitt_x5F_vw3_x5F_lin', 'catcher-mitt_x5F_vw3_x5F_bnd', 'catcher-mitt_x5F_vw3_x5F_fpad', 'catcher-mitt_x5F_vw3_x5F_stch', 'catcher-mitt_x5F_vw3_x5F_lce', 'catcher-mitt_x5F_vw3_x5F_logo', '#catcher-mitt_x5F_open_xF_back'];
          const layer = p[i];
  
  
          // Apply default fills & add to group
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
  
          self.oView.add(el);
          self.svgMain.append(self.oView);
          // self.cloneCanvas();
          // self.defaultColor();
        });
  
      });
  
      Snap.load('assets/images/nystix/nys_catcher_inside_view.svg', (f) => {
        this.svgInside.attr({ viewBox: '0 0 400 400' });
        const g = f.selectAll('#catcher-mitt_x5F_vw2_x5F_plm, #catcher-mitt_x5F_vw2_x5F_web, #catcher-mitt_x5F_vw2_x5F_tgt, #catcher-mitt_x5F_vw2_x5F_stch, #catcher-mitt_x5F_vw2_x5F_bnd, #catcher-mitt_x5F_vw2_x5F_lce, #catcher-mitt_x5F_pocket_x5F_view, #catcher-mitt_x5F_vw2_x5F_rse, #catcher-mitt_x5F_rise_x5F_logo');
  
        g.forEach((el, i) => {
          const p = ['catcher-mitt_x5F_vw2_x5F_plm', 'catcher-mitt_x5F_vw2_x5F_web', 'catcher-mitt_x5F_vw2_x5F_tgt', 'catcher-mitt_x5F_vw2_x5F_stch', 'catcher-mitt_x5F_vw2_x5F_bnd', 'catcher-mitt_x5F_vw2_x5F_lce', 'catcher-mitt_x5F_pocket_x5F_view', 'catcher-mitt_x5F_vw2_x5F_rse', 'catcher-mitt__x5F_rise_x5F_logo'];
          const layer = p[i];
  
          // Apply default fills & add to group
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
  
          self.iView.add(el);
          self.svgInside.append(self.iView);
          // self.defaultColor();
        });
  
      });
  
      Snap.load('assets/images/nystix/nys_catcher_side_view.svg', (f) => {
        this.svgSide.attr({ viewBox: '0 0 400 400' });
        const g = f.selectAll('#catcher-mitt_x5F_vw1_x5F_utoe, #catcher-mitt_x5F_vw1_x5F_thb, #catcher-mitt_x5F_vw1_x5F_logo, #catcher-mitt_x5F_vw1_x5F_bnd, #catcher-mitt_x5F_vw1_x5F_plm, #catcher-mitt_x5F_vw1_x5F_web, #catcher-mitt_x5F_vw1_x5F_fpad, #catcher-mitt_x5F_vw1_x5F_stch, #catcher-mitt_x5F_vw1_x5F_lce, #catcher-mitt_x5F_side_x5F_view');
  
        g.forEach((el, i) => {
          const p = ['catcher-mitt_x5F_vw1_x5F_utoe', 'catcher-mitt_x5F_vw1_x5F_thb', 'catcher-mitt_x5F_vw1_x5F_logo', 'catcher-mitt_x5F_vw1_x5F_bnd', 'catcher-mitt_x5F_vw1_x5F_plm', 'catcher-mitt_x5F_vw1_x5F_web', 'catcher-mitt_x5F_vw1_x5F_fpad', 'catcher-mitt_x5F_vw1_x5F_stch', 'catcher-mitt_x5F_vw1_x5F_lce', 'catcher-mitt_x5F_side_x5F_view'];
          const layer = p[i];
  
  
          // Apply default fills & add to group
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
  
          self.sView.add(el);
          self.svgSide.append(self.sView);
          // self.defaultColor();
        });
  
      });
  
    }
  
    // ** Loads outfield glove canvas */
    loadOutfield() {
      const self = this;
      Snap.load('assets/images/nystix/nys_outfield_back_view.svg', (f) => {
        this.svgMain.attr({ viewBox: '0 0 400 400' });
        // this.gloveCloneMainVertical.attr({ viewBox: "0 0 400 400" });
        const g = f.selectAll('#of_x5F_vw3_x5F_wst, #of_x5F_vw3_x5F_logo, #of_x5F_vw3_x5F_indo, #of_x5F_vw3_x5F_indi, #of_x5F_vw3_x5F_mid, #of_x5F_vw3_x5F_rngo, #of_x5F_vw3_x5F_rngi, #of_x5F_vw3_x5F_pnko, #of_x5F_vw3_x5F_pnki, #of_x5F_vw3_x5F_plm, #of_x5F_vw3_x5F_wlt, #of_x5F_vw3_x5F_bnd, #of_x5F_vw3_x5F_stch, #of_x5F_vw3_x5F_web, #of_x5F_vw3_x5F_lce, #of_x5F_open_x5F_back');
  
        g.forEach(function (el, i) {
          const p = ['of_x5F_vw3_x5F_wst', 'of_x5F_vw3_x5F_logo', 'of_x5F_vw3_x5F_indo', 'of_x5F_vw3_x5F_indi', 'of_x5F_vw3_x5F_mid', 'of_x5F_vw3_x5F_rngo', 'of_x5F_vw3_x5F_rngi', 'of_x5F_vw3_x5F_pnko', 'of_x5F_vw3_x5F_pnki', 'of_x5F_vw3_x5F_plm', 'of_x5F_vw3_x5F_wlt', 'of_x5F_vw3_x5F_bnd', 'of_x5F_vw3_x5F_stch', 'of_x5F_vw3_x5F_web', 'of_x5F_vw3_x5F_lce', 'of_x5F_open_x5F_back'];
          const layer = p[i];
  
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
  
          self.oView.add(el);
          self.svgMain.append(self.oView);
          // self.defaultColor();
        });
  
      });
  
      Snap.load('assets/images/nystix/nys_outfield_inside_view.svg', (f) => {
        this.svgInside.attr({ viewBox: '0 0 400 400' });
        // this.gloveCloneInsideVertical.attr({ viewBox: "0 0 400 400" });
        const g = f.selectAll('#of_x5F_vw2_x5F_thbo, #of_x5F_vw2_x5F_thbi, #of_x5F_vw2_x5F_plm, #of_x5F_vw2_x5F_indo, #of_x5F_vw2_x5F_indi, #of_x5F_vw2_x5F_mid, #of_x5F_vw2_x5F_rngo, #of_x5F_vw2_x5F_rngi, #of_x5F_vw2_x5F_pnki, #of_x5F_vw2_x5F_pnko, #of_x5F_vw2_x5F_wlt, #of_x5F_vw2_x5F_web, #of_x5F_vw2_x5F_bnd, #of_x5F_vw2_x5F_stch, #of_x5F_vw2_x5F_lce, #of_x5F_open_x5F_pocket');
  
        g.forEach((el, i) => {
          const p = ['of_x5F_vw2_x5F_thbo', 'of_x5F_vw2_x5F_thbi', 'of_x5F_vw2_x5F_plm', 'of_x5F_vw2_x5F_indo', 'of_x5F_vw2_x5F_indi', 'of_x5F_vw2_x5F_mid', 'of_x5F_vw2_x5F_rngo', 'of_x5F_vw2_x5F_rngi', 'of_x5F_vw2_x5F_pnki', 'of_x5F_vw2_x5F_pnko', 'of_x5F_vw2_x5F_wlt', 'of_x5F_vw2_x5F_web', 'of_x5F_vw2_x5F_bnd', 'of_x5F_vw2_x5F_stch', 'of_x5F_vw2_x5F_lce', 'of_x5F_open_x5F_pocket'];
          const layer = p[i];
  
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
  
          self.iView.add(el);
          self.svgInside.append(self.iView);
  
        });
  
      });
  
      Snap.load('assets/images/nystix/nys_outfield_side_view.svg', (f) => {
        this.svgSide.attr({ viewBox: '0 0 400 400' });
        // this.gloveCloneSideVertical.attr({ viewBox: "0 0 400 400" });
        const g = f.selectAll('#of_x5F_vw1_x5F_wst,#of_x5F_vw1_x5F_logo, #of_x5F_vw1_x5F_thbi, #of_x5F_vw1_x5F_thbo, #of_x5F_vw1_x5F_indo, #of_x5F_vw1_x5F_plm,#of_x5F_vw1_x5F_web, #of_x5F_vw1_x5F_bnd, #of_x5F_vw1_x5F_wlt, #of_x5F_vw1_x5F_stch, #of_x5F_vw1_x5F_lce, #of_x5F_side_x5F_view');
  
        g.forEach((el, i) => {
          const p = ['of_x5F_vw1_x5F_wst', 'of_x5F_vw1_x5F_logo', 'of_x5F_vw1_x5F_thbi', 'of_x5F_vw1_x5F_thbo', 'of_x5F_vw1_x5F_indo', 'of_x5F_vw1_x5F_plm', 'of_x5F_vw1_x5F_web', 'of_x5F_vw1_x5F_bnd', 'of_x5F_vw1_x5F_wlt', 'of_x5F_vw1_x5F_stch', 'of_x5F_vw1_x5F_lce', 'of_x5F_side_x5F_view'];
          const layer = p[i];
  
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
  
          self.sView.add(el);
          self.svgSide.append(self.sView);
          // self.defaultColor();
        });
  
      });
  
  
    }
  
    // ** Loads infield glove canvas */
    loadInfield() {
      const self = this;
  
      Snap.load('assets/images/nystix/nys_infield_swelt_back.svg', (f) => {
        this.svgMain.attr({ viewBox: '0 0 400 400' });
  
        const g = f.selectAll('#inf_x5F_vw3_x5F_wst, #inf_x5F_vw3_x5F_thbi, #inf_x5F_vw3_x5F_web, #inf_x5F_vw3_x5F_indo, #inf_x5F_vw3_x5F_plm, #inf_x5F_vw3_x5F_indi, #inf_x5F_vw3_x5F_mid, #inf_x5F_vw3_x5F_rngo, #inf_x5F_vw3_x5F_rngi, #inf_x5F_vw3_x5F_pnko, #inf_x5F_vw3_x5F_pnki, #inf_x5F_vw3_x5F_logo, #inf_x5F_vw3_x5F_wlt, #inf_x5F_vw3_x5F_stch, #inf_x5F_vw3_x5F_bnd, #inf_x5F_vw3_x5F_lce, #inf_x5F_open_x5F_back');
        g.forEach((el, i) => {
          const p = ['inf_x5F_vw3_x5F_wst', 'inf_x5F_vw3_x5F_thbi', 'inf_x5F_vw3_x5F_web', 'inf_x5F_vw3_x5F_indo', 'inf_x5F_vw3_x5F_plm', 'inf_x5F_vw3_x5F_indi', 'inf_x5F_vw3_x5F_mid', 'inf_x5F_vw3_x5F_rngo', 'inf_x5F_vw3_x5F_rngi', 'inf_x5F_vw3_x5F_pnko', 'inf_x5F_vw3_x5F_pnki', 'inf_x5F_vw3_x5F_logo', 'inf_x5F_vw3_x5F_wlt', 'inf_x5F_vw3_x5F_stch', 'inf_x5F_vw3_x5F_bnd', 'inf_x5F_vw3_x5F_lce', 'inf_x5F_open_x5F_back'];
          const layer = p[i];
          const filter = layer.split('_').pop();
  
          // Apply default fills & add to group
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
  
          self.oView.add(el);
          self.svgMain.append(self.oView);
  
        });
  
      });
  
      Snap.load('assets/images/nystix/nys_infield_swelt_pocket.svg', (f) => {
        this.svgInside.attr({ viewBox: '0 0 400 400' });
        // this.gloveCloneInsideVertical.attr({ viewBox: "0 0 400 400" });
        const g = f.selectAll('#inf_x5F_vw2_x5F_plm, #inf_x5F_vw2_x5F_thbo, #inf_x5F_vw2_x5F_thbi, #inf_x5F_vw2_x5F_indo, #inf_x5F_vw2_x5F_indi,#inf_x5F_vw2_x5F_mid,#inf_x5F_vw2_x5F_rngo,#inf_x5F_vw2_x5F_rngi,#inf_x5F_vw2_x5F_pnko,#inf_x5F_vw2_x5F_pnki, #inf_x5F_vw2_x5F_web, #inf_x5F_vw2_x5F_stch, #inf_x5F_vw2_x5F_bnd , #inf_x5F_vw2_x5F_wlt, #inf_x5F_vw2_x5F_lce, #inf_x5F_open_x5F_pocket');
        g.forEach((el, i) => {
          const p = ['inf_x5F_vw2_x5F_plm', 'inf_x5F_vw2_x5F_thbo', 'inf_x5F_vw2_x5F_thbi', 'inf_x5F_vw2_x5F_indo', 'inf_x5F_vw2_x5F_indi', 'inf_x5F_vw2_x5F_mid', 'inf_x5F_vw2_x5F_rngo', 'inf_x5F_vw2_x5F_rngi', 'inf_x5F_vw2_x5F_pnko', 'inf_x5F_vw2_x5F_pnki', 'inf_x5F_vw2_x5F_web', 'inf_x5F_vw2_x5F_stch', 'inf_x5F_vw2_x5F_bnd', 'inf_x5F_vw2_x5F_wlt', 'inf_x5F_vw2_x5F_lce', 'inf_x5F_open_x5F_pocket'];
          const layer = p[i];
  
          // Apply default fills & add to group
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
  
          self.iView.add(el);
          self.svgInside.append(this.iView);
        });
  
      });
  
      Snap.load('assets/images/nystix/nys_infield_swelt_side.svg', (f) => {
        this.svgSide.attr({ viewBox: '-50 0 400 400' });
        // this.gloveCloneSideVertical.attr({ viewBox: "0 0 400 400" });
        const g = f.selectAll('#inf_x5F_vw1_x5F_thbi, #inf_x5F_vw1_x5F_mid, #inf_x5F_vw1_x5F_indi, #inf_x5F_vw1_x5F_wst, #inf_x5F_vw1_x5F_logo, #inf_x5F_vw1_x5F_plm, #inf_x5F_vw1_x5F_bnd, #inf_x5F_vw1_x5F_indo, #inf_x5F_vw1_x5F_thbo, #inf_x5F_vw1_x5F_wlt, #inf_x5F_vw1_x5F_web, #inf_x5F_vw1_x5F_stch,  #inf_x5F_vw1_x5F_lce, #inf_x5F_open_x5F_side');
  
        g.forEach((el, i) => {
          const p = ['inf_x5F_vw1_x5F_thbi', 'inf_x5F_vw1_x5F_mid', 'inf_x5F_vw1_x5F_indi', 'inf_x5F_vw1_x5F_wst', 'inf_x5F_vw1_x5F_logo', 'inf_x5F_vw1_x5F_plm', 'inf_x5F_vw1_x5F_bnd', 'inf_x5F_vw1_x5F_indo', 'inf_x5F_vw1_x5F_thbo', 'inf_x5F_vw1_x5F_wlt', 'inf_x5F_vw1_x5F_web', 'inf_x5F_vw1_x5F_stch', 'inf_x5F_vw1_x5F_lce', 'inf_x5F_open_x5F_side'];
          const layer = p[i];
  
          // Apply default fills & add to group
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
  
          self.sView.add(el);
          self.svgSide.append(self.sView);
  
        });
  
      });
  
    }
  
    // ** Loads first base mitt canvas */
    loadFbase() {
      const self = this;
  
      Snap.load('assets/images/nystix/nys_fbase_back_view.svg', function (f) {
        self.svgMain.attr({ viewBox: '0 0 400 400' });
        // //MainVertical.attr({viewBox:"0 0 400 400"});
        const g = f.selectAll('#fbase_x5F_vw3_x5F_thb, #fbase_x5F_vw3_x5F_bfg, #fbase_x5F_vw3_x5F_plm, #fbase_x5F_vw3_x5F_utoe, #fbase_x5F_vw3_x5F_wst, #fbase_x5F_vw3_x5F_logo, #fbase_x5F_vw3_x5F_web, #fbase_x5F_vw3_x5F_stch, #fbase_x5F_vw3_x5F_bnd, #fbase_x5F_vw3_x5F_lce, #fbase_x5F_open_x5F_back');
        g.forEach(function (el, i) {
          const p = ['fbase_x5F_vw3_x5F_thb', 'fbase_x5F_vw3_x5F_bfg', 'fbase_x5F_vw3_x5F_plm', 'fbase_x5F_vw3_x5F_utoe', 'fbase_x5F_vw3_x5F_wst', 'fbase_x5F_vw3_x5F_logo', 'fbase_x5F_vw3_x5F_web', 'fbase_x5F_vw3_x5F_stch', 'fbase_x5F_vw3_x5F_bnd', 'fbase_x5F_vw3_x5F_lce', 'fbase_x5F_open_x5F_back'];
          const layer = p[i];
          const filter = layer.split('_').pop();
  
          // Apply default fills & add to group
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
  
          
          self.oView.add(el);
          self.svgMain.append(self.oView);
  
        });
  
      });
  
      Snap.load('assets/images/nystix/nys_fbase_inside_view.svg', function (f) {
        self.svgInside.attr({ viewBox: '0 0 400 400' });
        // //InsideVertical.attr({viewBox:"0 0 400 400"});
        const g = f.selectAll('#fbase_x5F_vw2_x5F_plm, #fbase_x5F_vw2_x5F_bnd, #fbase_x5F_vw2_x5F_web, #fbase_x5F_vw2_x5F_stch, #fbase_x5F_vw2_x5F_lce, #fbase_x5F_open_x5F_pocket');
  
        g.forEach(function (el, i) {
          const p = ['fbase_x5F_vw2_x5F_plm', 'fbase_x5F_vw2_x5F_bnd', 'fbase_x5F_vw2_x5F_web', 'fbase_x5F_vw2_x5F_stch', 'fbase_x5F_vw2_x5F_lce', 'fbase_x5F_open_x5F_pocket'];
          const layer = p[i];
  
          // Apply default fills & add to group
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
          self.iView.add(el);
          self.svgInside.append(self.iView);
        });
      });
  
      Snap.load('assets/images/nystix/nys_fbase_side_view.svg', function (f) {
        self.svgSide.attr({ viewBox: '0 0 400 400' });
        // //SideVertical.attr({viewBox:"0 0 400 400"});
        const g = f.selectAll('#fbase_x5F_vw1_x5F_wst, #fbase_x5F_vw1_x5F_logo, #fbase_x5F_vw1_x5F_plm, #fbase_x5F_vw1_x5F_thb, #fbase_x5F_vw1_x5F_bfg, #fbase_x5F_vw1_x5F_utoe, #fbase_x5F_vw1_x5F_web, #fbase_x5F_vw1_x5F_stch, #fbase_x5F_vw1_x5F_bnd, #fbase_x5F_vw1_x5F_lce, #fbase_x5F_side_x5F_view');
  
        g.forEach(function (el, i) {
          const p = ['fbase_x5F_vw1_x5F_wst', 'fbase_x5F_vw1_x5F_logo', 'fbase_x5F_vw1_x5F_plm', 'fbase_x5F_vw1_x5F_thb', 'fbase_x5F_vw1_x5F_bfg', 'fbase_x5F_vw1_x5F_utoe', 'fbase_x5F_vw1_x5F_web', 'fbase_x5F_vw1_x5F_stch', 'fbase_x5F_vw1_x5F_bnd', 'fbase_x5F_vw1_x5F_lce', 'fbase_x5F_side_x5F_view'];
          const layer = p[i];
  
          // Apply default fills & add to group
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
  
          self.sView.add(el);
          self.svgSide.append(self.sView);
  
        });
  
      });
    }
  
    loadCatcherFB() {
      const self = this;
      Snap.load('assets/images/nystix/nys_catcher_fastback_back.svg', (f) => {
  
        this.svgMain.attr({ viewBox: '0 0 400 400' });
        const g = f.selectAll('#catcher-fastback_x5F_vw3_x5F_utoe, #catcher-fastback_x5F_vw3_x5F_thb, #catcher-fastback_x5F_vw3_x5F_logo, #catcher-fastback_x5F_vw3_x5F_mid, #catcher-fastback_x5F_vw3_x5F_bfg, #catcher-fastback_x5F_vw3_x5F_plm, #catcher-fastback_x5F_vw3_x5F_wlt ,#catcher-fastback_x5F_vw3_x5F_stch, #catcher-fastback_x5F_vw3_x5F_bnd, #catcher-fastback_x5F_vw3_x5F_web, #catcher-fastback_x5F_vw3_x5F_lce, #catcher-fastback_x5F_vw3_x5F_fpad, #catcher-fastback_x5F_fastback_x5F_back');
        g.forEach(function (el, i) {
          const p = ['catcher-fastback_x5F_vw3_x5F_utoe', 'catcher-fastback_x5F_vw3_x5F_thb', '#catcher-fastback_x5F_vw3_x5F_logo', '#catcher-fastback_x5F_vw3_x5F_mid', 'catcher-fastback_x5F_vw3_x5F_bfg', '#catcher-fastback_x5F_vw3_x5F_plm', '#catcher-fastback_x5F_vw3_x5F_wlt', '#catcher-fastback_x5F_vw3_x5F_stch', 'catcher-fastback_x5F_vw3_x5F_bnd', 'catcher-fastback_x5F_vw3_x5F_web', 'catcher-fastback_x5F_vw3_x5F_lce', 'catcher-fastback_x5F_vw3_x5F_fpad', 'catcher-fastback_x5F_fastback_x5F_back'];
          const layer = p[i];
  
          // Apply default fills & add to group
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
  
          // Apply default fills & add to group
          self.oView.add(el);
          self.svgMain.append(self.oView);
          // self.defaultColor();
        });
  
      });
  
      Snap.load('assets/images/nystix/nys_catcher_fastback_inside_view.svg', (f) => {
        this.svgInside.attr({ viewBox: '0 0 400 400' });
        const g = f.selectAll('#catcher-fastback_x5F_vw2_x5F_plm, #catcher-fastback_x5F_vw2_x5F_web, #catcher-fastback_x5F_vw2_x5F_tgt, #catcher-fastback_x5F_vw2_x5F_stch, #catcher-fastback_x5F_vw2_x5F_bnd, #catcher-fastback_x5F_vw2_x5F_lce, #catcher-fastback_x5F_pocket_x5F_view, #catcher-fastback_x5F_vw2_x5F_rse, #catcher-fastback_x5F_rise_x5F_logo');
  
        g.forEach((el, i) => {
          const p = ['catcher-fastback_x5F_vw2_x5F_plm', 'catcher-fastback_x5F_vw2_x5F_web', 'catcher-fastback_x5F_vw2_x5F_tgt', 'catcher-fastback_x5F_vw2_x5F_stch', 'catcher-fastback_x5F_vw2_x5F_bnd', 'catcher-fastback_x5F_vw2_x5F_lce', 'catcher-fastback_x5F_pocket_x5F_view', 'catcher-fastback_x5F_vw2_x5F_rse', 'catcher-fastback_x5F_rise_x5F_logo'];
          const layer = p[i];
  
          // Apply default fills & add to group
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
  
          self.iView.add(el);
          self.svgInside.append(self.iView);
          // self.defaultColor();
        });
  
      });
  
      Snap.load('assets/images/nystix/nys_catcher_fastback_side.svg', (f) => {
        this.svgSide.attr({ viewBox: '-50 0 400 400' });
        const g = f.selectAll('#catcher-fastback_x5F_vw1_x5F_thb, #catcher-fastback_x5F_vw1_x5F_logo, #catcher-fastback_x5F_vw1_x5F_utoe, #catcher-fastback_x5F_vw1_x5F_wlt, #catcher-fastback_x5F_vw1_x5F_web, #catcher-fastback_x5F_vw1_x5F_bnd, #catcher-fastback_x5F_vw1_x5F_plm, #catcher-fastback_x5F_vw1_x5F_stch, #catcher-fastback_x5F_vw1_x5F_blt, #catcher-fastback_x5F_vw1_x5F_lce, #catcher-fastback_x5F_vw1_x5F_fastback_x5F_side');
  
        g.forEach((el, i) => {
          const p = ['catcher-fastback_x5F_vw1_x5F_thb', 'catcher-fastback_x5F_vw1_x5F_logo', 'catcher-fastback_x5F_vw1_x5F_utoe', 'catcher-fastback_x5F_vw1_x5F_wlt', 'catcher-fastback_x5F_vw1_x5F_web', 'catcher-fastback_x5F_vw1_x5F_bnd', 'catcher-fastback_x5F_vw1_x5F_plm', 'catcher-fastback_x5F_vw1_x5F_stch', 'catcher-fastback_x5F_vw1_x5F_blt', 'catcher-fastback_x5F_vw1_x5F_lce', 'catcher-fastback_x5F_vw1_x5F_fastback_x5F_side'];
          const layer = p[i];
  
          // Apply default fills & add to group
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
  
          // Apply default fills & add to group
          self.sView.add(el);
          self.svgSide.append(self.sView);
          // self.defaultColor();
          // //SideVertical.append(self.svgSide.clone(self.sView));
        });
  
      });
  
    }
  
    loadInfield2Welt() {
      const self = this;
  
      Snap.load('assets/images/nystix/nys_infield_dwelt_back.svg', (f) => {
        this.svgMain.attr({ viewBox: '-50 0 400 400' });
  
        const g = f.selectAll('#inf_dw_x5F_vw3_x5F_bfg, #inf_dw_x5F_vw3_x5F_mid, #inf_dw_x5F_vw3_x5F_wst, #inf_dw_x5F_vw3_x5F_wlt, #inf_dw_x5F_vw3_x5F_bnd, #inf_dw_x5F_vw3_x5F_logo, #inf_dw_x5F_vw3_x5F_web, #inf_dw_x5F_vw3_x5F_plm, #inf_dw_x5F_vw3_x5F_stch, #inf_dw_x5F_vw3_x5F_lce, #inf_dw_x5F_dwelt_x5F_back, #inf_dw_x5F_vw3_x5F_rse, inf_dw_x5F_vw3_x5F_elt, inf_dw_x5F_elite_x5F_logo, inf_dw_x5F_rise_x5F_logo');
        g.forEach((el, i) => {
          const p = ['inf_dw_x5F_vw3_x5F_bfg', 'inf_dw_x5F_vw3_x5F_mid', 'inf_dw_x5F_vw3_x5F_wst', 'inf_dw_x5F_vw3_x5F_wlt', 'inf_dw_x5F_vw3_x5F_bnd', 'inf_dw_x5F_vw3_x5F_logo', 'inf_dw_x5F_vw3_x5F_web', 'inf_dw_x5F_vw3_x5F_plm', 'inf_dw_x5F_vw3_x5F_stch', 'inf_dw_x5F_vw3_x5F_lce', 'inf_dw_x5F_dwelt_x5F_back', 'inf_dw_x5F_vw3_x5F_rse', 'inf_dw_x5F_vw3_x5F_elt', 'inf_dw_x5F_elite_x5F_logo', 'inf_dw_x5F_rise_x5F_logo'];
          const layer = p[i];
          const filter = layer.split('_').pop();
  
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
            el.attr({ stroke: '#FFFAFA' });
          } else {
  
            el.attr({ fill: '#FFFAFA' });
          }
  
          self.oView.add(el);
          self.svgMain.append(self.oView);
  
        });
  
      });
  
      Snap.load('assets/images/nystix/nys_infield_dwelt_pocket.svg', (f) => {
        this.svgInside.attr({ viewBox: '0 0 400 400' });
        // this.gloveCloneInsideVertical.attr({ viewBox: "0 0 400 400" });
        const g = f.selectAll('#inf_dw_x5F_vw2_x5F_web, #inf_dw_x5F_vw2_x5F_plm, #inf_dw_x5F_vw2_x5F_mid, #inf_dw_x5F_vw2_x5F_bfg, #inf_dw_x5F_vw2_x5F_wlt, #inf_dw_x5F_vw2_x5F_bnd,#inf_dw_x5F_vw2_x5F_stch, #inf_dw_x5F_vw2_x5F_lce, #inf_dw_x5F_dwelt_x5F_inside');
        g.forEach((el, i) => {
          const p = ['inf_dw_x5F_vw2_x5F_web', 'inf_dw_x5F_vw2_x5F_plm', 'inf_dw_x5F_vw2_x5F_mid', 'inf_dw_x5F_vw2_x5F_bfg', 'inf_dw_x5F_vw2_x5F_wlt', 'inf_dw_x5F_vw2_x5F_bnd', 'inf_dw_x5F_vw2_x5F_stch', 'inf_dw_x5F_vw2_x5F_lce', 'inf_dw_x5F_dwelt_x5F_inside'];
          const layer = p[i];
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
  
          self.iView.add(el);
          self.svgInside.append(this.iView);
          // self.defaultColor();
  
        });
      });
  
      Snap.load('assets/images/nystix/nys_infield_dwelt_side.svg', (f) => {
        this.svgSide.attr({ viewBox: '-50 0 400 400' });
        // this.gloveCloneSideVertical.attr({ viewBox: "0 0 400 400" });
        // tslint:disable-next-line: max-line-length
        const g = f.selectAll('#inf_dw_x5F_vw1_x5F_plm, #inf_dw_x5F_vw1_x5F_bfg, #inf_dw_x5F_vw1_x5F_mid, #inf_dw_x5F_vw1_x5F_wlt, #inf_dw_x5F_vw1_x5F_web, #inf_dw_x5F_vw1_x5F_wst, #inf_dw_x5F_vw1_x5F_stch, #inf_dw_x5F_vw1_x5F_bnd, #inf_dw_x5F_vw1_x5F_lce, #inf_dw_x5F_vw1_x5F_logo, #inf_dw_x5F_dwelt_x5F_side');
  
        g.forEach((el, i) => {
          // tslint:disable-next-line: max-line-length
          const p = ['inf_dw_x5F_vw1_x5F_plm', 'inf_dw_x5F_vw1_x5F_bfg', 'inf_dw_x5F_vw1_x5F_mid', 'inf_dw_x5F_vw1_x5F_wlt', 'inf_dw_x5F_vw1_x5F_web', 'inf_dw_x5F_vw1_x5F_wst', 'inf_dw_x5F_vw1_x5F_stch', 'inf_dw_x5F_vw1_x5F_bnd', 'inf_dw_x5F_vw1_x5F_lce', 'inf_dw_x5F_vw1_x5F_logo, inf_dw_x5F_dwelt_x5F_side'];
          const layer = p[i];
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
  
          self.sView.add(el);
          self.svgSide.append(self.sView);
        });
      });
    }
  
    // ** Loads pitcher glove canvas */
    loadPitcher() {
      const self = this;
  
      // tslint:disable-next-line: only-arrow-functions
      Snap.load('assets/images/nystix/nys_pitcher_open_back.svg', function (f) {
        self.svgMain.attr({ viewBox: '0 0 400 400' });
        //MainVertical.attr({ viewBox: '0 0 400 400' });
        const g = f.selectAll(' #pitcher_x5F_vw3_x5F_wst, #pitcher_x5F_vw3_x5F_logo, #pitcher_x5F_vw3_x5F_thbi, #pitcher_x5F_vw3_x5F_plm, #pitcher_x5F_vw3_x5F_web, #pitcher_x5F_vw3_x5F_indi, #pitcher_x5F_vw3_x5F_indo, #pitcher_x5F_vw3_x5F_mid, #pitcher_x5F_vw3_x5F_rngo, #pitcher_x5F_vw3_x5F_rngi, #pitcher_x5F_vw3_x5F_pnko, #pitcher_x5F_vw3_x5F_pnki, #pitcher_x5F_vw3_x5F_stch, #pitcher_x5F_vw3_x5F_wlt, #pitcher_x5F_vw3_x5F_bnd, #pitcher_x5F_vw3_x5F_bnd, #pitcher_x5F_vw3_x5F_lce, #pitcher_x5F_open_x5F_back,#pitcher_x5F_vw3_x5F_rse,#pitcher_x5F_vw3_x5F_elt,#pitcher_x5F_logo_x5F_elite,#pitcher_x5F_logo_x5F_rise');
        g.forEach(function (el, i) {
          const p = ['pitcher_x5F_vw3_x5F_wst', 'pitcher_x5F_vw3_x5F_logo', 'pitcher_x5F_vw3_x5F_thbi', 'pitcher_x5F_vw3_x5F_plm', 'pitcher_x5F_vw3_x5F_web', 'pitcher_x5F_vw3_x5F_indi', 'pitcher_x5F_vw3_x5F_indo', 'pitcher_x5F_vw3_x5F_mid', 'pitcher_x5F_vw3_x5F_rngo', 'pitcher_x5F_vw3_x5F_rngi', 'pitcher_x5F_vw3_x5F_pnko', 'pitcher_x5F_vw3_x5F_pnki', 'pitcher_x5F_vw3_x5F_stch', 'pitcher_x5F_vw3_x5F_wlt', 'pitcher_x5F_vw3_x5F_bnd', 'pitcher_x5F_vw3_x5F_bnd', 'pitcher_x5F_vw3_x5F_lce', 'pitcher_x5F_open_x5F_back', 'pitcher_x5F_vw3_x5F_rse', 'pitcher_x5F_vw3_x5F_elt', 'pitcher_x5F_logo_x5F_elite', 'pitcher_x5F_logo_x5F_rise'];
          const layer = p[i];
          const filter = layer.split('_').pop();
  
          // Apply default fills & add to group
          if (_.includes(layer, 'stch')) {
            el.attr({ fill: 'none' });
          } else {
            el.attr({ fill: '#FFFAFA' });
          }
  
          self.oView.add(el);
          self.svgMain.append(self.oView);
          // self.defaultColor();
        });
      });
  
      // tslint:disable-next-line: only-arrow-functions
      Snap.load('assets/images/nystix/nys_pitcher_side_view.svg', function (f) {
        self.svgInside.attr({ viewBox: '0 0 400 400' });
        //self.gloveCloneSideVertical.attr({ viewBox: '0 0 400 400' });
        const g = f.selectAll('#pitcher_x5F_vw1_x5F_lin,#pitcher_x5F_vw1_x5F_bfg,#pitcher_x5F_vw1_x5F_plm,#pitcher_x5F_vw1_x5F_web,#pitcher_x5F_vw1_x5F_wst,#pitcher_x5F_vw1_x5F_logo, #pitcher_x5F_vw1_x5F_wlt, #pitcher_x5F_vw1_x5F_bnd, #pitcher_x5F_vw1_x5F_stch, #pitcher_x5F_vw1_x5F_lce,#pitcher_x5F_open_x5F_side');
        // tslint:disable-next-line: only-arrow-functions
        g.forEach(function (el, i) {
          const p = ['pitcher_x5F_vw1_x5F_lin', 'pitcher_x5F_vw1_x5F_bfg', 'pitcher_x5F_vw1_x5F_plm', 'pitcher_x5F_vw1_x5F_web', 'pitcher_x5F_vw1_x5F_wst', 'pitcher_x5F_vw1_x5F_logo', 'pitcher_x5F_vw1_x5F_wlt', 'pitcher_x5F_vw1_x5F_bnd', 'pitcher_x5F_vw1_x5F_stch', 'pitcher_x5F_vw1_x5F_lce', 'pitcher_x5F_open_x5F_side'];
          const layer = p[i];
  
          // Apply default fills & add to group
          // self.defaultColor(p[i], el, self.iView);
  
          self.iView.add(el);
          self.svgInside.append(self.iView);
          // self.defaultColor();
        });
  
      });
    }

    @HostListener("window:beforeunload", ["$event"])
    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.unsubscribe$.next(true);
      this.unsubscribe$.unsubscribe();
    }

}
