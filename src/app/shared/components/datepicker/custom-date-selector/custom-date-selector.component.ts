import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import {
  DAYS_DATA,
  MONTH_DATA,
  YEARS_DATA,
} from "src/app/core/helpers/ui/ui.constant";
import { CustomDateSelector } from "src/app/core/interfaces/ui/ui.interface";
import { BootstrapModalService } from "src/app/core/services/ui/bootstrap-modal.service";

@Component({
  selector: "shared-custom-date-selector",
  templateUrl: "./custom-date-selector.component.html",
  styleUrl: "./custom-date-selector.component.scss",
})
export class CustomDateSelectorComponent {
  @Output() customDateSelectorEmitter: EventEmitter<CustomDateSelector> =
    new EventEmitter();
  @Input() customDateSelectorData!: CustomDateSelector;
  private _subscriptions: Subscription[] = [];

  years: number[] = YEARS_DATA;
  months: string[] = MONTH_DATA;
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  weekDays = DAYS_DATA;
  public showButton: boolean = false;
  selectedYears: number[] = [];
  selectedMonths: string[] = [];
  selectedDays: number[] = [];
  selectedWeekDays: string[] = [];
  @Input()
  data!: {};
  constructor(
    private _bsModalService: BootstrapModalService<any>,
    public activeModal: NgbActiveModal
  ) {}
  ngOnInit(): void {
    this.customDateSelectorData?.selectedYears
      ? (this.selectedYears = this.customDateSelectorData?.selectedYears)
      : null;
    this.customDateSelectorData?.selectMonth
      ? (this.selectedMonths = this.customDateSelectorData?.selectMonth)
      : null;
    this.customDateSelectorData?.selectedDays
      ? (this.selectedDays = this.customDateSelectorData?.selectedDays)
      : null;
    this.customDateSelectorData?.selectWeekDay
      ? (this.selectedWeekDays = this.customDateSelectorData?.selectWeekDay)
      : null;
    this.emitData();
    if (!this.data) {
      this.showButton = true;
      this.getModalData();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["customDateSelectorData"]) {
      this.ngOnInit();
    }
  }
  getModalData() {
    this._subscriptions.push(
      this._bsModalService.getDataIssued().subscribe(
        (response) => {
          this.data = response.type;
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }
  selectYear(year: number) {
    // this.selectedYears = year;
    if (this.selectedYears.includes(year)) {
      this.selectedYears = this.selectedYears.filter((m) => m !== year);
    } else {
      this.selectedYears.push(year);
    }
    this.emitData();
  }

  selectMonth(month: string) {
    if (this.selectedMonths.includes(month)) {
      this.selectedMonths = this.selectedMonths.filter((m) => m !== month);
    } else {
      this.selectedMonths.push(month);
    }
    this.emitData();
  }

  selectDay(day: number) {
    if (this.selectedDays.includes(day)) {
      this.selectedDays = this.selectedDays.filter((d) => d !== day);
    } else {
      this.selectedDays.push(day);
    }
    this.emitData();
  }
  selectWeekDay(weekDay: string) {
    if (this.selectedWeekDays.includes(weekDay)) {
      this.selectedWeekDays = this.selectedWeekDays.filter(
        (m) => m !== weekDay
      );
    } else {
      this.selectedWeekDays.push(weekDay);
    }
    this.emitData();
  }
  isSelectedYear(year: number): boolean {
    return this.selectedYears.includes(year);
  }

  isSelectedMonth(month: string): boolean {
    return this.selectedMonths.includes(month);
  }

  isSelectedDay(day: number): boolean {
    return this.selectedDays.includes(day);
  }
  isSelectedWeekDay(weekDay: string): boolean {
    return this.selectedWeekDays.includes(weekDay);
  }
  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  closeModal(): void {
    this._bsModalService.updateDataIssued({
      selectedYears: this.selectedYears,
      selectMonth: this.selectedMonths,
      selectedDays: this.selectedDays,
      selectWeekDay: this.selectedWeekDays,
    });
    this.activeModal.close();
    this._bsModalService.updateModalClosedListener();
  }
  emitData() {
    this.customDateSelectorEmitter.emit({
      selectedYears: this.selectedYears,
      selectMonth: this.selectedMonths,
      selectedDays: this.selectedDays,
      selectWeekDay: this.selectedWeekDays,
    });
  }
}
