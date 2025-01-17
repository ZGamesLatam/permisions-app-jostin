import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subject,
  takeUntil,
  tap,
} from "rxjs";
import { BETSHOP_TABLE_COLUMNS } from "src/app/core/helpers/global/betshop-management.constant";
import { DEFAULT_NGX_DATATABLE_PAGINATION } from "src/app/core/helpers/ui/ngx-datatable.constant";
import {
  BUTTON_ACTIONS,
  FORMAT_FOR_DATES,
} from "src/app/core/helpers/ui/ui.constant";
import { Betshop } from "src/app/core/interfaces/api/betshop.interface";
import { ModalWithAction } from "src/app/core/interfaces/ui/bootstrap-modal.interface";
import { NgxDatatableConfig } from "src/app/core/interfaces/ui/ngx-datatable.interface";
import { ButtonAction } from "src/app/core/interfaces/ui/ui.interface";
import { FilterService } from "src/app/core/services/ui/filter.service";
import { BetshopService } from "../../../../core/services/api/betshop.service";
import { BootstrapModalService } from "../../../../core/services/ui/bootstrap-modal.service";
import { BetshopFilterFormComponent } from "../../components/betshop-filter-form/betshop-filter-form.component";
import { BetshopModalFormComponent } from "../../components/betshop-modal-form/betshop-modal-form.component";

@Component({
  selector: "betshop-management-betshop",
  templateUrl: "./betshop.component.html",
})
export class BetshopComponent implements OnInit, OnDestroy {
  public BUTTON_ACTIONS = BUTTON_ACTIONS;
  public FORMAT_FOR_DATES = FORMAT_FOR_DATES;
  private PAGINATION = DEFAULT_NGX_DATATABLE_PAGINATION;

  public filterComponent = BetshopFilterFormComponent;

  @ViewChild("country", { static: true })
  public countryTemplate?: TemplateRef<HTMLElement>;

  @ViewChild("detailReport", { static: true })
  public detailReportTemplate?: TemplateRef<HTMLElement>;

  @ViewChild("createdAt", { static: true })
  public createdAtTemplate?: TemplateRef<HTMLElement>;

  @ViewChild("updatedAt", { static: true })
  public updatedAtTemplate?: TemplateRef<HTMLElement>;

  @ViewChild("isVisible", { static: true })
  public isVisibleTemplate?: TemplateRef<HTMLElement>;

  @ViewChild("isActive", { static: true })
  public isActiveTemplate?: TemplateRef<HTMLElement>;

  @ViewChild("actions", { static: true })
  public actionsTemplate?: TemplateRef<HTMLElement>;

  public config$ = new BehaviorSubject<Partial<NgxDatatableConfig>>({});
  public data$: Observable<Betshop[]> = of([]);

  private filter: object = {};
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _router: Router,
    private _betshopService: BetshopService,
    private _filterService: FilterService<object>,
    private _bsModalService: BootstrapModalService<ModalWithAction<Betshop>>
  ) {}

  ngOnInit(): void {
    this.suscribeFilter();
    this.config$ = this.setConfigDatatable();
    this.data$ = this.fetchBetshops(this.setFilter());
  }

  private suscribeFilter(): void {
    this._filterService
      .getFilterData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (filter) => {
          this.filter = filter;
          this.reloadDatatable();
        },
        error: (error) => this.reloadDatatable(),
      });
  }

  private setConfigDatatable(): BehaviorSubject<Partial<NgxDatatableConfig>> {
    return new BehaviorSubject<Partial<NgxDatatableConfig>>({
      limit: this.PAGINATION.LIMIT,
      page: this.PAGINATION.PAGE,
      columns: [
        {
          width: 50,
          cellTemplate: this.detailReportTemplate ?? undefined,
        },
        ...BETSHOP_TABLE_COLUMNS,
        {
          name: "words.country",
          cellTemplate: this.countryTemplate ?? undefined,
        },
        {
          name: "betshopManagement.betshops.isVisible",
          width: 100,
          cellTemplate: this.isVisibleTemplate ?? undefined,
        },
        {
          name: "betshopManagement.betshops.isActive",
          width: 100,
          cellTemplate: this.isActiveTemplate ?? undefined,
        },
        {
          name: "words.createdAt",
          cellTemplate: this.createdAtTemplate ?? undefined,
        },
        {
          name: "words.updatedAt",
          cellTemplate: this.updatedAtTemplate ?? undefined,
        },
        {
          name: "words.actions",
          width: 80,
          frozenRight: true,
          cellTemplate: this.actionsTemplate ?? undefined,
        },
      ],
    });
  }

  private fetchBetshops(filter: object): Observable<Betshop[]> {
    this.config$.next({ ...this.config$.value, loadingIndicator: true });
    return this._betshopService.findBetshop(filter).pipe(
      tap((res) => {
        this.config$.next({
          ...this.config$.value,
          loadingIndicator: false,
          count: res.data.totalCount,
        });
      }),
      map((res) => res.data.result || []),
      catchError((error) => {
        this.config$.next({ ...this.config$.value, loadingIndicator: false });
        return of([]);
      })
    );
  }

  private setFilter(): object {
    return {
      ...this.filter,
      limit: this.config$.value.limit,
      page: this.config$.value.page,
    };
  }

  public reloadDatatable(): void {
    this.config$.next({
      ...this.config$.value,
      limit: this.PAGINATION.LIMIT,
      page: this.PAGINATION.PAGE,
    });
    this.data$ = this.fetchBetshops(this.setFilter());
  }

  public onChangeLimit(limit: number): void {
    this.config$.next({
      ...this.config$.value,
      limit,
      page: this.PAGINATION.PAGE,
    });
    this.data$ = this.fetchBetshops(this.setFilter());
  }

  public onChangePage(page: number): void {
    this.config$.next({ ...this.config$.value, page });
    this.data$ = this.fetchBetshops(this.setFilter());
  }

  public redirectToLinkedCashdesks(betshop: Betshop): void {
    this._router.navigate([
      "/betshop-management/cashdesk",
      { betshopId: betshop._id, betshopName: betshop.name },
    ]);
  }

  public openModal(buttonAction: ButtonAction, betshop?: Betshop): void {
    this._bsModalService.openModal({
      component: BetshopModalFormComponent,
      data: { buttonAction, selectedRow: betshop },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
