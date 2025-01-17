import { Injectable, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BootstrapModalComponent } from 'src/app/shared/components/modals/bootstrap-modal/bootstrap-modal.component';
import { BootstrapModalConfig } from '../../interfaces/ui/bootstrap-modal.interface';

const DEFAULT_BOOTSTRAP_MODAL_OPTIONS: NgbModalOptions = {
  backdrop: 'static',
  centered: true,
  keyboard: false,
  size: 'lg',
};

@Injectable({
  providedIn: 'root',
})
export class BootstrapModalService<T> implements OnDestroy {
  private dataIssuedSubject: BehaviorSubject<T>;
  private modalClosedSubject: Subject<string | null>;
  private defaultOptions: NgbModalOptions;
  private modalClosedListenerSubject: Subject<void>;
  constructor(private _modalService: NgbModal) {
    this.dataIssuedSubject = new BehaviorSubject<T>(null as T);
    this.modalClosedSubject = new Subject<string | null>();
    this.defaultOptions = DEFAULT_BOOTSTRAP_MODAL_OPTIONS;
    this.modalClosedListenerSubject = new Subject<void>();
  }

  private restoreDefaultOptions(): void {
    this.defaultOptions = DEFAULT_BOOTSTRAP_MODAL_OPTIONS;
  }

  public openModal(bootstrapModalConfig: BootstrapModalConfig<T>): void {
    const hasTemplateOrComponent = this.handleOpenModal(bootstrapModalConfig);

    if (!hasTemplateOrComponent) {
      // TODO: Add alert
      return;
    }

    this.restoreDefaultOptions();

    if (bootstrapModalConfig.options) {
      this.defaultOptions = {
        ...this.defaultOptions,
        ...bootstrapModalConfig.options,
      };
    }

    const modalRef = this._modalService.open(
      BootstrapModalComponent,
      this.defaultOptions
    );

    modalRef.componentInstance.component = bootstrapModalConfig.component;
    modalRef.componentInstance.template = bootstrapModalConfig.template;

    if (bootstrapModalConfig.data) {
      this.updateDataIssued(bootstrapModalConfig.data);
    }
  }

  private handleOpenModal(config: BootstrapModalConfig<T | null>): boolean {
    if (!config.template && !config.component) {
      return false;
    } else {
      return true;
    }
  }

  // Data
  public updateDataIssued(dataIssued: T): void {
    this.dataIssuedSubject.next(dataIssued);
  }

  updateModalClosedListener() {
    this.modalClosedListenerSubject.next();
  }

  getModalClosedListener(): Observable<void> {
    return this.modalClosedListenerSubject.asObservable();
  }

  public getDataIssued(): Observable<T> {
    return this.dataIssuedSubject.asObservable();
  }

  // Close modal
  public closeModal(id?: string): void {
    const hasId = id ?? null;
    this.modalClosedSubject.next(hasId);
  }

  public getModalClosed(): Observable<string | null> {
    return this.modalClosedSubject.asObservable();
  }

  ngOnDestroy(): void {
    this.dataIssuedSubject.complete();
    this.modalClosedSubject.complete();
  }
}
