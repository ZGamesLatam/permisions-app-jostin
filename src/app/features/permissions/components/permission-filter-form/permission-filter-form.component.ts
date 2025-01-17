import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { PermissionTypeService } from 'src/app/core/services/api/permissionType.service';
import { FilterService } from 'src/app/core/services/ui/filter.service';

@Component({
  selector: 'app-permission-filter-form',
  templateUrl: './permission-filter-form.component.html',
})
export class PermissionFilterFormComponent implements OnInit {
  public permissionsFilterForm: FormGroup;

  public statuses$: Observable<{ label: string; value: string }[]> = of([
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'Aprobado', value: 'Approved' },
    { label: 'Rechazado', value: 'Rejected' },
  ]);

  public permissionTypes$: Observable<{ label: string; value: string }[]> = of(
    []
  );

  constructor(
    private fb: FormBuilder,
    private filterService: FilterService<object>,
    private permissionTypeService: PermissionTypeService
  ) {
    this.permissionsFilterForm = this.fb.group({
      userName: [''],
      status: [''],
      permissionType: [''],
    });
  }

  ngOnInit(): void {
    this.loadPermissionTypes();
  }

  private loadPermissionTypes(): void {
    this.permissionTypeService.getPermissionTypes().subscribe({
      next: (types) => {
        console.log('Tipos de permisos recibidos:', types);
        this.permissionTypes$ = of(
          types.map((type) => ({ label: type.name, value: type._id }))
        );
      },
      error: (err) => {
        console.error('Error al cargar los tipos de permisos:', err);
        this.permissionTypes$ = of([]);
      },
    });
  }

  public onReset(): void {
    this.permissionsFilterForm.reset({
      userName: '',
      status: '',
      permissionType: '',
    });
    this.filterService.updateFilterData({}); // Limpia los filtros
  }
  public onSubmit(): void {
    if (this.permissionsFilterForm.invalid) return;

    const filterData = { ...this.permissionsFilterForm.value };

    if (filterData.permissionType) {
      filterData.permissionTypeId = filterData.permissionType;
      delete filterData.permissionType;
    }
    // Normaliza espacios en blanco
    if (filterData.userName) {
      filterData.userName = filterData.userName.trim();
    }
    this.filterService.updateFilterData(filterData);
  }
}
