import { Component, OnInit, AfterViewInit, Input, OnDestroy, HostListener } from '@angular/core';
import { GloveApiService } from '../shared/services/glove-api.service';
import { Subject, fromEvent } from 'rxjs';
import * as _ from 'lodash';
import { takeUntil, distinctUntilChanged, map, take } from 'rxjs/operators';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject<boolean>();
  
  @HostListener('window:beforeunload',['$event'])
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  @Input() glove;
  @Input() profile;

  input;
  currentInput = new Subject<string>();
  currentInput$ = this.currentInput.asObservable();

  gloveType: { "name": string; "type": string; }[];
  newContainer$: any;
  ywapoSelect$: any;
  ywapoClick$: any;

  constructor(private gloveApi: GloveApiService) {  }

  ngOnInit() {

    this.gloveType = [
      { "name": "dual welt glove", "type": "inf_dw" },
      { "name": "outfield glove", "type": "of" },
      { "name": "catcher mitt", "type": "catcher-mitt" },
      { "name": "fastback catcher mitt", "type": "catcher-fastback" },
      { "name": "first base mitt", "type": "fbase" },
      { "name": "infield glove", "type": "inf" },
    ]

    this.currentInput$.pipe(takeUntil(this.unsubscribe$)).subscribe(res => this.input = res)
  }

  applyFill(obj: { id: string, domValue: string }) {
    this.gloveApi.getHexIdFromDomSelection({ section: obj.id, value: obj.domValue });
  }

  ngAfterViewInit(): void {
    _.forEach(this.gloveType, g => {
      _.forEach(g, (v, k) => {
        if (v == _.toLower(this.glove)) {
          this.gloveApi.init(this.profile, g.type)
        }
      })
    });

    jQuery(document).ready(() => {

      const hover$ = fromEvent(jQuery('.ywapo_input,.ywapo_input_container'), 'mouseover').pipe(takeUntil(this.unsubscribe$), distinctUntilChanged());
      const containerChanged$ = hover$.pipe(map((element: any) => {

        let value = jQuery(element.currentTarget).parent().siblings().text().trim()
        if (value != undefined) {
          switch (value) {
            case "Glove Series":
            case "Glove Body Color":
            case "Glove Accent Color":
            case "Glove Trim Color":
            case "Glove Logo Color":
              
              try {
                this.currentInput.next(value)
                this.applyFill({ id: this.input, domValue: value })
              } catch (error) {
                //console.log('Caught undefined')
              }
              break;
            default:
              break;
          }
        }

      }))
      this.newContainer$ = containerChanged$.subscribe()

      const ywapoInput$ = fromEvent(jQuery('.ywapo_input'), 'change').pipe(takeUntil(this.unsubscribe$), distinctUntilChanged());
      const ywapoInputChange$ = ywapoInput$.pipe(map((element: any) => {
        let value = Number(jQuery(element.currentTarget).val()), values = [], valueString;
        value = value += 1;
        if (value != undefined) {
          valueString = _.toLower(jQuery(element.currentTarget).context[value.toString()].text)
        }
        this.applyFill({ id: this.input, domValue: valueString })
      }))
      this.ywapoSelect$ = ywapoInputChange$.subscribe()

      const click$ = fromEvent(jQuery('.ywapo_input_container'), 'click').pipe(takeUntil(this.unsubscribe$), distinctUntilChanged());
      const ywapoClicked$ = click$.pipe(map((element: any) => {
        let value = jQuery(element.currentTarget)[0].textContent.trim()

        if (value.length && value != undefined) {
          if (value == 'f. green') {
            this.applyFill({ id: this.input, domValue: "forest-green" })
          } else if (value == 'navy') {
            try {
              this.applyFill({ id: this.input, domValue: value })
            } catch (error) {
              this.applyFill({ id: this.input, domValue: "navy-blue" })
            }
          } else {
            console.log(value)
            this.applyFill({ id: this.input, domValue: value })

          }
        }
      }))
      this.ywapoClick$ = ywapoClicked$.subscribe()

      _.forEach(jQuery("h3"), (v) => {
        if ($(v).text().trim() == "Glove Webs") {
          $(v).siblings().find("img").css({ 'cssText': "width: 50px !important" })
        }
      })

      _.forEach( jQuery(".ywapo_single_option_image"),(v)=> {

        let title = jQuery(v).siblings().text().trim()
        jQuery(v).attr({
          "data-toggle": "tooltip",
          "data-placement": "top",
          "title": `${title}`
        })
      })

    })
  }

}
