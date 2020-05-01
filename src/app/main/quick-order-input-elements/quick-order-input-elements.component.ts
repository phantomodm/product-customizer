import { Component, OnInit, AfterViewInit, HostListener, ViewChild, ElementRef, ViewChildren, QueryList } from "@angular/core";
import { GloveApiService } from "src/app/services/glove-api-service";
import { DomSanitizer } from "@angular/platform-browser";
import * as _ from "lodash";
import { Subject } from "rxjs";
import { take, takeUntil, distinctUntilChanged } from "rxjs/operators";

declare var $: any;

@Component({
  selector: "quick-order-input-elements",
  templateUrl: "./quick-order-input-elements.component.html",
  styleUrls: ["./quick-order-input-elements.component.css"],
})
export class QuickOrderInputElementsComponent implements OnInit, AfterViewInit {
  private unsubscribe$ = new Subject<boolean>();
  @ViewChild('') personalization: HTMLInputElement;

  gloveData;
  gloveType;
  leatherType = "steer";
  glovePart = "leather";
  webs;
  webFilter;
  webCheck: boolean;

  // tslint:disable-next-line: variable-name
  constructor(
    private gloveApi: GloveApiService,
    private _sanitizer: DomSanitizer
  ) {
    this.gloveApi.gloveTypeWatcher$
      .pipe(takeUntil(this.unsubscribe$), distinctUntilChanged(), take(2))
      .subscribe((res) => (this.gloveType = res));
  }

  public sanitizeImage(image: string) {
    //console.log(image);
    return this._sanitizer.bypassSecurityTrustUrl(`url(${image})`);
  }

  ngOnInit() {
    this.gloveData = this.gloveApi.gloveInputOptions$;
    //this.webs = this.webFilter = webImages;
    console.log(this.gloveData);
    
  }

  ngAfterViewInit() {
  }

  inputPersonalization(input:string){
    console.log(input)
  }

  filterWebInputs(collection: any[]) {
    return _.filter(collection, (f) => {
      return _.find(f.gloveType, (m) => {
        if (m === this.gloveType) {
          return true;
        }
      });
    });
  }

  gloveWebExpressionCheck(event: string): boolean {
    if (event !== "gloveWeb") {
      return false;
    }
    console.log("gloveWeb");
    return true;
  }

  filterColorInputs(collection: any[], id: string) {
    const db = collection;
    // tslint:disable-next-line: variable-name

    const _id = id;
    switch (_id) {
      case "gloveBody":
      case "gloveAccent":
      case "gloveTrim":
        return _.filter(collection, (f) => {
          return _.find(f.leather, (r) => {
            if (r === this.leatherType) {
              return true;
            }
          });
        });
        break;
      default:
        break;
      }

      switch (_id) {
        case "embroideryColor":
        case "gloveLogo":
          return _.filter(collection, (f) => {
            return _.find(f.leather, (r) => {
              if (r === "embroidery") {
                return true;
              }
            });
          });
        default:
          break;
      }    
  }

  onSubmit(){
    const submit = $(".single_add_to_cart_button")
      .removeClass("disabled")
      .click();
  }

  applyFill(event, fill, value?, elementId?) {
    console.log(event, fill, value, elementId);
    const target = event.target.dataset.glove_section;
    this.gloveApi.getHexIdFromDomSelection(event, fill, value, elementId);
  }

  changeEvent(event) {
    const name = event.target.name;
    const value = event.target.value;
    const _id = event.target.id;
    const eventType = event.type;
    console.log(event)
    if (_.isEqual(name, "glove_series")) {
      switch (value) {
        case "kip":
          this.leatherType = "kip";
          break;

        default:
          this.leatherType = "steer";
          break;
      }
    }

    this.gloveApi.applyHtmlInput(_id, value, eventType)


  }

  @HostListener("window:beforeunload", ["$event"])
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}
