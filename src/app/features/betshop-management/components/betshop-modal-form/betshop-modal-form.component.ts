import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Observable, of, Subject, takeUntil } from "rxjs";
import { BETSHOP_VALIDATIONS } from "src/app/core/helpers/global/betshop-management.constant";
import {
  BUTTON_ACTIONS,
  NG_SELECT_QUERIES,
} from "src/app/core/helpers/ui/ui.constant";
import { Betshop } from "src/app/core/interfaces/api/betshop.interface";
import { ModalWithAction } from "src/app/core/interfaces/ui/bootstrap-modal.interface";
import {
  ButtonAction,
  NgSelect,
  NgSelectQuery,
} from "src/app/core/interfaces/ui/ui.interface";
import { BetshopService } from "src/app/core/services/api/betshop.service";
import { BootstrapModalService } from "src/app/core/services/ui/bootstrap-modal.service";
import { FilterService } from "src/app/core/services/ui/filter.service";
import { SearchNgSelectService } from "src/app/core/services/ui/search-ng-select.service";
import { ToastrNotificationService } from "src/app/core/services/ui/toastr-notification.service";

@Component({
  selector: "betshop-management-betshop-modal-form",
  templateUrl: "./betshop-modal-form.component.html",
  providers: [
    { provide: "ngCurrencies", useClass: SearchNgSelectService },
    { provide: "ngCountries", useClass: SearchNgSelectService },
    { provide: "ngCities", useClass: SearchNgSelectService },
  ],
})
export class BetshopModalFormComponent implements OnInit, OnDestroy {
  public BUTTON_ACTIONS = BUTTON_ACTIONS;
  public NG_SELECT_QUERIES = NG_SELECT_QUERIES;
  public BETSHOP_VALIDATIONS = BETSHOP_VALIDATIONS;

  public currencies$: Observable<NgSelect<string>[]> = of([]);
  public countries$: Observable<NgSelect<string>[]> = of([]);
  public cities$: Observable<NgSelect<string>[]> = of([]);

  public titleModal: string = "";
  public betshopForm: FormGroup | undefined = undefined;
  public activeButtonAction: ButtonAction | undefined = undefined;

  private selectedBetshop: Betshop | undefined = undefined;
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _formBuilder: FormBuilder,
    private _bsModalService: BootstrapModalService<ModalWithAction<Betshop>>,
    private _betshopService: BetshopService,
    private _filterService: FilterService<object>,
    private _translateService: TranslateService,
    private _notificationService: ToastrNotificationService,

    @Inject("ngCurrencies")
    private _ngCurrencies: SearchNgSelectService<string>,
    @Inject("ngCountries")
    private _ngCountries: SearchNgSelectService<string>,
    @Inject("ngCities")
    private _ngCities: SearchNgSelectService<string>
  ) {}

  ngOnInit(): void {
    this.setConfigNgSelects();
    this.suscribeModalDataIssued();
  }

  private setConfigNgSelects(): void {
    // this._ngCurrencies.setSearchTermKey("name");
    // this._ngCurrencies.setFetchDataFunction(
    //   this._currencyService.findCurrenciesForSelect.bind(this._currencyService)
    // );
    // this.currencies$ = this._ngCurrencies.getData();

    // this._ngCountries.setSearchTermKey("name");
    // this._ngCountries.setFetchDataFunction(
    //   this._countryService.findCountriesForSelect.bind(this._countryService)
    // );
    // this.countries$ = this._ngCountries.getData();

    // this._ngCities.setSearchTermKey("name");
    // this._ngCities.setFetchDataFunction(
    //   this._cityService.findCitiesForSelect.bind(this._cityService)
    // );
    // this.cities$ = this._ngCities.getData();
  }

  private suscribeModalDataIssued(): void {
    this._bsModalService
      .getDataIssued()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ buttonAction, selectedRow }) =>
          this.processSelectedBetshop(buttonAction, selectedRow),
        error: () => this.closeModal(),
      });
  }

  private processSelectedBetshop(
    buttonAction: ButtonAction,
    betshop?: Betshop
  ): void {
    this.activeButtonAction = buttonAction;
    this.selectedBetshop = betshop;
    this.betshopForm = this.getConfigForm();
    this.populateForm(betshop);

    const executeAction = this.handleProcessAction(this.activeButtonAction);
    executeAction();
  }

  private getConfigForm(): FormGroup {
    const formConfig = {
      name: [
        "",
        [
          Validators.required,
          Validators.maxLength(BETSHOP_VALIDATIONS.NAME.MAX_LENGTH),
        ],
      ],
      address: [
        "",
        [
          Validators.required,
          Validators.maxLength(BETSHOP_VALIDATIONS.ADDRESS.MAX_LENGTH),
        ],
      ],
      ipClient: [
        "",
        [
          Validators.required,
          Validators.maxLength(BETSHOP_VALIDATIONS.IP_CLIENT.MAX_LENGTH),
        ],
      ],
      currencyId: ["", [Validators.required]],
      countryId: ["", [Validators.required]],
      cityId: ["", [Validators.required]],
      latitude: [
        "",
        [
          Validators.required,
          Validators.maxLength(BETSHOP_VALIDATIONS.LATITUDE.MAX_LENGTH),
        ],
      ],
      longitude: [
        "",
        [
          Validators.required,
          Validators.maxLength(BETSHOP_VALIDATIONS.LONGITUDE.MAX_LENGTH),
        ],
      ],
      isVisible: [true],
      isActive: [true],
    };
    return this._formBuilder.group(formConfig);
  }

  private populateForm(betshop?: Betshop): void {
    if (!betshop || !this.betshopForm) return;

    const {
      name,
      address,
      ipClient,
      currencyId,
      cityId,
      coordinates,
      isVisible,
      isActive,
    } = betshop;

    const selectedBetshop = {
      name,
      address,
      ipClient,
      currencyId: currencyId._id,
      cityId: cityId._id,
      countryId: cityId.countryId._id,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      isVisible,
      isActive,
    };

    this.betshopForm.patchValue(selectedBetshop);
  }

  private handleProcessAction(buttonAction: ButtonAction): () => void {
    const actionMap = new Map<ButtonAction, () => void>([
      [BUTTON_ACTIONS.ADD, () => this.handleAddBetshop()],
      [BUTTON_ACTIONS.EDIT, () => this.handleEditBetshop()],
      [BUTTON_ACTIONS.VIEW, () => this.handleViewBetshop()],
    ]);
    return actionMap.get(buttonAction) || (() => {});
  }

  private handleAddBetshop(): void {
    this.titleModal = "betshopManagement.betshops.add";
    this._ngCurrencies.triggerFetchData();
    this._ngCountries.triggerFetchData();
  }

  private handleEditBetshop(): void {
    this.titleModal = "betshopManagement.betshops.edit";
    if (!this.betshopForm || !this.selectedBetshop) return;

    const { currencyId, cityId } = this.selectedBetshop;
    const { countryId } = cityId;

    const currency = { label: currencyId.name, value: currencyId._id };
    const country = {
      label: countryId.name,
      value: countryId._id,
      icon: countryId.code,
    };
    const city = { label: cityId.name, value: cityId._id };

    this._ngCities.extendFilter({ countryId: cityId.countryId._id });

    this.handleAddDataToStream(currency, country, city);

    this._ngCurrencies.triggerFetchData();
    this._ngCountries.triggerFetchData();
    this._ngCities.triggerFetchData();
  }

  private handleViewBetshop(): void {
    this.titleModal = "betshopManagement.betshops.view";
    if (!this.betshopForm || !this.selectedBetshop) return;

    const { currencyId, cityId } = this.selectedBetshop;
    const { countryId } = cityId;

    const currency = { label: currencyId.name, value: currencyId._id };
    const country = {
      label: countryId.name,
      value: countryId._id,
      icon: countryId.code,
    };
    const city = { label: cityId.name, value: cityId._id };

    this.handleAddDataToStream(currency, country, city);

    this.betshopForm.disable();
  }

  private handleAddDataToStream(
    currency: NgSelect<string>,
    country: NgSelect<string>,
    city: NgSelect<string>
  ): void {
    this._ngCurrencies.addDataToStream([
      { label: currency.label, value: currency.value },
    ]);
    this._ngCountries.addDataToStream([
      { label: country.label, value: country.value, icon: country.icon },
    ]);
    this._ngCities.addDataToStream([{ label: city.label, value: city.value }]);
  }

  public onSearchSelect(query: NgSelectQuery, term: string = ""): void {
    const actionMap = new Map<NgSelectQuery, () => void>([
      [NG_SELECT_QUERIES.CURRENCIES, () => this._ngCurrencies.searchTerm(term)],
      [NG_SELECT_QUERIES.COUNTRIES, () => this._ngCountries.searchTerm(term)],
      [NG_SELECT_QUERIES.CITIES, () => this.handleSearchTermForCities(term)],
    ]);
    const action = actionMap.get(query);
    if (action) action();
  }

  public handleSearchTermForCities(term: string): void {
    if (!this.betshopForm) return;
    const { countryId } = this.betshopForm.value;
    this._ngCities.extendFilter({ countryId });
    this._ngCities.searchTerm(term);
  }

  public onScrollToEndSelect(query: NgSelectQuery): void {
    const actionMap = new Map<NgSelectQuery, () => void>([
      [NG_SELECT_QUERIES.CURRENCIES, () => this._ngCurrencies.scrollToEnd()],
      [NG_SELECT_QUERIES.COUNTRIES, () => this._ngCountries.scrollToEnd()],
      [NG_SELECT_QUERIES.CITIES, () => this._ngCities.scrollToEnd()],
    ]);
    const action = actionMap.get(query);
    if (action) action();
  }

  public onCountryChange(event?: NgSelect<string>): void {
    this._ngCities.resetNgSelect();
    this.betshopForm?.patchValue({ cityId: "" });

    if (!event) return;

    this._ngCities.extendFilter({ countryId: event.value });
    this._ngCities.triggerFetchData();
  }

  public closeModal(): void {
    this._bsModalService.closeModal();
  }

  public onSubmit(): void {
    if (
      !this.activeButtonAction ||
      !this.betshopForm ||
      this.betshopForm.invalid
    ) {
      return;
    }

    const executeAction = this.handleSubmitAction(this.activeButtonAction);
    executeAction();
  }

  private handleSubmitAction(buttonAction: ButtonAction): () => void {
    const actionMap = new Map<ButtonAction, () => void>([
      [BUTTON_ACTIONS.ADD, () => this.onAddBetshop()],
      [BUTTON_ACTIONS.EDIT, () => this.onEditBetshop()],
    ]);
    return actionMap.get(buttonAction) || (() => {});
  }

  private onAddBetshop(): void {
    const betshopForm = this.getBetshopFromForm();
    this._betshopService.createBetshop(betshopForm).subscribe({
      next: () => this.afterSubmitForm(),
    });
  }

  private getBetshopFromForm(): object {
    if (!this.betshopForm) return {};

    const {
      name,
      address,
      ipClient,
      currencyId,
      cityId,
      latitude,
      longitude,
      isVisible,
      isActive,
    } = this.betshopForm.value;

    return {
      name,
      address,
      ipClient,
      currencyId,
      cityId,
      latitude,
      longitude,
      isVisible,
      isActive,
    };
  }

  private onEditBetshop(): void {
    // if (!this.selectedBetshop || !this.betshopForm) return;

    // const selectedBetshop = this.getSelectedBetshop();
    // const betshopForm = this.getBetshopFromForm();

    // const editedBetshop =""
    // if (!Object.keys(editedBetshop).length) {
    //   const message = this._translateService.instant("words.noChangesForm");
    //   this._notificationService.showNotification({
    //     type: "warning",
    //     title: "betshopManagement.betshops.title",
    //     message,
    //   });
    //   return;
    // }

    // const { _id } = this.selectedBetshop;
    // const { latitude, longitude } = this.betshopForm.value;
    // const data = { latitude, longitude, ...editedBetshop };

    // this._betshopService.updateBetshop(_id, data).subscribe({
    //   next: () => this.afterSubmitForm(),
    // });
  }

  private getSelectedBetshop(): object {
    const { _id, createdAt, updatedAt, coordinates, ...rest } =
      this.selectedBetshop!;
    const { latitude, longitude } = coordinates;

    return {
      ...rest,
      latitude,
      longitude,
      currencyId: rest.currencyId._id,
      cityId: rest.cityId._id,
    };
  }

  private afterSubmitForm(): void {
    this._filterService.updateFilterData({});
    this.closeModal();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
