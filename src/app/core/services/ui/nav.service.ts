import { Injectable, OnDestroy } from "@angular/core";
import { Subject, BehaviorSubject, fromEvent } from "rxjs";
import { takeUntil, debounceTime } from "rxjs/operators";
import { Router } from "@angular/router";
import { Menu } from "src/app/core/interfaces/ui/nav.interface";
import { MENU_ITEMS } from "src/app/core/helpers/ui/nav.constant";

@Injectable({
  providedIn: "root",
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<boolean> = new Subject();
  private readonly _smallScreenWidth = 991;
  private readonly _mediumScreenWidth = 1199;

  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(
    window.innerWidth
  );

  // Search Box
  public search: boolean = false;

  // Language
  public language: boolean = false;

  // Mega Menu
  public megaMenu: boolean = false;
  public levelMenu: boolean = false;
  public megaMenuColapse: boolean = this.isScreenWidthLessThan(
    this._mediumScreenWidth
  );

  // Collapse Sidebar
  public collapseSidebar: boolean = this.isScreenWidthLessThan(
    this._smallScreenWidth
  );

  // For Horizontal Layout Mobile
  public horizontal: boolean = !this.isScreenWidthLessThan(
    this._smallScreenWidth
  );

  // Full screen
  public fullScreen: boolean = false;

  constructor(private router: Router) {
    this._initializeNavService();
  }

  private _initializeNavService(): void {
    this._initScreenWidth();
    this._initResizeEvent();
    this._initRouteChangeDetection();
  }

  private _initScreenWidth(): void {
    this._setScreenWidth(window.innerWidth);
  }

  private _initResizeEvent(): void {
    fromEvent(window, "resize")
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => this._handleResizeEvent(evt));
  }

  private _handleResizeEvent(evt: any): void {
    const newWidth = evt.target.innerWidth;
    this._setScreenWidth(newWidth);
    this._updateLayoutBasedOnScreenWidth(newWidth);
  }

  private _updateLayoutBasedOnScreenWidth(width: number): void {
    if (this.isScreenWidthLessThan(this._smallScreenWidth)) {
      this.collapseSidebar = true;
      this.megaMenu = false;
      this.levelMenu = false;
    }
    if (this.isScreenWidthLessThan(this._mediumScreenWidth)) {
      this.megaMenuColapse = true;
    }
  }

  private _initRouteChangeDetection(): void {
    if (this.isScreenWidthLessThan(this._smallScreenWidth)) {
      this.router.events.subscribe((event) => this._handleRouteChange(event));
    }
  }

  private _handleRouteChange(event: any): void {
    this.collapseSidebar = true;
    this.megaMenu = false;
    this.levelMenu = false;
  }

  ngOnDestroy() {
    this.unsubscriber.next(true);
    this.unsubscriber.complete();
  }

  private _setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  private isScreenWidthLessThan(width: number): boolean {
    return window.innerWidth < width;
  }

  public items = new BehaviorSubject<Menu[]>(MENU_ITEMS);


}
