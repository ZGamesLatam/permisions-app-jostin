import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  BETSHOP_NG_SELECT_STATUSES,
  BETSHOP_VALIDATIONS,
} from 'src/app/core/helpers/global/betshop-management.constant';
import { NG_SELECT_QUERIES } from 'src/app/core/helpers/ui/ui.constant';
import {
  NgSelect,
  NgSelectQuery,
} from 'src/app/core/interfaces/ui/ui.interface';
import { FilterService } from 'src/app/core/services/ui/filter.service';
import { SearchNgSelectService } from 'src/app/core/services/ui/search-ng-select.service';

@Component({
  selector: 'betshop-management-betshop-filter-form',
  templateUrl: './betshop-filter-form.component.html',
  providers: [
    { provide: 'ngCurrencies', useClass: SearchNgSelectService },
    { provide: 'ngCountries', useClass: SearchNgSelectService },
    { provide: 'ngCities', useClass: SearchNgSelectService },
  ],
})
export class BetshopFilterFormComponent implements OnInit {
  public NG_SELECT_QUERIES = NG_SELECT_QUERIES;
  public BETSHOP_VALIDATIONS = BETSHOP_VALIDATIONS;

  public betshopFilterForm: FormGroup | undefined = undefined;

  public currencies$: Observable<NgSelect<string>[]> = of([]);
  public countries$: Observable<NgSelect<string>[]> = of([]);
  public cities$: Observable<NgSelect<string>[]> = of([]);
  public isVisible$: Observable<NgSelect<boolean | string>[]> = of([]);
  public isActive$: Observable<NgSelect<boolean | string>[]> = of();

  constructor(
    private _formBuilder: FormBuilder,
    private _filterService: FilterService<object>,
    //private _currencyService: CurrencyService,
    //private _countryService: CountryService,
    //private _cityService: CityService,

    @Inject('ngCurrencies')
    private _ngCurrencies: SearchNgSelectService<string>,
    @Inject('ngCountries')
    private _ngCountries: SearchNgSelectService<string>,
    @Inject('ngCities')
    private _ngCities: SearchNgSelectService<string>
  ) {}

  ngOnInit(): void {
    this.isVisible$ = of(BETSHOP_NG_SELECT_STATUSES);
    this.isActive$ = of(BETSHOP_NG_SELECT_STATUSES);

    this.betshopFilterForm = this.getConfigForm();
    this.setConfigNgSelects();
  }

  private getConfigForm(): FormGroup {
    return this._formBuilder.group({
      name: ['', [Validators.maxLength(BETSHOP_VALIDATIONS.NAME.MAX_LENGTH)]],
      address: [
        '',
        [Validators.maxLength(BETSHOP_VALIDATIONS.ADDRESS.MAX_LENGTH)],
      ],
      ipClient: [
        '',
        [Validators.maxLength(BETSHOP_VALIDATIONS.IP_CLIENT.MAX_LENGTH)],
      ],
      currencyId: [''],
      countryId: [''],
      cityId: [''],
      isVisible: [''],
      isActive: [''],
    });
  }

  private setConfigNgSelects(): void {
    // this._ngCurrencies.setSearchTermKey("name");
    // this._ngCurrencies.addDataToStream([{ label: "words.all", value: "" }]);
    // this._ngCurrencies.setFetchDataFunction(
    //   this._currencyService.findCurrenciesForSelect.bind(this._currencyService)
    // );
    // this._ngCurrencies.triggerFetchData();
    // this.currencies$ = this._ngCurrencies.getData();
    // this._ngCountries.setSearchTermKey("name");
    // this._ngCountries.addDataToStream([{ label: "words.all", value: "" }]);
    // this._ngCountries.setFetchDataFunction(
    //   this._countryService.findCountriesForSelect.bind(this._countryService)
    // );
    // this._ngCountries.triggerFetchData();
    // this.countries$ = this._ngCountries.getData();
    // this._ngCities.setSearchTermKey("name");
    // this._ngCities.addDataToStream([{ label: "words.all", value: "" }]);
    // this._ngCities.setFetchDataFunction(
    //   this._cityService.findCitiesForSelect.bind(this._cityService)
    // );
    // this._ngCities.triggerFetchData();
    // this.cities$ = this._ngCities.getData();
  }

  public onSearchSelect(query: NgSelectQuery, term?: string): void {
    const termText = term || '';
    const actionMap = new Map<NgSelectQuery, () => void>([
      [
        NG_SELECT_QUERIES.CURRENCIES,
        () => this._ngCurrencies.searchTerm(termText),
      ],
      [
        NG_SELECT_QUERIES.COUNTRIES,
        () => this._ngCountries.searchTerm(termText),
      ],
      [NG_SELECT_QUERIES.CITIES, () => this._ngCities.searchTerm(termText)],
    ]);
    const action = actionMap.get(query);
    if (action) action();
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

  public onCountryChange(event: NgSelect<string>): void {
    if (!this.betshopFilterForm) return;
    this._ngCities.resetNgSelect();
    this._ngCities.extendFilter({ countryId: event.value });
    this._ngCities.addDataToStream([{ label: 'words.all', value: '' }]);
    this._ngCities.triggerFetchData();
    this.betshopFilterForm.patchValue({ cityId: '' });
  }

  public onReset(): void {
    if (!this.betshopFilterForm) return;
    this.betshopFilterForm.reset();
    this._ngCities.resetNgSelect();
    this._ngCities.addDataToStream([{ label: 'words.all', value: '' }]);
    this._ngCities.triggerFetchData();
    this.cities$ = this._ngCities.getData();
    this.betshopFilterForm.patchValue({
      currencyId: '',
      countryId: '',
      cityId: '',
      isVisible: '',
      isActive: '',
    });
  }

  public onSubmit(): void {
    if (!this.betshopFilterForm || this.betshopFilterForm.invalid) return;
    // const cleanValues: object = removeEmptyOrSpecificFilters(
    //   this.betshopFilterForm.value,
    //   ''
    // );

    // this._filterService.updateFilterData(cleanValues);
  }
}
