import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  Type,
} from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject, takeUntil } from "rxjs";
import { BootstrapModalService } from "src/app/core/services/ui/bootstrap-modal.service";

@Component({
  selector: "shared-modals-bootstrap",
  templateUrl: "./bootstrap-modal.component.html",
})
export class BootstrapModalComponent implements OnInit, OnDestroy {
  @Input()
  public component: Type<any> | null = null;

  @Input()
  public template: TemplateRef<any> | null = null;

  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _activeModal: NgbActiveModal,
    private _bsModalService: BootstrapModalService<null>
  ) {}

  ngOnInit(): void {
    this._bsModalService
      .getModalClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => this._activeModal.close());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
