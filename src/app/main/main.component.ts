import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  OnDestroy,
  HostListener,
} from "@angular/core";
import { GloveApiService } from "../shared/services/glove-api.service";
import { Subject, fromEvent } from "rxjs";
import * as _ from "lodash";
import { takeUntil, distinctUntilChanged, map, take } from "rxjs/operators";
import { GloveDataService } from '../shared/services/glove-data.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject<boolean>();

  @HostListener("window:beforeunload", ["$event"])
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  constructor(private gloveApi: GloveApiService, private gloveData: GloveDataService) {}

  ngOnInit() {
    this.gloveData.getYotpoReviews().subscribe(res => console.log(res))

  }

  ngAfterViewInit(): void {
    this.gloveApi.init()
  }
}
