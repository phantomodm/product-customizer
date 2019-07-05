import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { TweenLite, Power2 } from 'gsap';
import * as Snap from 'snapsvg-cjs';
import { CapDataService } from './cap-data.service';
import { interval, timer } from 'rxjs';
import { takeWhile, take } from 'rxjs/operators';

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class CapApiService {
    hatData: any;
    colors: any[];
    canvas: { "element": string; "svgBase": string; }[];
    data: {};
    build: any;
    optionTitle: string[];
    svgLeft: any;
    svgRight: any;
    oView: any;
    iView: any;
    sView: any;
    svgBack: any;

    constructor(private capData: CapDataService) {
        this.colors = [];
        this.hatData = {
            data:{
                build:{}
            },
            optionTitle:'',
            canvas:[]          
        }

        this.canvas = this.hatData.canvas;
        this.data = this.hatData.data;
        this.build = this.hatData.data.build;
        this.optionTitle = this.hatData.domTitle;
    }

    init(profile: string) {

        this.capData.getQuickOrderData().subscribe(
            (data) => {
                let self = this;
                // const productId = "170"
                function checkCapData(): any {
                    return _.forEach(data, (r) => {
                        if (profile === r.designTemplate) {
                            self.data = r;
                            console.log(self.data)
                            return true;
                        } else {
                            return false;
                        }
                    })
                }

                /** Observable timer for slow connections */
                const starter = interval(1000);
                starter.pipe(takeWhile(checkCapData),
                    take(1)).subscribe((res) => {
                    if(res){
                        this.initCanvas();
                        console.log(this.data)
                    }
                    
                });

            }
        )
        
    }

    initCanvas() {
        console.log('hello')
        this.svgLeft = Snap("#svgLeft")
        this.svgRight = Snap("#svgRight")
        //this.svgBack = Snap("#svgBack")

        /* Glove Group Containers */
        this.oView = this.svgLeft.group(), this.iView = this.svgRight.group(), this.sView = this.svgBack.group();
        this.loadCapCanvas();

        setTimeout(() => {
            _.forEach(this.optionTitle, (d) => {
                const fill = _.random(0, 11);
                switch (d) {
                    case "logo":
                        this.applyFillToCanvas(d, "#c5b358");
                        break;
                    case "body":
                    case "trim":
                    case "accent":
                        this.applyFillToCanvas(d, this.colors[fill]);
                        break;
                }

            })
        }, 2500);
    }

    getHexIdFromDomSelection(event) {
        let self = this;
        let attrName = event.target.name;
        //console.log(attrName)
        let attrValue = event.target.value;
        //let imgBase = self.data.imgBase;
        let imgBase = "cap";


        // _.forEach(self.data.attributes, (value, key) => {
        //     if (value.name == attrName && value.value == attrValue) {
        //         const fill = value.hex;
        //         const html = value.html;
        //         self.applyFillToCanvas(html, fill);
        //     }
        // })
    }

    applyFillToCanvas(sectionToFill, colorValue,) {
        let self = this;
        const bodyPart = sectionToFill;
        const fillHex = colorValue;
        const capSvgBase = "cap";
        const fillObj = Object.assign({}, self.build);

        _.forEach(this.canvas, (value, key) => {
            let el = value.element;
            let svgLayerId = value.svgBase;
            let svgElement = (`#${capSvgBase}${svgLayerId}`);
            switch (bodyPart) {
                case "body":
                    _.forEach(fillObj.body, (f) => {
                        let element = (svgElement + f);
                        switch (el) {
                            case "svgLeft":
                                //console.log(element)
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch")) {
                                        self.svgLeft.select(element).attr({ "fill": 'none', stroke: fillHex });
                                        break;
                                    }
                                    TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                                    //self.svgLeft.select(element).attr({ fill: fillHex });
                                    break;
                                }
                            case "svgRight":
                                //console.log(element)
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch") || _.includes(element, "fgrl")) {
                                        self.svgRight.select(element).attr({ "fill": 'none', stroke: fillHex });
                                        break;
                                    }
                                    TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                                    //self.svgRight.select(element).attr({ fill: fillHex });
                                    break;
                                }
                            case "svgBack":
                                //console.log(element)
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch")) {
                                        self.svgBack.select(element).attr({ "fill": 'none', stroke: fillHex });
                                        break;
                                    }
                                    TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                                    //self.svgBack.select(element).attr({ fill: fillHex });
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
                            case "svgLeft":
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch")) {
                                        self.svgLeft.select(element).attr({ "fill": 'none', stroke: fillHex });
                                        break;
                                    }
                                    //self.svgLeft.select(element).attr({ fill: fillHex });
                                    TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                                }
                                break;
                            case "svgRight":
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch")) {
                                        self.svgRight.select(element).attr({ "fill": 'none', stroke: fillHex });
                                        break;
                                    }
                                    //self.svgRight.select(element).attr({ fill: fillHex });
                                    TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                                }
                                break;
                            case "svgBack":
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch")) {
                                        self.svgRight.select(element).attr({ "fill": 'none', stroke: fillHex });
                                        break;
                                    }
                                    //self.svgBack.select(element).attr({ fill: fillHex });
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
                            case "svgLeft":
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch")) {
                                        self.svgLeft.select(element).attr({ "fill": 'none', stroke: fillHex });
                                        break;
                                    }
                                    TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 1 });
                                    //self.svgLeft.select(element).attr({ fill: fillHex });
                                }
                                break;
                            case "svgRight":
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch")) {
                                        self.svgRight.select(element).attr({ "fill": 'none', stroke: fillHex });

                                        break;
                                    }
                                    //self.svgRight.select(element).attr({ fill: fillHex });
                                    TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                                }

                                break;
                            case "svgBack":
                                if ($(element).length != 0) {
                                    if (_.includes(element, "stch")) {
                                        self.svgBack.select(element).attr({ "fill": 'none', stroke: fillHex });

                                        break;
                                    }
                                    //self.svgBack.select(element).attr({ fill: fillHex });
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
                            case "svgLeft":
                                if ($(element).length != 0) {
                                    TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                                    //self.svgLeft.select(element).attr({ fill: fillHex });
                                }
                                break;
                            case "svgRight":
                                if ($(element).length != 0) {
                                    //console.log(element);
                                    TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                                    //self.svgRight.select(element).attr({ fill: fillHex });
                                }
                                break;
                            case "svgBack":
                                //console.log('logos')
                                if ($(element).length != 0) {
                                    TweenLite.to(element, 1, { ease: Power2.easeInOut, fill: fillHex, delay: 0.5 });
                                    //self.svgBack.select(element).attr({ fill: fillHex });
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

    _setDefaultColor(el, parts) {
        _.includes(parts, 'stch') ? el.attr({ fill: 'none' }) : el.attr({ fill: "#FFFAFA" });
    }

    loadCapCanvas() {
        let self = this;
        Snap.load("{{ cdn 'assets/images/nine-positions/baseball_cap_left_overlay.svg'}}", function (f) {
            self.svgLeft({ viewBox: "0 0 400 400" })
            var g = f.selectAll('#cap_x5F_vw2_x5F_pnl2,#cap_x5F_vw2_x5F_pnl1,#cap_x5F_vw2_x5F_pnl5,#cap_x5F_vw2_x5F_pnl6,#cap_x5F_vw2_x5F_bill,#cap_x5F_vw2_x5F_stch,#cap_x5F_vw2_x5F_pin');
            g.forEach(function (el, i) {
                var p = ['cap_x5F_vw2_x5F_pnl2', 'cap_x5F_vw2_x5F_pnl1', 'cap_x5F_vw2_x5F_pnl5', 'cap_x5F_vw2_x5F_pnl6', 'cap_x5F_vw2_x5F_bill', 'cap_x5F_vw2_x5F_stch', 'cap_x5F_vw2_x5F_pin'];
                var filter = p[i];

                //Apply default fills & add to group
                self._setDefaultColor(el, filter);

                self.oView.add(el);
                self.svgLeft.append(self.oView)
            });
        });

        Snap.load("{{ cdn 'assets/images/nine-positions/baseball_cap_right_overlay.svg'}}", function (f) {
            self.svgRight({ viewBox: "0 0 400 400" })
            var g = f.selectAll('#cap_x5F_vw1_x5F_pnl1,#cap_x5F_vw1_x5F_pnl2,cap_x5F_vw1_x5F_pnl4,cap_x5F_vw1_x5F_pnl3,cap_x5F_vw1_x5F_bill,#cap_x5F_vw1_x5F_stch,#cap_x5F_vw1_x5F_pin,#cap_x5F_vw1_x5F_eye');
            g.forEach(function (el, i) {
                var p = ['cap_x5F_vw1_x5F_pnl1', 'cap_x5F_vw1_x5F_pnl2', 'cap_x5F_vw1_x5F_pnl4', 'cap_x5F_vw1_x5F_pnl3', 'cap_x5F_vw1_x5F_bill', 'cap_x5F_vw1_x5F_stch', 'cap_x5F_vw1_x5F_pin', 'cap_x5F_vw1_x5F_eye'];
                var filter = p[i];

                //Apply default fills & add to group
                self._setDefaultColor(el, filter);

                self.oView.add(el);
                self.svgRight.append(self.oView)
            });
        });

        // Snap.load("", function(f){
        //     self.svgBack({viewBox: "0 0 400 400"})
        //     var g = f.selectAll('#');
        //     g.forEach(function(el,i){
        //         var p = [];
        //         var filter = p[i];

        //         //Apply default fills & add to group
        //         self._setDefaultColor(el,filter);

        //         self.oView.add(el);
        //         self.svgBack.append(self.oView)
        //     });
        // });
    }
}
