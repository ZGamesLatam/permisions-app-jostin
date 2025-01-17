import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { PermissionTypeService } from 'src/app/core/services/api/permissionType.service';

@Component({
  selector: 'app-create-permission-modal',
  templateUrl: './create-permission-modal.component.html',
})
export class CreatePermissionModalComponent implements OnInit {
  @Input() show: boolean = false;
  @Input() title: string = 'Crear Permiso';
  @Output() onConfirm = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  public createPermissionForm: FormGroup;
  public permissionTypes$: Observable<{ label: string; value: string }[]> = of(
    []
  );

  constructor(
    private fb: FormBuilder,
    private permissionTypeService: PermissionTypeService
  ) {
    this.createPermissionForm = this.fb.group({
      permissionTypeId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    this.loadPermissionTypes();
  }

  private loadPermissionTypes(): void {
    this.permissionTypeService.getPermissionTypes().subscribe({
      next: (types) => {
        this.permissionTypes$ = of(
          types.map((type) => ({ label: type.name, value: type._id }))
        );
      },
      error: (err) => {
        console.error('Error al cargar los tipos de permisos:', err);
      },
    });
  }

  handleConfirm(): void {
    if (this.createPermissionForm.valid) {
      // Agregar automáticamente el userId desde el localStorage
      const permissionData = {
        ...this.createPermissionForm.value,
        userId: localStorage.getItem('userAdminId'), // Asegúrate de usar la clave correcta
      };

      this.onConfirm.emit(permissionData); // Emitir el objeto completo con userId
    }
  }

  handleCancel(): void {
    this.onCancel.emit();
  }
}
