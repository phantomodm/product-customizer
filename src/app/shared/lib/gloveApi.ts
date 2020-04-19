import { Injectable } from "@angular/core";
import { STEPS, Glove, WebFilter } from "../models/wizard.models";
import { Subject, BehaviorSubject } from "rxjs";
import { GloveColors, HtmlInputValue } from "../models/nine-positions-models";
import { GloveDataService } from "../services/gloveData";
import { Drawing } from "./snap.drawing.function";
import "snapsvg-cjs";
import * as _ from "lodash";

import { gloveCanvas } from "../data/api-data";
//import { StorageService } from '../services/storage-service.service';

declare var Snap: any;
declare var $: any;
declare var jQuery: any;

@Injectable({
  providedIn: "root",
})
export class GloveApi {
  //**Variables for Snapsvg canvas views for Glove and selection options */
  m1: any;
  m2: any;
  m3: any;
  v1: any;
  v2: any;
  v3: any;
  oView: any;
  iView: any;
  sView: any;
  bgroup1: any;
  bgroup2: any;
  bgroup3: any;
  dexterity: any;
  handSizeGroup: any;
  fieldMap: any;
  vFieldMap: any;
  gloveHand: any;
  handSize: any;
  customGloveData: Glove;
  verticalMainGroup: any;
  verticalInsideGroup: any;
  verticalSideGroup: any;
  vgroup1: any;
  vgroup2: any;
  vgroup3: any;

  webStorage: boolean;
  leatherPart: boolean;

  gloveCloneSummary1: any;
  gloveCloneSummary2: any;
  gloveCloneSummary3: any;

  svgCloneSummary = [
    "gloveCloneSummary1",
    "gloveCloneSummary2",
    "gloveCloneSummary3",
  ];

  //** Glove model shorten properties*/
  gloveBody;
  gloveSeries;
  gloveSeriesArray: Set<any> = new Set([]);

  //Glove type shorthand (cm:Catcher, of:Outfield, inf:Infield, fbase:First Base, pitcher) */
  gloveType;
  //** Part of glove currently active */
  imageType;
  //**Step 5 slider configuration */
  slider;
  //**Array of canvas button locations, used to apply and reapply checkmark to touched sections */
  indicatorMap;
  //**Form Values saved to glove data object */
  formValues;

  //** Observable declarations for tracking window resolution and confirmation dialog. */
  notify = new Subject<any>();
  notifyObservables$ = this.notify.asObservable();

  //**Form properties and observables stream containers. */
  private formSubject = new BehaviorSubject<any>({});
  formObservable$ = this.formSubject.asObservable();
  tempFormArray = {};

  //**Store array that contains filtered lists of pictures for selected glove type. */
  updateImageFilter;
  private imageFilter = new BehaviorSubject([]);
  imageFilter$ = this.imageFilter.asObservable();

  selectedWebFilter: WebFilter[];
  private webFilter = new BehaviorSubject([]);
  webFilter$ = this.webFilter.asObservable();

  //** Loading properties and observable stream */
  isLoading = new Subject<boolean>();
  isLoading$ = this.isLoading.asObservable();

  canvasListener = new Subject<boolean>();
  canvasListener$ = this.canvasListener.asObservable();

  currentGloveType = new Subject<string>();
  currentGloveType$ = this.currentGloveType.asObservable();

  //** Observable that manages frontend glove color sliders, leather color and stitching color */
  currentGlovePart = new Subject<boolean>();
  currentGlovePart$ = this.currentGlovePart.asObservable();

  currentLeatherType = new Subject<string>();
  currentLeatherType$ = this.currentLeatherType.asObservable();

  //**Web database */
  webData$ = this.gloveData.getPositionsData();

  //** */
  gloveCustomData = [];
  gloveHandSizeData = [];

  //** Wizard Step Workflow tracking. Used to track end of sub-menu sections and display NEXT buttons to next Main Menu section*/
  workflow = [
    {
      subForm1: {
        complete: false,
        menu: [
          { step: STEPS.sportPlayed, valid: false },
          { step: STEPS.gloveSeries, valid: false },
          { step: STEPS.gloveType, valid: false },
          { step: STEPS.gloveHand, valid: false },
          { step: STEPS.handSize, valid: false },
          { step: STEPS.gloveBreaking, valid: false },
          { step: STEPS.glovePadding, valid: false },
        ],
      },
    },
    {
      subForm2: {
        complete: false,
        menu: [
          { step: STEPS.gloveSize, valid: false },
          { step: STEPS.gloveWeb, valid: false },
          { step: STEPS.glovePersonalization, valid: false },
          { step: STEPS.gloveName, valid: false },
        ],
      },
    },
    {
      subForm3: {
        complete: false,
        menu: [],
      },
    },
  ];

  gloveDesignData: GloveColors[] = [];
  embroiderySliderData: GloveColors[] = [];
  wizardSteps = [];
  defaultFill = "#c0c0c0";
  strokeFill = "#c0c0c0";
  btnFill = "rgba(10,134,61,0.4)";
  svgBtnFill = "rgba(10,134,61,0.4)";
  currentAttrib: string;

  constructor(private gloveData: GloveDataService) {
    this.initializeModel();
    this.gloveBody = this.customGloveData.gloveBody;
    this.gloveSeries = this.customGloveData.gloveSeries;
    this.gloveType = this.customGloveData.gloveType;
    this.imageType = this.customGloveData.imageType;
    this.currentAttrib = this.customGloveData.currentAttrib;
    this.slider = this.customGloveData.slider;
    this.indicatorMap = this.customGloveData.indicatorCanvasMap;
    this.formValues = this.customGloveData.formValues;
    this.currentGlovePart.next(false);
    this.currentLeatherType.next("steer");
    this.gloveData.getCustomParts().subscribe((val) => {
      _.forEach(val, (v) => {
        this.gloveCustomData.push(v);
      });
    });

    this.gloveData.getWizardSteps().subscribe((val) => {
      if (_.has(val, "gloveFit")) {
        this.wizardSteps.push(val);
      }
    });

    this.gloveData.getGloveColors().subscribe((val) => {
      this.gloveDesignData = [];
      this.embroiderySliderData = [];
      _.forEach(val, (v) => {
        _.forEach(v.gloveSections, (f) => {
          if (_.isEqual(f, "leather")) {
            this.gloveDesignData.push(v);
          }

          if (_.isEqual(f, "embroidery")) {
            this.embroiderySliderData.push(v);
          }
        });
      });
    });
  }

  initializeModel() {
    this.customGloveData = {
      gloveType: "",
      imageType: "",
      currentAttrib: "",
      currModel: "",
      gloveSeries: {},
      formValues: {},
      gloveBody: { gloveHand: "", handSize: "" },
      gloveDescription: "",
      isYouthGlove: false,
      indicatorCanvasMap: [],
      slider: {
        handSliderMax: "",
        handSliderMin: "",
        handSliderStep: 0.25,
        handSliderVertical: true,
        handSliderLabel: true,
        handSliderValue: "",
        tickInterval: 1,
      },
      shoWebType: "",
    };
    this.formValues = {};
    this.gloveBody = {};
    this.gloveSeries = {};
    this.slider = {
      handSliderMax: "0",
      handSliderMin: "22",
      handSliderStep: 0.25,
      handSliderVertical: true,
      handSliderLabel: true,
      handSliderValue: "",
      tickInterval: 1,
    };
  }

  //* Function to add broadcast data to Observable subscribers */
  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

  // Workflow/Wizard management functions. Needed to track answered questions to progress between parent wizard steps
  getWizardStatus(subMenu: string): boolean {
    let valid = false;
    _.forEach(this.workflow, (r) => {
      _.forEach(r, (value, key) => {
        //  key === subMenu ? valid = value.complete  : null;
        if (key === subMenu) {
          valid = value.complete;
        }
      });
    });
    return valid;
  }

  setWizardStatus(subMenu: string, subMenuStatus?: boolean): boolean {
    const menu = subMenu;
    let status = false;
    _.forEach(this.workflow, (r) => {
      _.forEach(r, (value, key) => {
        if (key === menu) {
          if (subMenuStatus != true || (subMenuStatus = null || undefined)) {
            value.complete = true ? (status = true) : (status = false);
          } else {
            value.complete = true;
            status = true;
          }
        }
      });
    });

    return status;
  }

  setWorkFlowValidity(menuName: any, completedStep: any): any {
    _.forEach(this.workflow, (model) => {
      _.forEach(model, (value: any, key) => {
        if (key == menuName) {
          _.forEach(value, (results) => {
            if (results.step == completedStep) {
              //console.log(results.step, completedStep)
              results.valid = true;
            }
          });
        }
      });
    });
  } // END Workflow/Wizard state management

  //Function setting glove & web selection.
  //** Push filtered web array to webFilter$ Observable */
  async setGloveType(gloveTypeSelected) {
    const id = gloveTypeSelected;
    let htmlId;
    let htmlValue;
    this.updateImageFilter = [];
    this.selectedWebFilter = [];
    _.forEach(this.wizardSteps, (w) => {
      _.forEach(w.positions, (p) => {
        _.forEach(p.options, (o) => {
          if (id === o.shortName) {
            this.gloveType = o.shortName;
            this.customGloveData.gloveDescription = o.fullName.toLowerCase();
            this.customGloveData.shoWebType = o.webType;
            let currentGlove = this.customGloveData.shoWebType;
            htmlId = o.id;
            htmlValue = { id: o.id, value: o.value };
            this.currentGloveType.next(o.webType);
          }
        });
        return 1;
      });
    });

    //this.imageFilter.next(this.updateImageFilter);
    //this._applyHtmlInput(htmlValue);
  }

  //** Sets customer web choice */
  selectedWeb = (webName: string, formValue: string) => {
    const id = webName;
    const value = formValue;
    this.gloveBody.webSelected = id;
    _.forEach(this.wizardSteps, (w) => {
      _.forEach(w.gloveWeb, (web) => {
        _.forEach(web.options, (o) => {
          if (_.isEqual(id, o.valueString)) {
            this.gloveBody.webSelected = o.valueString;
          }

          // if (_.isEqual(value, o.value)) {
          //     //console.log(o.value)
          //     this._applyHtmlInput({'id': o.id,'value': o.value})
          // }
        });
      });
    });
  };

  //End Web Functions

  // Frontend UI slider configuration and functions
  //** Returns slider value to index function for front-end slider */
  valueToIndex(color: string, db): number {
    return _.indexOf(db, color, 0);
  }

  //** Front-end sliderSelectionBarColor selector  */
  setSliderColor(num: number, db: any) {
    const index = num;
    let color;
    let i;
    for (i = 0; i < db.length; i++) {
      if (index === i) {
        color = db[i].hex;
      }

      if (color === "#ffffff") {
        color = "#c6c6c6";
      }
    }
    return color;
  }

  //** Returns slider index to value function for front-end slider */
  indexToValue(index: number, db): string {
    return db[index];
  }

  // Functions supporting front-end form functionality
  //** Initial form values */
  getFormValues() {
    return {
      sportPlayed: "",
      gloveType: "",
      gloveHand: "",
      handSize: "",
      gloveSize: "",
      glovePadding: "",
      gloveBreaking: "",
      gloveFont: "",
      gloveName: "",
      gloveSeries: "",
      gloveWeb: "",
    };
  }

  //**Saves reactive forms input. Called from wizard parent component */
  saveFormValues(obj) {
    if (!_.isEqual(obj, this.tempFormArray)) {
      //console.log("Token being saved to store:")
      let token = {};
      _.forOwn(obj, (value, key) => {
        this.formValues[key] = value;
        token[key] = value;
      });
      this.tempFormArray = _.assignIn(this.tempFormArray, token);

      //** Save current temp form data to model */
      _.assignIn(this.formValues, this.tempFormArray);
      this.formSubject.next(token);
      //this.storage.saveToStorage(this.formValues);
    } else {
      return false;
    }
  }

  saveFormValuesFromComponent(obj) {
    _.assignIn(this.tempFormArray, obj);
    this.formSubject.next(this.tempFormArray);
  }

  // End of Form Function Section

  // Begin Glove Specification management

  // TODO Possibly replacable by Renderer2 function
  //** Collects and sets customer input for hand customer wears glove on question #3 */
  setGloveHand(gloveHand: string, htmlValue: HtmlInputValue) {
    const id = gloveHand;
    this.gloveBody.gloveHand = id;
    this._applyHtmlInput(htmlValue);
  }

  //** Sets selected glove size */
  setGloveSize = (event: any) => {
    let value = event.toString();
    _.forEach(this.wizardSteps, (w) => {
      _.forEach(w.gloveSize, (g) => {
        _.forEach(g.options, (o) => {
          if (o.valueString === value) {
            this._applyHtmlInput({ id: o.id, value: o.value });
          }
        });
      });
    });
  };

  //** Collects customer input description of hand question#4. */
  //** If Small Hands is selected a popup ask if glove is for youth player */
  setHandSize(handSizeId: string, htmlValue: HtmlInputValue) {
    const id = handSizeId;
    this.gloveBody.handSize = id;
    this.applyHtmlInput(htmlValue);
  }

  private _applyHtmlInput(inputValue: HtmlInputValue) {
    const formId = `attribute_${inputValue.id}`;
    try {
      jQuery(`#${inputValue.id}`).val(inputValue.value);
      jQuery(`#${inputValue.id}`).trigger("change").trigger("select.fs");
    } catch (error) {
      //console.log("Dev Mode...")
    }
  }

  applyHtmlInput(htmlValue: HtmlInputValue) {
    this._applyHtmlInput(htmlValue);
  }

  updateWebFilter() {
    this.webFilter.next(this.selectedWebFilter);
  }

  //** Filters selected glove options and sets slider values for question5 */
  setPosition(selected: string) {
    if (this.gloveType === selected) {
      return false;
    } else {
      this.gloveType = selected;
      this.clearGloveCanvas();
      switch (this.gloveType) {
        case "inf":
          this.setGloveType(selected);
          this.setGloveSizeSlider("11.00", "12.00", 0.25);
          this.loadInfield();
          break;
        case "of":
          this.setGloveType(selected);
          this.setGloveSizeSlider("12.00", "13.00", 0.25);
          this.loadOutfield();
          break;
        case "fbase":
          this.setGloveType(selected);
          this.setGloveSizeSlider("12.50", "13.00", 0.25);
          this.loadFbase();
          break;
        case "cm":
          this.setGloveType(selected);
          this.setGloveSizeSlider("31.50", "34.00", 0.5);
          this.loadCatcher();

          break;
        case "pitcher":
          this.setGloveType(selected);
          this.setGloveSizeSlider("11.00", "12.50", 0.25);
          this.loadPitcher();

          break;
        default:
      }
    }
    return 1;
  }

  //Frontend Canvas Support Functions
  //** Clears canvas of previously loaded glove on canvas*/
  clearGloveCanvas = () => {
    this.oView.clear(), this.iView.clear(), this.sView.clear();
    this.bgroup1.clear(), this.bgroup2.clear(), this.bgroup3.clear();
    this.gloveCloneSummary1.clear(),
      this.gloveCloneSummary2.clear(),
      this.gloveCloneSummary3.clear();
  };

  //** Returns filtered array of images for step 5 */
  loadFilteredImages() {
    return this.imageFilter;
  }

  loadFilteredWeb() {
    return this.selectedWebFilter;
  }

  //** Sets current selected glove part equal to true or false. */
  setGloveSliderControl(selectedPart: string) {
    switch (selectedPart) {
      case "stch":
      case "logo":
      case "fgrl":
        this.currentGlovePart.next(false);
        break;
      default:
        this.currentGlovePart.next(true);
    }
  }

  //** Sets glove slider values question #5 */
  setGloveSizeSlider = (min: string, max: string, step: number) => {
    const minSize = min;
    const maxSize = max;
    const sliderStep = step;
    this.customGloveData.slider.handSliderMin = minSize;
    this.customGloveData.slider.handSliderMax = maxSize;
    this.customGloveData.slider.handSliderStep = sliderStep;
  };

  //** Sets default color of loaded glove */
  defaultColor = (l, el, grp) => {
    switch (true) {
      case l.includes("logo"):
        el.attr({ fill: this.defaultFill, id: l });
        grp.add(el);
        break;
      case l.includes("stch"):
        el.attr({ fill: "none", id: l, stroke: this.strokeFill });
        grp.add(el);
        break;
      case l.includes("rse"):
        el.attr({ fill: this.defaultFill, id: l, opacity: 1 });
        grp.add(el);

        break;
      case l.includes("elt"):
        el.attr({ fill: this.defaultFill, id: l, opacity: 0 });
        grp.add(el);
        break;
      default:
        el.attr({ fill: "#c0c0c0", id: l });
        grp.add(el);
        break;
    }
  };

  drawSvgCanvas = (canvas: any, element?: any, obj?: any) => {
    const id = canvas;
    let self = this;
    switch (id) {
      case "main":
        self.bgroup1.add(element);
        self.m1.append(self.bgroup1);
        break;
      case "inside":
        self.bgroup2.add(element);
        self.m2.append(self.bgroup2);
        break;
      case "side":
        self.bgroup3.add(element);
        self.m3.append(self.bgroup3);
        break;
      default:
      ////console.log("end of draw")
    }
  };

  svgEventListners = (element: any, obj: any) => {
    let self = this;
    element.click(function (e) {
      if (!this.hasClass("selected")) {
        self.m1.selectAll(".selected").forEach(function (el) {
          el.removeClass("selected");
        });
        self.m2.selectAll(".selected").forEach(function (el) {
          el.removeClass("selected");
        });
        self.m3.selectAll(".selected").forEach(function (el) {
          el.removeClass("selected");
        });
        this.addClass("selected");
      } else {
        this.addClass("unselected");
      }
      self.imageType = obj.name;
      _.forEach(self.gloveCustomData, (v, k) => {
        const section = v.gloveSection;
        if (section === self.imageType) {
          _.forEach(v.options, (o) => {
            self.currentAttrib = o.id;
          });
        }
      });
      self.customGloveData.currModel = obj.model;
      self.setGloveSliderControl(obj.name);
    });

    element.mouseover(function (e) {
      this.transform("s2");
    });

    element.mouseout(function (e) {
      this.transform("-s1");
    });
  };

  setGloveSeries = (valueString: string, formValue: string) => {
    let key = "series";
    let value = "value";

    if (_.includes(valueString, "elite")) {
      this.customGloveData.gloveSeries[key] = "elite";
      this.setSeriesOnGlove("elite");
      if (_.includes(valueString, "kip")) {
        this.currentLeatherType.next("kip");
      } else {
        this.currentLeatherType.next("jkip");
      }
    } else if (_.includes(valueString, "rise")) {
      this.customGloveData.gloveSeries[key] = "rise";
      this.currentLeatherType.next("steer");
      this.setSeriesOnGlove("rise");
    } else {
      this.customGloveData.gloveSeries[key] = "rise";
      this.currentLeatherType.next("steer");
      this.setSeriesOnGlove("rise");
      this.applyHtmlInput({ id: "rise series", value: "rise-series" });
      //console.log("cowhide")
    }

    this.customGloveData.gloveSeries[value] = formValue;
  };

  setSeriesOnGlove = (input?: any, element?: any) => {
    let self = this;
    let series = input;
    let currentSeries = self.gloveSeries.series;
    let comparison;
    if (!element) {
      self.gloveSeriesArray.forEach((svgElement) => {
        comparison = _.includes(svgElement.node.id, currentSeries);
        switch (comparison) {
          case false:
            svgElement.attr({ opacity: 0 });
            break;
          default:
            svgElement.attr({ opacity: 1 });
            break;
        }
      });
    } else {
      if (self.gloveSeriesArray.size < 4) {
        comparison = _.includes(element.node.id, currentSeries);
        self.gloveSeriesArray.add(element);
        switch (comparison) {
          case true:
            element.attr({ opacity: 1 });
            break;
          default:
            element.attr({ opacity: 0 });
            break;
        }
      }
    }
  };

  setInitialSeriesState(id: string, node: string, element?: any) {
    let self = this;
    const series = id;
    if (_.includes(series, "rise") || _.includes(series, "elite")) {
      element.attr({ opacity: 0 });
      self.setSeriesOnGlove(node, element);
    }
  }

  //** Function run to return current glove section and color chosen to render in glove canvas */
  setGloveCanvas = (colorString: string) => {
    const color = colorString.toLowerCase();
    const imageTypeSelected = this.imageType;
    if (!imageTypeSelected) {
      this.notifyOther({
        option: "Glove Customizer",
        value: "Please select a glove part to customize.",
      });
    } else {
      console.log(!_.isEqual(imageTypeSelected, "logo"));
      if (
        imageTypeSelected != "logo" &&
        imageTypeSelected != "fgrl" &&
        imageTypeSelected != "stch"
      ) {
        _.find(this.gloveDesignData, (o) => {
          if (_.includes(o.value, "-")) {
            o.value = _.replace(o.value, "-", " ");
          }
          if (o.value === color) {
            if (_.includes(o.value, " ")) {
              o.value = _.replace(o.value, " ", "-");
            }
            this._applyHtmlInput({ id: this.currentAttrib, value: o.value });
            this.applyFillToCanvas(o.hex);
          }
        });
      } else {
        console.log(imageTypeSelected);
        _.find(this.embroiderySliderData, (o) => {
          console.log(o.value, color);
          if (_.includes(o.value, "-")) {
            o.value = _.replace(o.value, "-", " ");
          }
          if (o.value === color) {
            if (_.includes(o.value, " ")) {
              o.value = _.replace(o.value, " ", "-");
            }
            this._applyHtmlInput({ id: this.currentAttrib, value: o.value });
            this.applyFillToCanvas(o.hex);
          }
        });
      }

      // _.forEach(this.gloveCustomData, (value, key) => {
      //     const section = value.gloveSection;
      //     if (section === imageTypeSelected) {
      //         _.forEach(value.options, (o) => {
      //             if(_.includes(o.value,'-')){
      //                 o.value = _.replace(o.value,'-'," ")
      //             }

      //             if (o.value === color) {
      //                 if(_.includes(o.value," ")){
      //                     o.value = _.replace(o.value," ", "-")
      //                 }
      //                 console.log(o.value)
      //                 this._applyHtmlInput({'id':o.id,'value':o.value});
      //                 this.applyFillToCanvas(o.hex);
      //             }
      //         })
      //     }
      // })
    }
  };

  applyFillToCanvas = (value: string) => {
    const fill = value;
    console.log(fill);
    const svgLayerSuffix = "_x5F_";
    _.forEach(gloveCanvas, (value, key) => {
      const el = value.element;
      const svgLayerId = value.svgBase;
      const svgElement = `#${this.gloveType}${svgLayerId}${svgLayerSuffix}`;
      const element = svgElement + this.imageType;
      if ($(element).length != 0) {
        $(element).attr({ fill: fill });

        if (_.includes(element, "stch")) {
          //console.log(element)
          $(element).attr({ fill: "none" });
          $(element).attr({ stroke: fill });
        }
      } else {
        if (this.imageType == "fgrl") {
          //console.log(svgElement)
          $(`${svgElement}rise`).attr({ fill: fill });
          $(`${svgElement}elite`).attr({ fill: fill });
        }
        return null;
      }
    });
    this.gloveCloneSummary1.append(this.m1.clone(this.oView));
    this.gloveCloneSummary2.append(this.m2.clone(this.iView));
    this.gloveCloneSummary3.append(this.m3.clone(this.sView));
    this.gloveCloneSummary1.selectAll("rect").attr({ opacity: 0 });
    this.gloveCloneSummary2.selectAll("rect").attr({ opacity: 0 });
    this.gloveCloneSummary3.selectAll("rect").attr({ opacity: 0 });
    this.setCheckStatus(this.indicatorMap, true, this.imageType);
  };

  //** Rerenders all check marks on indicators, for glove sections that where previously "touched" */
  setCheckStatus = (db, status, glvePart) => {
    let self = this;
    const statusCheckMark =
      '<path id="check_mark" d="M50.1 25.2l7.1 7.2 16.7-16.8" stroke="white" pointer-events="none" stroke-width=3 />';
    _.forEach(db, (o) => {
      _.forEach(o, (value, key) => {
        if (o.name === glvePart || o.touched == true) {
          o.touched = status;
          _.forEach(o.canvas, function (s) {
            switch (s) {
              case "mOutside":
                self.m1.selectAll("#" + o.name).forEach(function (el) {
                  var drawing = new Drawing(
                    statusCheckMark,
                    "t15,32 s1.2",
                    150,
                    "t" + el.getBBox().x + "," + el.getBBox().y + "t0,10s0.5",
                    self.m1
                  );
                  drawing.initDraw();
                  el.addClass("complete");
                });
                break;
              case "mInside":
                self.m2.selectAll("#" + o.name).forEach(function (el) {
                  var drawing = new Drawing(
                    statusCheckMark,
                    "t15,32 s1.2",
                    150,
                    "t" + el.getBBox().x + "," + el.getBBox().y + "t0,10s0.5",
                    self.m2
                  );
                  drawing.initDraw();
                  el.addClass("complete");
                });
                break;
              case "mSideview":
                self.m3.selectAll("#" + o.name).forEach(function (el) {
                  var drawing = new Drawing(
                    statusCheckMark,
                    "t15,32 s1.2",
                    150,
                    "t" + el.getBBox().x + "," + el.getBBox().y + "t0,10s0.5",
                    self.m3
                  );
                  drawing.initDraw();
                  el.addClass("complete");
                });
              default:
            }
          });
        }
      });
    });
  };

  private _applySvgViewBox(): void {
    this.gloveCloneSummary1.attr({ viewBox: "50 0 450 400" });
    this.gloveCloneSummary2.attr({ viewBox: "50 0 450 400" });
    this.gloveCloneSummary3.attr({ viewBox: "50 0 450 400" });
  }

  //** Loads Catcher's mitt glove canvas */
  loadCatcher = () => {
    let self = this;
    self._applySvgViewBox();
    this.m1.attr({ viewBox: "-20 -20 400 400" });
    Snap.load("assets/images/catcher_back_view.svg", (f) => {
      var g = f.selectAll(
        "#cm_x5F_vw3_x5F_utoe, #cm_x5F_vw3_x5F_thb, #cm_x5F_vw3_x5F_bfg, #cm_x5F_vw3_x5F_web, #cm_x5F_vw3_x5F_plm, #cm_x5F_vw3_x5F_lin, #cm_x5F_vw3_x5F_bnd, #cm_x5F_vw3_x5F_fpad, #cm_x5F_vw3_x5F_stch, #cm_x5F_vw3_x5F_lce, #cm_x5F_vw3_x5F_logo, #cm_x5F_open_x5F_back"
      );
      g.forEach(function (el, i) {
        var p = [
          "cm_x5F_vw3_x5F_utoe",
          "cm_x5F_vw3_x5F_thb",
          "cm_x5F_vw3_x5F_bfg",
          "cm_x5F_vw3_x5F_web",
          "cm_x5F_vw3_x5F_plm",
          "cm_x5F_vw3_x5F_lin",
          "cm_x5F_vw3_x5F_bnd",
          "cm_x5F_vw3_x5F_fpad",
          "cm_x5F_vw3_x5F_stch",
          "cm_x5F_vw3_x5F_lce",
          "cm_x5F_vw3_x5F_logo",
          "#cm_x5F_open_xF_back",
        ];
        var layer = p[i];
        var filter = layer.split("_").pop();

        //Apply default fills & add to group
        self.defaultColor(layer, el, self.oView);
        self.setInitialSeriesState(layer, filter, el);
        self.m1.append(self.oView);
      });

      var label = [
        {
          name: "plm",
          x: null,
          y: null,
          title: "palm",
          model: "palmColor",
          canvas: ["mInside", "mSideview"],
        },
        {
          name: "thb",
          x: 248,
          y: 258,
          title: "thumb finger",
          model: "thumbFinger",
          canvas: ["mOutside", "mSideview"],
        },
        {
          name: "bfg",
          x: 74,
          y: 263,
          title: "back finger",
          model: "backFinger",
          canvas: ["mOutside"],
        },
        {
          name: "utoe",
          x: 193,
          y: 52,
          title: "web base",
          model: "utoeColor",
          canvas: ["mOutside"],
        },
        {
          name: "web",
          x: null,
          y: null,
          title: "web",
          model: "webColor",
          canvas: ["mOutside", "mInside"],
        },
        //{ name: "lin", x: 142, y: 230.6, title: "lining", canvas: ["mOutside"] },
        {
          name: "fpad",
          x: 166,
          y: 208,
          title: "finger protection",
          model: "protectionColor",
          canvas: ["mOutside"],
        },
        {
          name: "lce",
          x: 312,
          y: 65,
          title: "lace",
          model: "laceColor",
          canvas: ["mOutside"],
        },
        {
          name: "fgrl",
          x: 40.1,
          y: 184.6,
          title: "finger embroidery",
          model: "seriesColor",
          canvas: ["mOutside"],
        },
        {
          name: "logo",
          x: 218,
          y: 299,
          title: "9P logo embroidery",
          model: "logoColor",
          canvas: ["mOutside", "mSideview"],
        },
        {
          name: "tgt",
          x: null,
          y: null,
          title: "targets",
          model: "targetColor",
          canvas: ["mInside"],
        },
        {
          name: "stch",
          x: null,
          y: null,
          title: "stitching",
          model: "stitchingColor",
          canvas: ["mSideview"],
        },
        {
          name: "bnd",
          x: null,
          y: null,
          title: "binding",
          model: "bindingColor",
          canvas: ["mSideview"],
        },
      ];
      this.indicatorMap = [];

      _.forEach(label, (l) => {
        (function (l) {
          if (l.x == null && l.y == null) {
            self.indicatorMap.push({
              name: l.name,
              label: l.title,
              model: l.model,
              touched: false,
              canvas: l.canvas,
            });
          } else {
            var btn = self.m1
              .rect(l.x - 6, l.y - 6, 15, 15, 50, 50)
              .attr({
                fill: self.svgBtnFill,
                selected: false,
                id: l.name,
                stroke: "white",
                strokeWidth: 2.0,
              });
            var title = Snap.parse("<title>" + l.title + "</title>");

            self.indicatorMap.push({
              name: l.name,
              label: l.title,
              model: l.model,
              touched: false,
              canvas: l.canvas,
            });

            btn.append(title);
            self.svgEventListners(btn, l);
            self.drawSvgCanvas("main", btn);
            //console.log(self.gloveCloneMainVertical.node.childNodes)
          }
        })(l),
          false;
      });
    });
    this.m2.attr({ viewBox: "-10 -20 400 400" });
    Snap.load("assets/images/catcher_inside_view.svg", (f) => {
      var g = f.selectAll(
        "#cm_x5F_vw2_x5F_plm, #cm_x5F_vw2_x5F_web, #cm_x5F_vw2_x5F_tgt, #cm_x5F_vw2_x5F_stch, #cm_x5F_vw2_x5F_bnd, #cm_x5F_vw2_x5F_lce, #cm_x5F_pocket_x5F_view"
      );

      g.forEach((el, i) => {
        var p = [
          "cm_x5F_vw2_x5F_plm",
          "cm_x5F_vw2_x5F_web",
          "cm_x5F_vw2_x5F_tgt",
          "cm_x5F_vw2_x5F_stch",
          "cm_x5F_vw2_x5F_bnd",
          "cm_x5F_vw2_x5F_lce",
          "cm_x5F_pocket_x5F_view",
        ];
        var layer = p[i];
        //Apply default fills & add to group
        self.defaultColor(layer, el, self.iView);
        //self.setInitialSeriesState(layer,filter,el);

        self.m2.append(self.iView);
        // self.gloveCloneInsideVertical.append(self.m2.clone(self.iView));
      });

      var label = [
        { name: "plm", x: 163.6, y: 163.2, title: "palm" },
        { name: "tgt", x: 138, y: 236, title: "targets" },
        { name: "web", x: 97, y: 70, title: "web" },
        { name: "bnd", x: 238, y: 20.5, title: "bind" },
      ];

      _.forEach(label, (l) => {
        (function (l) {
          var btn = self.m2
            .rect(l.x - 6, l.y - 6, 15, 15, 50, 50)
            .attr({
              fill: self.svgBtnFill,
              selected: false,
              id: l.name,
              stroke: "white",
              strokeWidth: 2.0,
            });
          // var vBtn = self.gloveCloneInsideVertical.rect(l.x - 6, l.y - 6, 15, 15, 50, 50).attr({ fill: self.svgBtnFill, selected: false, id: l.name, stroke: 'white', strokeWidth: 2.0 });
          var title = Snap.parse("<title>" + l.title + "</title>");
          btn.append(title);
          self.svgEventListners(btn, l);
          self.drawSvgCanvas("inside", btn);
        })(l),
          false;
      });
    });
    this.m3.attr({ viewBox: "-20 0 400 400" });
    Snap.load("assets/images/catcher_side_view.svg", (f) => {
      var g = f.selectAll(
        "#cm_x5F_vw1_x5F_utoe, #cm_x5F_vw1_x5F_thb, #cm_x5F_vw1_x5F_logo, #cm_x5F_vw1_x5F_bnd, #cm_x5F_vw1_x5F_plm, #cm_x5F_vw1_x5F_web, #cm_x5F_vw1_x5F_fpad, #cm_x5F_vw1_x5F_stch, #cm_x5F_vw1_x5F_lce, #cm_x5F_side_x5F_view"
      );

      g.forEach((el, i) => {
        var p = [
          "cm_x5F_vw1_x5F_utoe",
          "cm_x5F_vw1_x5F_thb",
          "cm_x5F_vw1_x5F_logo",
          "cm_x5F_vw1_x5F_bnd",
          "cm_x5F_vw1_x5F_plm",
          "cm_x5F_vw1_x5F_web",
          "cm_x5F_vw1_x5F_fpad",
          "cm_x5F_vw1_x5F_stch",
          "cm_x5F_vw1_x5F_lce",
          "cm_x5F_side_x5F_view",
        ];
        var layer = p[i];

        //Apply default fills & add to group
        self.defaultColor(layer, el, self.sView);
        self.m3.append(self.sView);
      });

      var label = [
        { name: "psnl_font", x: 150, y: 175, title: "personalization" },
        // { name: "utoe", x: 150, y: 61, title: "web base" },
        { name: "bnd", x: 134, y: 121, title: "binding" },
        { name: "stch", x: 185, y: 147, title: "stitching" },
        { name: "logo", x: 96, y: 147, title: "9P logo" },
      ];

      _.forEach(label, (l) => {
        (function (l) {
          var btn = self.m3
            .rect(l.x - 6, l.y - 6, 15, 15, 50, 50)
            .attr({
              fill: self.svgBtnFill,
              selected: false,
              id: l.name,
              stroke: "white",
              strokeWidth: 2.0,
            });
          var title = Snap.parse("<title>" + l.title + "</title>");
          btn.append(title);
          self.svgEventListners(btn, l);
          self.drawSvgCanvas("side", btn);
        })(l),
          false;
      });
    });
  };

  //** Loads outfield glove canvas */
  loadOutfield = () => {
    let self = this;
    self._applySvgViewBox();
    this.m1.attr({ viewBox: "-25 -20 400 400" });
    Snap.load("assets/images/outfield_back_view.svg", (f) => {
      var g = f.selectAll(
        "#of_x5F_vw3_x5F_wst, #of_x5F_vw3_x5F_logo, #of_x5F_vw3_x5F_indo, #of_x5F_vw3_x5F_indi, #of_x5F_vw3_x5F_mid, #of_x5F_vw3_x5F_rngo, #of_x5F_vw3_x5F_rngi, #of_x5F_vw3_x5F_pnko, #of_x5F_vw3_x5F_pnki, #of_x5F_vw3_x5F_plm, #of_x5F_vw3_x5F_wlt, #of_x5F_vw3_x5F_bnd, #of_x5F_vw3_x5F_stch, #of_x5F_vw3_x5F_web, #of_x5F_vw3_x5F_lce, #of_x5F_open_x5F_back, #of_x5F_vw3_x5F_rise, #of_x5F_vw3_x5F_elite, #of_x5F_elite_x5F_logo, #of_x5F_rise_x5F_logo"
      );

      g.forEach(function (el, i) {
        var p = [
          "of_x5F_vw3_x5F_wst",
          "of_x5F_vw3_x5F_logo",
          "of_x5F_vw3_x5F_indo",
          "of_x5F_vw3_x5F_indi",
          "of_x5F_vw3_x5F_mid",
          "of_x5F_vw3_x5F_rngo",
          "of_x5F_vw3_x5F_rngi",
          "of_x5F_vw3_x5F_pnko",
          "of_x5F_vw3_x5F_pnki",
          "of_x5F_vw3_x5F_plm",
          "of_x5F_vw3_x5F_wlt",
          "of_x5F_vw3_x5F_bnd",
          "of_x5F_vw3_x5F_stch",
          "of_x5F_vw3_x5F_web",
          "of_x5F_vw3_x5F_lce",
          "of_x5F_open_x5F_back",
          "of_x5F_vw3_x5F_rise",
          "of_x5F_vw3_x5F_elite",
          "of_x5F_elite_x5F_logo",
          "of_x5F_rise_x5F_logo",
        ];
        var layer = p[i];
        var filter = layer.split("_").pop();

        self.defaultColor(layer, el, self.oView);
        self.setInitialSeriesState(layer, filter, el);
        self.m1.append(self.oView);
      });

      var label = [
        {
          name: "indo",
          x: 202,
          y: 84.3,
          title: "index outer",
          model: "indexOuter",
          canvas: ["mOutside"],
        },
        {
          name: "indi",
          x: 170.7,
          y: 84.3,
          title: "index inner",
          model: "indexInner",
          canvas: ["mOutside"],
        },
        {
          name: "mid",
          x: 124.5,
          y: 156,
          title: "middle finger",
          model: "middleInner",
          canvas: ["mOutside"],
        },
        {
          name: "rngi",
          x: 85.5,
          y: 84.3,
          title: "ring outer",
          model: "ringOuter",
          canvas: ["mOutside"],
        },
        {
          name: "rngo",
          x: 75.8,
          y: 200.8,
          title: "ring inner",
          model: "ringInner",
          canvas: ["mOutside"],
        },
        {
          name: "pnko",
          x: 55,
          y: 126.6,
          title: "pinky outer",
          model: "pinkyOuter",
          canvas: ["mOutside", "mSideview"],
        },
        {
          name: "pnki",
          x: null,
          y: null,
          title: "pinky inner",
          model: "pinkyInner",
          canvas: ["mInside"],
        },
        {
          name: "thbi",
          x: null,
          y: null,
          title: "thumb inner",
          model: "thumbInner",
          canvas: ["mSideview"],
        },
        {
          name: "wlt",
          x: 142.4,
          y: 193,
          title: "welt",
          model: "weltColor",
          canvas: ["mOutside"],
        },
        {
          name: "bnd",
          x: null,
          y: null,
          title: "bind",
          model: "bindColor",
          canvas: ["mSideview"],
        },
        //{ name: "lin", x: 132.4, y: 259, title: "lining", canvas: ["mOutside"] },
        {
          name: "wst",
          x: 110.9,
          y: 320.1,
          title: "wrist",
          model: "wristColor",
          canvas: ["mOutside", "mSideview"],
        },
        {
          name: "stch",
          x: null,
          y: null,
          title: "stiching",
          model: "stitchingColor",
          canvas: ["mSideview"],
        },
        {
          name: "logo",
          x: 200,
          y: 314.1,
          title: "9P logo",
          model: "logoColor",
          canvas: ["mOutside"],
        },
        {
          name: "fgrl",
          x: 127.9,
          y: 63.5,
          title: "finger logo",
          model: "seriesColor",
          canvas: ["mOutside"],
        },
        {
          name: "plm",
          x: null,
          y: null,
          title: "palm",
          model: "palmColor",
          canvas: ["mInside"],
        },
        {
          name: "lce",
          x: null,
          y: null,
          title: "lace",
          model: "laceColor",
          canvas: ["mInside", "mSideview"],
        },
        {
          name: "web",
          x: null,
          y: null,
          title: "web",
          model: "webColor",
          canvas: ["mInside", "mSideview"],
        },
        {
          name: "thbo",
          x: null,
          y: null,
          title: "thumb outer",
          model: "thumbOuter",
          canvas: ["mInside"],
        },
      ];

      /* Clear Indicator Canvas Map*/
      this.indicatorMap = [];

      _.forEach(label, (l) => {
        (function (l) {
          if (l.x == null && l.y == null) {
            self.indicatorMap.push({
              name: l.name,
              label: l.title,
              model: l.model,
              touched: false,
              canvas: l.canvas,
            });
          } else {
            var btn = self.m1
              .rect(l.x + 20, l.y, 15, 15, 50, 50)
              .attr({
                fill: self.svgBtnFill,
                selected: false,
                id: l.name,
                stroke: "white",
                strokeWidth: 2.0,
              });
            var title = Snap.parse("<title>" + l.title + "</title>");
            self.indicatorMap.push({
              name: l.name,
              label: l.title,
              model: l.model,
              touched: false,
              canvas: l.canvas,
            });
            btn.append(title);
            self.svgEventListners(btn, l);
            self.drawSvgCanvas("main", btn);
          }
        })(l),
          false;
      });
    });

    this.m2.attr({ viewBox: "-25 -20 400 400" });
    Snap.load("assets/images/outfield_inside_view.svg", (f) => {
      var g = f.selectAll(
        "#of_x5F_vw2_x5F_thbo, #of_x5F_vw2_x5F_thbi, #of_x5F_vw2_x5F_plm, #of_x5F_vw2_x5F_indo, #of_x5F_vw2_x5F_indi, #of_x5F_vw2_x5F_mid, #of_x5F_vw2_x5F_rngo, #of_x5F_vw2_x5F_rngi, #of_x5F_vw2_x5F_pnki, #of_x5F_vw2_x5F_pnko, #of_x5F_vw2_x5F_wlt, #of_x5F_vw2_x5F_web, #of_x5F_vw2_x5F_bnd, #of_x5F_vw2_x5F_stch, #of_x5F_vw2_x5F_lce, #of_x5F_open_x5F_pocket"
      );

      g.forEach((el, i) => {
        var p = [
          "of_x5F_vw2_x5F_thbo",
          "of_x5F_vw2_x5F_thbi",
          "of_x5F_vw2_x5F_plm",
          "of_x5F_vw2_x5F_indo",
          "of_x5F_vw2_x5F_indi",
          "of_x5F_vw2_x5F_mid",
          "of_x5F_vw2_x5F_rngo",
          "of_x5F_vw2_x5F_rngi",
          "of_x5F_vw2_x5F_pnki",
          "of_x5F_vw2_x5F_pnko",
          "of_x5F_vw2_x5F_wlt",
          "of_x5F_vw2_x5F_web",
          "of_x5F_vw2_x5F_bnd",
          "of_x5F_vw2_x5F_stch",
          "of_x5F_vw2_x5F_lce",
          "of_x5F_open_x5F_pocket",
        ];
        var layer = p[i];
        self.defaultColor(layer, el, self.iView);
        self.m2.append(self.iView);
        // self.gloveCloneInsideVertical.append(self.m2.clone(self.iView));
      });

      //Label and indicator
      var label = [
        { name: "plm", x: 201, y: 215, title: "palm" },
        { name: "web", x: 102, y: 133, title: "web" },
        { name: "pnki", x: 350, y: 111.5, title: "pinky inner" },
        { name: "thbo", x: 84, y: 236, title: "Thumb Outer" },
      ];

      _.forEach(label, (l) => {
        (function (l) {
          var btn = self.m2
            .rect(l.x, l.y, 15, 15, 50, 50)
            .attr({
              fill: self.svgBtnFill,
              selected: false,
              id: l.name,
              stroke: "white",
              strokeWidth: 2.0,
            });
          // var vBtn = self.gloveCloneInsideVertical.rect(l.x - 6, l.y - 6, 15, 15, 50, 50).attr({ fill: self.svgBtnFill, selected: false, id: l.name, stroke: 'white', strokeWidth: 2.0 });
          var title = Snap.parse("<title>" + l.title + "</title>");
          btn.append(title);
          self.svgEventListners(btn, l);
          self.drawSvgCanvas("inside", btn);
        })(l),
          false;
      });
    });

    this.m3.attr({ viewBox: "-20 -20 400 400" });
    Snap.load("assets/images/outfield_side_view.svg", (f) => {
      var g = f.selectAll(
        "#of_x5F_vw1_x5F_wst,#of_x5F_vw1_x5F_logo, #of_x5F_vw1_x5F_thbi, #of_x5F_vw1_x5F_thbo, #of_x5F_vw1_x5F_indo, #of_x5F_vw1_x5F_plm,#of_x5F_vw1_x5F_web, #of_x5F_vw1_x5F_bnd, #of_x5F_vw1_x5F_wlt, #of_x5F_vw1_x5F_stch, #of_x5F_vw1_x5F_lce, #of_x5F_side_x5F_view"
      );

      g.forEach((el, i) => {
        var p = [
          "of_x5F_vw1_x5F_wst",
          "of_x5F_vw1_x5F_logo",
          "of_x5F_vw1_x5F_thbi",
          "of_x5F_vw1_x5F_thbo",
          "of_x5F_vw1_x5F_indo",
          "of_x5F_vw1_x5F_plm",
          "of_x5F_vw1_x5F_web",
          "of_x5F_vw1_x5F_bnd",
          "of_x5F_vw1_x5F_wlt",
          "of_x5F_vw1_x5F_stch",
          "of_x5F_vw1_x5F_lce",
          "of_x5F_side_x5F_view",
        ];
        var layer = p[i];

        self.defaultColor(layer, el, self.sView);
        self.m3.append(self.sView);
        // self.gloveCloneSideVertical.append(self.m3.clone(self.sView));
      });
      var label = [
        { name: "stch", x: 65, y: 214, title: "Stitching" },
        { name: "bnd", x: 86, y: 273, title: "binding" },
        { name: "lce", x: 200, y: 155, title: "lacing" },
        { name: "thbi", x: 236, y: 176, title: "thumb inner" },
        { name: "wst", x: 120, y: 330, title: "thumb outer" },
      ];

      _.forEach(label, (l) => {
        (function (l) {
          var btn = self.m3
            .rect(l.x - 6, l.y - 6, 15, 15, 50, 50)
            .attr({
              fill: self.svgBtnFill,
              selected: false,
              id: l.name,
              stroke: "white",
              strokeWidth: 2.0,
            });
          // var vBtn = self.gloveCloneSideVertical.rect(l.x - 6, l.y - 6, 15, 15, 50, 50).attr({ fill: self.svgBtnFill, selected: false, id: l.name, stroke: 'white', strokeWidth: 2.0 });
          var title = Snap.parse("<title>" + l.title + "</title>");
          btn.append(title);
          self.svgEventListners(btn, l);
          self.drawSvgCanvas("side", btn);
        })(l),
          false;
      });
    });
  };

  //** Loads infield glove canvas */
  loadInfield = () => {
    let self = this;
    self._applySvgViewBox();
    this.m1.attr({ viewBox: "-20 -20 400 400" });
    Snap.load("assets/images/infield_swelt_back.svg", (f) => {
      var g = f.selectAll(
        "#inf_x5F_vw3_x5F_wst, #inf_x5F_vw3_x5F_thbi, #inf_x5F_vw3_x5F_web, #inf_x5F_vw3_x5F_indo, #inf_x5F_vw3_x5F_plm, #inf_x5F_vw3_x5F_indi, #inf_x5F_vw3_x5F_mid, #inf_x5F_vw3_x5F_rngo, #inf_x5F_vw3_x5F_rngi, #inf_x5F_vw3_x5F_pnko, #inf_x5F_vw3_x5F_pnki, #inf_x5F_vw3_x5F_logo, #inf_x5F_vw3_x5F_wlt, #inf_x5F_vw3_x5F_stch, #inf_x5F_vw3_x5F_bnd, #inf_x5F_vw3_x5F_lce, #inf_x5F_open_x5F_back,#inf_x5F_vw3_x5F_rise,#inf_x5F_vw3_x5F_elite,#inf_x5F_logo_x5F_elite,#inf_x5F_logo_x5F_rise"
      );
      g.forEach((el, i) => {
        var p = [
          "inf_x5F_vw3_x5F_wst",
          "inf_x5F_vw3_x5F_thbi",
          "inf_x5F_vw3_x5F_web",
          "inf_x5F_vw3_x5F_indo",
          "inf_x5F_vw3_x5F_plm",
          "inf_x5F_vw3_x5F_indi",
          "inf_x5F_vw3_x5F_mid",
          "inf_x5F_vw3_x5F_rngo",
          "inf_x5F_vw3_x5F_rngi",
          "inf_x5F_vw3_x5F_pnko",
          "inf_x5F_vw3_x5F_pnki",
          "inf_x5F_vw3_x5F_logo",
          "inf_x5F_vw3_x5F_wlt",
          "inf_x5F_vw3_x5F_stch",
          "inf_x5F_vw3_x5F_bnd",
          "inf_x5F_vw3_x5F_lce",
          "inf_x5F_open_x5F_back",
          "inf_x5F_vw3_x5F_rise",
          "inf_x5F_vw3_x5F_elite",
          "inf_x5F_logo_x5F_elite",
          "inf_x5F_logo_x5F_rise",
        ];
        var layer = p[i];
        var filter = layer.split("_").pop();

        //Apply default fills & add to group
        self.defaultColor(layer, el, self.oView);
        this.setInitialSeriesState(layer, filter, el);

        if (_.includes(layer, "rise") || _.includes(layer, "elite")) {
          el.attr({ opacity: 0 });
          //this.setSeriesOnGlove(filter, el);
        }

        self.m1.append(self.oView);
      });

      this.indicatorMap = [];

      //Label Values
      var label = [
        {
          name: "mid",
          x: 145,
          y: 120,
          title: "middle finger",
          model: "middleFinger",
          canvas: ["mOutside"],
        },
        {
          name: "indo",
          x: 236,
          y: 85,
          title: "index outer",
          model: "indexOuter",
          canvas: ["mOutside"],
        },
        {
          name: "indi",
          x: 205,
          y: 85,
          title: "index inner",
          model: "indexInner",
          canvas: ["mOutside"],
        },
        {
          name: "rngo",
          x: 115,
          y: 82,
          title: "ring outer",
          model: "ringOuter",
          canvas: ["mOutside"],
        },
        {
          name: "rngi",
          x: 88,
          y: 110,
          title: "ring inner",
          model: "ringInner",
          canvas: ["mOutside"],
        },
        {
          name: "pnko",
          x: 75,
          y: 180,
          title: "pinky outer",
          model: "pinkyOuter",
          canvas: ["mOutside"],
        },
        {
          name: "pnki",
          x: null,
          y: null,
          title: "pinky inner",
          model: "pinkyInner",
          canvas: ["mInside"],
        },
        {
          name: "web",
          x: null,
          y: null,
          title: "web",
          model: "webColor",
          canvas: ["mInside"],
        },
        {
          name: "bnd",
          x: null,
          y: null,
          title: "binding",
          model: "bindingColor",
          canvas: ["mInside"],
        },
        //{ name: 'lin', x: 110.6, y: 230.2, title: 'inside lining', model:'liningColor',canvas: ["mOutside"] },
        //{ name: 'fpad', x: null, y: null, title: 'finger protection', canvas: ["mSideview"] },
        {
          name: "lce",
          x: null,
          y: null,
          title: "lace",
          model: "laceColor",
          canvas: ["mSideview"],
        },
        {
          name: "stch",
          x: null,
          y: null,
          title: "stitching",
          model: "stitchingColor",
          canvas: ["mOutside"],
        },
        {
          name: "logo",
          x: 244,
          y: 300,
          title: "9P logo",
          model: "logoColor",
          canvas: ["mOutside"],
        },
        {
          name: "wlt",
          x: 178,
          y: 150,
          title: "welt",
          model: "weltColor",
          canvas: ["mOutside", "mSideview"],
        },
        {
          name: "wst",
          x: 150,
          y: 298,
          title: "wrist",
          model: "wristColor",
          canvas: ["mOutside", "mSideview"],
        },
        {
          name: "fgrl",
          x: 160,
          y: 28.9,
          title: "finger logo",
          model: "seriesColor",
          canvas: ["mOutside"],
        },
        {
          name: "thbi",
          x: null,
          y: null,
          title: "thumb inner",
          model: "thumbInner",
          canvas: ["mSideview"],
        },
        {
          name: "thbo",
          x: null,
          y: null,
          title: "thumb outer",
          model: "thumbOuter",
          canvas: ["mInside", "mSideview"],
        },
        {
          name: "plm",
          x: null,
          y: null,
          title: "palm",
          model: "palmColor",
          canvas: ["mInside", "mSideview"],
        },
      ];

      _.forEach(label, (l) => {
        (function (l) {
          if (l.x == null && l.y == null) {
            self.indicatorMap.push({
              name: l.name,
              touched: false,
              canvas: l.canvas,
            });
          } else {
            var btn = self.m1
              .rect(l.x - 6, l.y - 6, 15, 15, 50, 50)
              .attr({
                fill: self.svgBtnFill,
                selected: false,
                id: l.name,
                stroke: "white",
                strokeWidth: 2.0,
              });
            var title = Snap.parse("<title>" + l.title + "</title>");

            self.indicatorMap.push({
              name: l.name,
              touched: false,
              canvas: l.canvas,
            });
            btn.append(title);
            self.svgEventListners(btn, l);
            self.drawSvgCanvas("main", btn);
          }
        })(l),
          false;
      });
    });
    this.m2.attr({ viewBox: "0 -20 400 400" });
    Snap.load("assets/images/infield_swelt_pocket.svg", (f) => {
      var g = f.selectAll(
        "#inf_x5F_vw2_x5F_plm, #inf_x5F_vw2_x5F_thbo, #inf_x5F_vw2_x5F_thbi, #inf_x5F_vw2_x5F_indo, #inf_x5F_vw2_x5F_indi,#inf_x5F_vw2_x5F_mid,#inf_x5F_vw2_x5F_rngo,#inf_x5F_vw2_x5F_rngi,#inf_x5F_vw2_x5F_pnko,#inf_x5F_vw2_x5F_pnki, #inf_x5F_vw2_x5F_web, #inf_x5F_vw2_x5F_stch, #inf_x5F_vw2_x5F_bnd , #inf_x5F_vw2_x5F_wlt, #inf_x5F_vw2_x5F_lce, #inf_x5F_open_x5F_pocket"
      );
      g.forEach((el, i) => {
        var p = [
          "inf_x5F_vw2_x5F_plm",
          "inf_x5F_vw2_x5F_thbo",
          "inf_x5F_vw2_x5F_thbi",
          "inf_x5F_vw2_x5F_indo",
          "inf_x5F_vw2_x5F_indi",
          "inf_x5F_vw2_x5F_mid",
          "inf_x5F_vw2_x5F_rngo",
          "inf_x5F_vw2_x5F_rngi",
          "inf_x5F_vw2_x5F_pnko",
          "inf_x5F_vw2_x5F_pnki",
          "inf_x5F_vw2_x5F_web",
          "inf_x5F_vw2_x5F_stch",
          "inf_x5F_vw2_x5F_bnd",
          "inf_x5F_vw2_x5F_wlt",
          "inf_x5F_vw2_x5F_lce",
          "inf_x5F_open_x5F_pocket",
        ];
        var layer = p[i];

        //Apply default fills & add to group
        self.defaultColor(layer, el, this.iView);
        self.m2.append(this.iView);
        // self.gloveCloneInsideVertical.append(self.m2.clone(self.iView));
      });

      //Layer Values
      var label = [
        { name: "plm", x: 200, y: 167.1, title: "PALM" },
        { name: "thbo", x: 91, y: 235.5, title: "Thumb Outer" },
        //{ name: 'lce', x: 196.4, y: 30.1, title: 'lace' },
        { name: "pnki", x: 356, y: 150, title: "Pinky inner" },
        { name: "web", x: 82, y: 100, title: "Web" },
      ];

      _.forEach(label, (l) => {
        (function (l) {
          var btn = self.m2
            .rect(l.x - 6, l.y - 6, 15, 15, 50, 50)
            .attr({
              fill: self.svgBtnFill,
              selected: false,
              id: l.name,
              stroke: "white",
              strokeWidth: 2.0,
            });
          // var vBtn = self.gloveCloneInsideVertical.rect(l.x - 6, l.y - 6, 15, 15, 50, 50).attr({ fill: self.svgBtnFill, selected: false, id: l.name, stroke: 'white', strokeWidth: 2.0 });
          var title = Snap.parse("<title>" + l.title + "</title>");
          btn.append(title);
          self.svgEventListners(btn, l);
          self.drawSvgCanvas("inside", btn);
        })(l),
          false;
      });
    });
    this.m3.attr({ viewBox: "-50 -20 400 400" });
    Snap.load("assets/images/infield_swelt_side.svg", (f) => {
      //self._applySvgViewBox();
      // this.gloveCloneSideVertical.attr({ viewBox: "-50 0 400 400" });
      var g = f.selectAll(
        "#inf_x5F_vw1_x5F_thbi, #inf_x5F_vw1_x5F_mid, #inf_x5F_vw1_x5F_indi, #inf_x5F_vw1_x5F_wst, #inf_x5F_vw1_x5F_logo, #inf_x5F_vw1_x5F_plm, #inf_x5F_vw1_x5F_bnd, #inf_x5F_vw1_x5F_indo, #inf_x5F_vw1_x5F_thbo, #inf_x5F_vw1_x5F_wlt, #inf_x5F_vw1_x5F_web, #inf_x5F_vw1_x5F_stch,  #inf_x5F_vw1_x5F_lce, #inf_x5F_open_x5F_side"
      );

      g.forEach((el, i) => {
        var p = [
          "inf_x5F_vw1_x5F_thbi",
          "inf_x5F_vw1_x5F_mid",
          "inf_x5F_vw1_x5F_indi",
          "inf_x5F_vw1_x5F_wst",
          "inf_x5F_vw1_x5F_logo",
          "inf_x5F_vw1_x5F_plm",
          "inf_x5F_vw1_x5F_bnd",
          "inf_x5F_vw1_x5F_indo",
          "inf_x5F_vw1_x5F_thbo",
          "inf_x5F_vw1_x5F_wlt",
          "inf_x5F_vw1_x5F_web",
          "inf_x5F_vw1_x5F_stch",
          "inf_x5F_vw1_x5F_lce",
          "inf_x5F_open_x5F_side",
        ];

        //Apply default fills & add to group
        self.defaultColor(p[i], el, self.sView);
        self.m3.append(self.sView);
        // self.gloveCloneSideVertical.append(self.m3.clone(self.sView));
      });
      //Label values
      var label = [
        { name: "stch", x: 87.1, y: 106.1, title: "Stitching" },
        //{ name: 'web', x: 200.1, y: 123.4, title: 'Web' },
        { name: "thbi", x: 101.4, y: 275, title: "Thumb inner" },
        { name: "bnd", x: 27.1, y: 265.2, title: "Binding" },
        { name: "lce", x: 196, y: 15, title: "Lacing" },
      ];

      _.forEach(label, (l) => {
        (function (l) {
          var btn = self.m3
            .rect(l.x - 6, l.y - 6, 15, 15, 50, 50)
            .attr({
              fill: self.svgBtnFill,
              selected: false,
              id: l.name,
              stroke: "white",
              strokeWidth: 2.0,
            });
          // var vBtn = self.gloveCloneSideVertical.rect(l.x - 6, l.y - 6, 15, 15, 50, 50).attr({ fill: self.svgBtnFill, selected: false, id: l.name, stroke: 'white', strokeWidth: 2.0 });
          var title = Snap.parse("<title>" + l.title + "</title>");
          btn.append(title);
          self.svgEventListners(btn, l);
          self.drawSvgCanvas("side", btn);
        })(l),
          false;
      });
    });
  };

  //** Loads pitcher glove canvas */
  loadPitcher = () => {
    let self = this;
    self._applySvgViewBox();
    this.m1.attr({ viewBox: "-20 -20 400 400" });
    Snap.load("assets/images/pitcher_back_view.svg", function (f) {
      var g = f.selectAll(
        " #pitcher_x5F_vw3_x5F_wst, #pitcher_x5F_vw3_x5F_logo, #pitcher_x5F_vw3_x5F_thbi, #pitcher_x5F_vw3_x5F_plm, #pitcher_x5F_vw3_x5F_web, #pitcher_x5F_vw3_x5F_indi, #pitcher_x5F_vw3_x5F_indo, #pitcher_x5F_vw3_x5F_mid, #pitcher_x5F_vw3_x5F_rngo, #pitcher_x5F_vw3_x5F_rngi, #pitcher_x5F_vw3_x5F_pnko, #pitcher_x5F_vw3_x5F_pnki, #pitcher_x5F_vw3_x5F_stch, #pitcher_x5F_vw3_x5F_wlt, #pitcher_x5F_vw3_x5F_bnd, #pitcher_x5F_vw3_x5F_bnd, #pitcher_x5F_vw3_x5F_lce, #pitcher_x5F_open_x5F_back, #pitcher_x5F_vw3_x5F_rise, #pitcher_x5F_vw3_x5F_elite, #pitcher_x5F_logo_x5F_elite, #pitcher_x5F_logo_x5F_rise"
      );
      g.forEach(function (el, i) {
        var p = [
          "pitcher_x5F_vw3_x5F_wst",
          "pitcher_x5F_vw3_x5F_logo",
          "pitcher_x5F_vw3_x5F_thbi",
          "pitcher_x5F_vw3_x5F_plm",
          "pitcher_x5F_vw3_x5F_web",
          "pitcher_x5F_vw3_x5F_indi",
          "pitcher_x5F_vw3_x5F_indo",
          "pitcher_x5F_vw3_x5F_mid",
          "pitcher_x5F_vw3_x5F_rngo",
          "pitcher_x5F_vw3_x5F_rngi",
          "pitcher_x5F_vw3_x5F_pnko",
          "pitcher_x5F_vw3_x5F_pnki",
          "pitcher_x5F_vw3_x5F_stch",
          "pitcher_x5F_vw3_x5F_wlt",
          "pitcher_x5F_vw3_x5F_bnd",
          "pitcher_x5F_vw3_x5F_lce",
          "pitcher_x5F_open_x5F_back",
          "pitcher_x5F_vw3_x5F_rise",
          "pitcher_x5F_vw3_x5F_elite",
          "pitcher_x5F_logo_x5F_elite",
          "pitcher_x5F_logo_x5F_rise",
        ];
        var layer = p[i];
        var filter = layer.split("_").pop();

        //Apply default fills & add to group
        self.defaultColor(layer, el, self.oView);
        self.setInitialSeriesState(layer, filter, el);

        self.m1.append(self.oView);
        // self.gloveCloneMainVertical.append(self.m1.clone(self.oView));
      });
      self.indicatorMap = [];
      //Label Values
      var label = [
        {
          name: "mid",
          x: 145,
          y: 120,
          title: "middle finger",
          model: "middleFinger",
          canvas: ["mOutside", "mInside"],
        },
        {
          name: "indo",
          x: 236,
          y: 85,
          title: "index outer",
          model: "indexOuter",
          canvas: ["mOutside"],
        },
        {
          name: "indi",
          x: 205,
          y: 85,
          title: "index inner",
          model: "indexInner",
          canvas: ["mOutside"],
        },
        {
          name: "rngo",
          x: 115,
          y: 82,
          title: "ring outer",
          model: "ringOuter",
          canvas: ["mOutside"],
        },
        {
          name: "rngi",
          x: 88,
          y: 110,
          title: "ring inner",
          model: "ringInner",
          canvas: ["mOutside"],
        },
        {
          name: "pnko",
          x: 75,
          y: 180,
          title: "pinky outer",
          model: "pinkyOuter",
          canvas: ["mOutside"],
        },
        {
          name: "pnki",
          x: null,
          y: null,
          title: "pinky inner",
          model: "pinkyInner",
          canvas: ["mInside"],
        },
        {
          name: "web",
          x: null,
          y: null,
          title: "web",
          model: "webColor",
          canvas: ["mInside"],
        },
        {
          name: "bnd",
          x: null,
          y: null,
          title: "binding",
          model: "bindingColor",
          canvas: ["mInside"],
        },
        //{ name: 'lin', x: 110.6, y: 230.2, title: 'inside lining', canvas: ["mOutside"] },
        //{ name: 'fpad', x: null, y: null, title: 'finger protection', canvas: ["mSideview"] },
        {
          name: "lce",
          x: null,
          y: null,
          title: "lace",
          model: "laceColor",
          canvas: ["mSideview"],
        },
        {
          name: "stch",
          x: null,
          y: null,
          title: "stitching",
          model: "stitchingColor",
          canvas: ["mOutside"],
        },
        {
          name: "logo",
          x: 244,
          y: 300,
          title: "9P logo",
          model: "logoColor",
          canvas: ["mOutside"],
        },
        {
          name: "wlt",
          x: 178,
          y: 150,
          title: "welt",
          model: "weltColor",
          canvas: ["mOutside", "mSideview"],
        },
        {
          name: "wst",
          x: 150,
          y: 298,
          title: "wrist",
          model: "wristColor",
          canvas: ["mOutside", "mInside"],
        },
        {
          name: "fgrl",
          x: 160,
          y: 28.9,
          title: "finger logo",
          model: "seriesLogo",
          canvas: ["mOutside"],
        },
        {
          name: "thbi",
          x: null,
          y: null,
          title: "thumb inner",
          model: "thumbInner",
          canvas: ["mSideview"],
        },
        {
          name: "thbo",
          x: null,
          y: null,
          title: "thumb outer",
          model: "thumbOuter",
          canvas: ["mInside", "mSideview"],
        },
        {
          name: "plm",
          x: null,
          y: null,
          title: "palm",
          model: "palmColor",
          canvas: ["mInside", "mSideview"],
        },
      ];

      _.forEach(label, (l) => {
        (function (l) {
          if (l.x == null && l.y == null) {
            self.indicatorMap.push({
              name: l.name,
              touched: false,
              canvas: l.canvas,
            });
          } else {
            var btn = self.m1
              .rect(l.x - 6, l.y - 6, 15, 15, 50, 50)
              .attr({
                fill: self.svgBtnFill,
                id: l.name,
                stroke: "white",
                strokeWidth: 2.0,
              });
            var title = Snap.parse("<title>" + l.title + "</title>");
            self.indicatorMap.push({
              name: l.name,
              touched: false,
              canvas: l.canvas,
            });
            btn.append(title);
            self.svgEventListners(btn, l);
            self.drawSvgCanvas("main", btn);
          }
        })(l),
          false;
      });
    });
    this.m2.attr({ viewBox: "0 -20 400 400" });
    Snap.load("assets/images/9P_pitcher_pocket_view.svg", function (f) {
      var g = f.selectAll(
        "#pitcher_x5F_vw2_x5F_plm, #pitcher_x5F_vw2_x5F_bfg, #pitcher_x5F_vw2_x5F_bnd,  #pitcher_x5F_vw2_x5F_web, #pitcher_x5F_vw2_x5F_wlt, #pitcher_x5F_vw2_x5F_stch, #pitcher_x5F_vw2_x5F_lce, #pitcher_x5F_pocket_x5F_view"
      );
      g.forEach(function (el, i) {
        var p = [
          "pitcher_x5F_vw2_x5F_plm",
          "pitcher_x5F_vw2_x5F_bfg",
          "pitcher_x5F_vw2_x5F_bnd",
          "pitcher_x5F_vw2_x5F_web",
          "pitcher_x5F_vw2_x5F_wlt",
          "pitcher_x5F_vw2_x5F_stch",
          "pitcher_x5F_vw2_x5F_lce",
          "pitcher_x5F_pocket_x5F_view",
        ];
        var layer = p[i];

        //Apply default fills & add to group
        self.defaultColor(layer, el, self.iView);
        self.m2.append(self.iView);
        // self.gloveCloneInsideVertical.append(self.m2.clone(self.iView));
      });

      var label = [
        { name: "plm", x: 196, y: 207, title: "Palm" },
        { name: "lce", x: 188, y: 40, title: "Lace" },
        { name: "web", x: 86, y: 90, title: "Web" },
        { name: "thbo", x: 35, y: 90, title: "Thumb Outer" },
      ];

      _.forEach(label, (l) => {
        (function (l) {
          var btn = self.m2
            .rect(l.x - 6, l.y - 6, 15, 15, 50, 50)
            .attr({
              fill: self.svgBtnFill,
              selected: false,
              id: l.name,
              stroke: "white",
              strokeWidth: 2.0,
            });
          // var vBtn = self.gloveCloneInsideVertical.rect(l.x - 6, l.y - 6, 15, 15, 50, 50).attr({ fill: 'blue', selected: false, id: l.name, stroke: 'white', strokeWidth: 2.0 });
          var title = Snap.parse("<title>" + l.title + "</title>");

          btn.append(title);
          self.svgEventListners(btn, l);
          self.drawSvgCanvas("inside", btn);
        })(l),
          false;
      });
    });
    this.m3.attr({ viewBox: "-25 -20 400 400" });
    Snap.load("assets/images/pitcher_side_view.svg", function (f) {
      var g = f.selectAll(
        "#pitcher_x5F_vw1_x5F_lin,#pitcher_x5F_vw1_x5F_bfg,#pitcher_x5F_vw1_x5F_plm,#pitcher_x5F_vw1_x5F_web,#pitcher_x5F_vw1_x5F_wst,#pitcher_x5F_vw1_x5F_logo, #pitcher_x5F_vw1_x5F_wlt, #pitcher_x5F_vw1_x5F_bnd, #pitcher_x5F_vw1_x5F_stch, #pitcher_x5F_vw1_x5F_lce,#pitcher_x5F_open_x5F_side"
      );
      g.forEach(function (el, i) {
        var p = [
          "pitcher_x5F_vw1_x5F_lin",
          "pitcher_x5F_vw1_x5F_bfg",
          "pitcher_x5F_vw1_x5F_plm",
          "pitcher_x5F_vw1_x5F_web",
          "pitcher_x5F_vw1_x5F_wst",
          "pitcher_x5F_vw1_x5F_logo",
          "pitcher_x5F_vw1_x5F_wlt",
          "pitcher_x5F_vw1_x5F_bnd",
          "pitcher_x5F_vw1_x5F_stch",
          "pitcher_x5F_vw1_x5F_lce",
          "pitcher_x5F_open_x5F_side",
        ];

        var layer = p[i];

        //Apply default fills & add to group
        self.defaultColor(layer, el, self.sView);
        self.m3.append(self.sView);
        // self.gloveCloneSideVertical.append(self.m3.clone(self.sView));
      });

      var label = [
        { name: "web", x: 207, y: 118, title: "Web" },
        { name: "thbi", x: 167, y: 285, title: "Thumb Inner" },
        { name: "wst", x: 134, y: 302, title: "Wrist" },
        { name: "logo", x: 68, y: 291, title: "9P Logo" },
        { name: "lce", x: 136, y: 214, title: "Lace" },
        { name: "bnd", x: 115, y: 264, title: "Binding" },
      ];

      _.forEach(label, (l) => {
        (function (l) {
          var btn = self.m3
            .rect(l.x - 6, l.y - 6, 15, 15, 50, 50)
            .attr({
              fill: self.svgBtnFill,
              selected: false,
              id: l.name,
              stroke: "white",
              strokeWidth: 2.0,
            });
          // var vBtn = self.m3.rect(l.x - 6, l.y - 6, 15, 15, 50, 50).attr({ fill: self.svgBtnFill, selected: false, id: l.name, stroke: 'white', strokeWidth: 2.0 });
          var title = Snap.parse("<title>" + l.title + "</title>");

          btn.append(title);
          self.svgEventListners(btn, l);
          self.drawSvgCanvas("side", btn);
        })(l),
          false;
      });
    });
  };

  //** Loads first base mitt canvas */
  loadFbase = () => {
    let self = this;
    self._applySvgViewBox();
    this.m1.attr({ viewBox: "-25 -20 400 400" });
    Snap.load("assets/images/fbase_back_view.svg", function (f) {
      var g = f.selectAll(
        "#fbase_x5F_vw3_x5F_thb, #fbase_x5F_vw3_x5F_bfg, #fbase_x5F_vw3_x5F_plm, #fbase_x5F_vw3_x5F_utoe, #fbase_x5F_vw3_x5F_wst, #fbase_x5F_vw3_x5F_logo, #fbase_x5F_vw3_x5F_web, #fbase_x5F_vw3_x5F_stch, #fbase_x5F_vw3_x5F_bnd, #fbase_x5F_vw3_x5F_lce, #fbase_x5F_vw3_x5F_rise, #fbase_x5F_vw3_x5F_elite, #fbase_x5F_open_x5F_back, #fbase_x5F_logo_x5F_elite, #fbase_x5F_logo_x5F_rise"
      );
      g.forEach(function (el, i) {
        var p = [
          "fbase_x5F_vw3_x5F_thb",
          "fbase_x5F_vw3_x5F_bfg",
          "fbase_x5F_vw3_x5F_plm",
          "fbase_x5F_vw3_x5F_utoe",
          "fbase_x5F_vw3_x5F_wst",
          "fbase_x5F_vw3_x5F_logo",
          "fbase_x5F_vw3_x5F_web",
          "fbase_x5F_vw3_x5F_stch",
          "fbase_x5F_vw3_x5F_bnd",
          "fbase_x5F_vw3_x5F_lce",
          "fbase_x5F_vw3_x5F_rise",
          "fbase_x5F_vw3_x5F_elite",
          "fbase_x5F_open_x5F_back",
          "fbase_x5F_logo_x5F_elite",
          "fbase_x5F_logo_x5F_rise",
        ];
        var layer = p[i];
        var filter = layer.split("_").pop();

        //Apply default fills & add to group
        self.defaultColor(layer, el, self.oView);
        self.setInitialSeriesState(layer, filter, el);
        self.m1.append(self.oView);
        // self.gloveCloneMainVertical.append(self.m1.clone(self.oView));
      });
      self.indicatorMap = [];

      //Label Values
      var label = [
        {
          name: "plm",
          x: null,
          y: null,
          title: "Palm",
          model: "palmColor",
          canvas: ["mInside"],
        },
        {
          name: "thb",
          x: null,
          y: null,
          title: "Thumb finger",
          model: "thumbFinger",
          canvas: ["mSideview"],
        },
        {
          name: "bfg",
          x: 150,
          y: 50,
          title: "Back finger",
          model: "backFinger",
          canvas: ["mOutside"],
        },
        {
          name: "utoe",
          x: 200,
          y: 150,
          title: "Web Base",
          model: "utoeColor",
          canvas: ["mOutside"],
        },
        {
          name: "web",
          x: null,
          y: null,
          title: "Web",
          model: "webColor",
          canvas: ["mOutside", "mInside"],
        },
        {
          name: "wst",
          x: 132,
          y: 320,
          title: "Wrist",
          model: "wristColor",
          canvas: ["mOutside"],
        },
        //{ name: "fpad", x: 166, y: 208, title: "finger protection", canvas: ["mOutside"] },
        {
          name: "lce",
          x: null,
          y: null,
          title: "Laces",
          model: "laceColor",
          canvas: ["mSideview"],
        },
        {
          name: "fgrl",
          x: 100.1,
          y: 184.6,
          title: "finger embroidery",
          model: "seriesColor",
          canvas: ["mOutside"],
        },
        {
          name: "logo",
          x: 206,
          y: 310,
          title: "9P logo embroidery",
          model: "logoColor",
          canvas: ["mOutside"],
        },
        {
          name: "stch",
          x: null,
          y: null,
          title: "stitching",
          model: "stitchingColor",
          canvas: ["mSideview"],
        },
        {
          name: "bnd",
          x: null,
          y: null,
          title: "binding",
          model: "bindingColor",
          canvas: ["mInside"],
        },
      ];

      _.forEach(label, (l) => {
        (function (l) {
          if (l.x == null && l.y == null) {
            self.indicatorMap.push({
              name: l.name,
              touched: false,
              canvas: l.canvas,
            });
          } else {
            var btn = self.m1
              .rect(l.x - 6, l.y - 6, 15, 15, 50, 50)
              .attr({
                fill: self.svgBtnFill,
                selected: false,
                id: l.name,
                stroke: "white",
                strokeWidth: 2.0,
              });
            var title = Snap.parse("<title>" + l.title + "</title>");

            self.indicatorMap.push({
              name: l.name,
              touched: false,
              canvas: l.canvas,
            });

            btn.append(title);
            self.svgEventListners(btn, l);
            self.drawSvgCanvas("main", btn);
          }
        })(l),
          false;
      });
    });
    this.m2.attr({ viewBox: "0 -20 400 400" });
    Snap.load("assets/images/fbase_inside_view.svg", function (f) {
      var g = f.selectAll(
        "#fbase_x5F_vw2_x5F_plm, #fbase_x5F_vw2_x5F_bnd, #fbase_x5F_vw2_x5F_web, #fbase_x5F_vw2_x5F_stch, #fbase_x5F_vw2_x5F_lce, #fbase_x5F_open_x5F_pocket"
      );

      g.forEach(function (el, i) {
        var p = [
          "fbase_x5F_vw2_x5F_plm",
          "fbase_x5F_vw2_x5F_bnd",
          "fbase_x5F_vw2_x5F_web",
          "fbase_x5F_vw2_x5F_stch",
          "fbase_x5F_vw2_x5F_lce",
          "fbase_x5F_open_x5F_pocket",
        ];
        var layer = p[i];

        //Apply default fills & add to group
        self.defaultColor(layer, el, self.iView);
        self.m2.append(self.iView);
        // self.gloveCloneInsideVertical.append(self.m2.clone());
      });

      var label = [
        { name: "plm", x: 200, y: 180, title: "palm" },
        { name: "web", x: 97, y: 70, title: "web" },
        { name: "bnd", x: 242, y: 20.5, title: "bind" },
      ];
      _.forEach(label, (l) => {
        (function (l) {
          var btn = self.m2
            .rect(l.x - 6, l.y - 6, 15, 15, 50, 50)
            .attr({
              fill: self.svgBtnFill,
              selected: false,
              id: l.name,
              stroke: "white",
              strokeWidth: 2.0,
            });
          // var vBtn = self.m3.rect(l.x - 6, l.y - 6, 15, 15, 50, 50).attr({ fill: self.svgBtnFill, selected: false, id: l.name, stroke: 'white', strokeWidth: 2.0 });
          var title = Snap.parse("<title>" + l.title + "</title>");

          btn.append(title);
          self.svgEventListners(btn, l);
          self.drawSvgCanvas("inside", btn);
        })(l),
          false;
      });
    });
    this.m3.attr({ viewBox: "-20 -20 400 400" });
    Snap.load("assets/images/fbase_side_view.svg", function (f) {
      var g = f.selectAll(
        "#fbase_x5F_vw1_x5F_wst, #fbase_x5F_vw1_x5F_logo, #fbase_x5F_vw1_x5F_plm, #fbase_x5F_vw1_x5F_thb, #fbase_x5F_vw1_x5F_bfg, #fbase_x5F_vw1_x5F_utoe, #fbase_x5F_vw1_x5F_web, #fbase_x5F_vw1_x5F_stch, #fbase_x5F_vw1_x5F_bnd, #fbase_x5F_vw1_x5F_lce, #fbase_x5F_side_x5F_view"
      );

      g.forEach(function (el, i) {
        var p = [
          "fbase_x5F_vw1_x5F_wst",
          "fbase_x5F_vw1_x5F_logo",
          "fbase_x5F_vw1_x5F_plm",
          "fbase_x5F_vw1_x5F_thb",
          "fbase_x5F_vw1_x5F_bfg",
          "fbase_x5F_vw1_x5F_utoe",
          "fbase_x5F_vw1_x5F_web",
          "fbase_x5F_vw1_x5F_stch",
          "fbase_x5F_vw1_x5F_bnd",
          "fbase_x5F_vw1_x5F_lce",
          "fbase_x5F_side_x5F_view",
        ];
        var layer = p[i];
        //Apply default fills & add to group
        self.defaultColor(layer, el, self.sView);
        self.m3.append(self.sView);
        // self.gloveCloneSideVertical.append(self.m3.clone(self.sView));
      });

      var label = [
        { name: "thb", x: 150, y: 270, title: "Thumb Finger" },
        { name: "stch", x: 97, y: 230, title: "Stitching" },
        { name: "lce", x: 160, y: 120, title: "Laces" },
      ];

      _.forEach(label, (l) => {
        (function (l) {
          var btn = self.m3
            .rect(l.x - 6, l.y - 6, 15, 15, 50, 50)
            .attr({
              fill: self.svgBtnFill,
              selected: false,
              id: l.name,
              stroke: "white",
              strokeWidth: 2.0,
            });
          // var vBtn = self.gloveCloneSideVertical.rect(l.x - 6, l.y - 6, 15, 15, 50, 50).attr({ fill: self.svgBtnFill, selected: false, id: l.name, stroke: 'white', strokeWidth: 2.0 });
          var title = Snap.parse("<title>" + l.title + "</title>");

          btn.append(title);
          self.svgEventListners(btn, l);
          self.drawSvgCanvas("side", btn);
        })(l),
          false;
      });
      //console.log('First base mitt loaded.');
    });
  };

  //** Startup script to initiate view */
  initCanvas() {
    this.fieldMap = Snap("#positions");
    (this.m1 = Snap("#mOutside")),
      (this.m2 = Snap("#mInside")),
      (this.m3 = Snap("#mSideview"));

    this.gloveCloneSummary1 = Snap("#gloveCloneSummary1");
    this.gloveCloneSummary2 = Snap("#gloveCloneSummary2");
    this.gloveCloneSummary3 = Snap("#gloveCloneSummary3");

    try {
      /* Glove Group Containers */
      this.oView = this.m1.group();
      this.iView = this.m2.group();
      this.sView = this.m3.group();

      (this.bgroup1 = this.m1.group()),
        (this.bgroup2 = this.m2.group()),
        (this.bgroup3 = this.m3.group());
      this.canvasListener.next(true);
    } catch (error) {
      return false;
    }
  } //initCanvas End
}
