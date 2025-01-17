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
  public selectedFile: File | null = null;
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

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type === 'application/pdf') {
        this.selectedFile = file;
        console.log('Archivo seleccionado:', file.name);
      } else {
        console.error(
          'Formato de archivo no permitido. Solo PDFs son válidos.'
        );
        this.selectedFile = null;
      }
    }
  }

  handleConfirm(): void {
    if (this.createPermissionForm.valid) {
      const formData = new FormData();

      // Agregar datos del formulario
      formData.append(
        'permissionTypeId',
        this.createPermissionForm.get('permissionTypeId')?.value
      );
      formData.append(
        'startDate',
        this.createPermissionForm.get('startDate')?.value
      );
      formData.append(
        'endDate',
        this.createPermissionForm.get('endDate')?.value
      );
      formData.append(
        'description',
        this.createPermissionForm.get('description')?.value
      );
      formData.append('userId', localStorage.getItem('userAdminId') || '');

      // Adjuntar el archivo si existe
      if (this.selectedFile) {
        formData.append('attachment', this.selectedFile);
      }

      // Emitir el FormData
      this.onConfirm.emit(formData);
    }
  }

  handleCancel(): void {
    this.onCancel.emit();
  }
}
