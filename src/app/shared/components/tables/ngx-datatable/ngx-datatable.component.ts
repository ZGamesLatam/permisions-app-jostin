import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { DEFAULT_NGX_DATATABLE_CONFIG } from "src/app/core/helpers/ui/ngx-datatable.constant";
import { NgxDatatableConfig } from "src/app/core/interfaces/ui/ngx-datatable.interface";

@Component({
  selector: "shared-tables-ngx-datatable",
  templateUrl: "./ngx-datatable.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class NgxDatatableComponent {
  public ngxConfig: NgxDatatableConfig = { ...DEFAULT_NGX_DATATABLE_CONFIG };
  private hasEmittedFirstHigherLimit: boolean = false;

  @Input({ required: true })
  public data: any[] | null = [];

  @Input({ required: true })
  set config(value: Partial<NgxDatatableConfig> | null) {
    this.ngxConfig = { ...DEFAULT_NGX_DATATABLE_CONFIG, ...value };
  }

  @Output()
  public onSelectRow: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public onChangeLimit: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public onChangePage: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  public emitOnSelectRow(selectedRow: any): void {
    if (!selectedRow) return;
    this.onSelectRow.emit(selectedRow);
  }

  public emitOnChangeLimit(event: Event): void {
    const limit = (event.target as HTMLSelectElement).value;
    const formattedLimit = parseInt(limit);
    this.ngxConfig.limit = formattedLimit;
    const shouldEmitLimit = this.shouldEmitLimit(
      this.ngxConfig.count,
      this.ngxConfig.limit
    );
    if (shouldEmitLimit) {
      this.onChangeLimit.emit(this.ngxConfig.limit);
    }
  }

  public emitOnChangePage($event: { page: number }): void {
    if (!$event.page) return;
    this.ngxConfig.page = $event.page;
    this.onChangePage.emit(this.ngxConfig.page);
  }

  public toggleExpandRow(ngxDatatable: DatatableComponent, row: any) {
    ngxDatatable.rowDetail.toggleExpandRow(row);
  }

  public defaultSumaryFunc(): void {}

  private shouldEmitLimit(count: number, limit: number): boolean {
    const cond1 = this.shouldEmitOnLimitExceeded(count, limit);
    const cond2 = this.shouldEmitOnFirstLowerCount(count, limit);
    return cond1 || cond2;
  }

  private shouldEmitOnLimitExceeded(count: number, limit: number): boolean {
    if (limit < count) {
      this.hasEmittedFirstHigherLimit = false;
      return true;
    }
    return false;
  }

  private shouldEmitOnFirstLowerCount(count: number, limit: number): boolean {
    if (count < limit && !this.hasEmittedFirstHigherLimit) {
      this.hasEmittedFirstHigherLimit = true;
      return true;
    }
    return false;
  }
}
