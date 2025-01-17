import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-permission-modal',
  templateUrl: './permission-modal.component.html',
  styleUrls: ['./permission-modal.component.scss'],
})
export class PermissionModalComponent {
  @Input() title: string = 'Confirmación';
  @Input() message: string = '¿Está seguro de realizar esta acción?';
  @Input() confirmButtonText: string = 'Confirmar';
  @Input() cancelButtonText: string = 'Cancelar';
  @Input() show: boolean = false;

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  closeModal(): void {
    this.onCancel.emit();
  }
}
