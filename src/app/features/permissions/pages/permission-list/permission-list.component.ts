import { Permission } from 'src/app/core/interfaces/api/permission.interface';
import { NgxDatatableConfig } from 'src/app/core/interfaces/ui/ngx-datatable.interface';
import { PermissionService } from 'src/app/core/services/api/permission.service';
import { FilterService } from 'src/app/core/services/ui/filter.service';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import {
  BUTTON_ACTIONS,
  FORMAT_FOR_DATES,
  swalWithBootstrapButtons,
} from 'src/app/core/helpers/ui/ui.constant';
import { ModalWithAction } from 'src/app/core/interfaces/ui/bootstrap-modal.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DEFAULT_NGX_DATATABLE_PAGINATION } from 'src/app/core/helpers/ui/ngx-datatable.constant';
import { ButtonAction } from 'src/app/core/interfaces/ui/ui.interface';
import { BootstrapModalService } from 'src/app/core/services/ui/bootstrap-modal.service';
import { PERMISSION_TABLE_COLUMNS } from 'src/app/core/helpers/global/permission.constant';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss'],
})
export class PermissionListComponent implements OnInit {
  public BUTTON_ACTIONS = BUTTON_ACTIONS;
  public FORMAT_FOR_DATES = FORMAT_FOR_DATES;
  private PAGINATION = DEFAULT_NGX_DATATABLE_PAGINATION;

  public config$ = new BehaviorSubject<Partial<NgxDatatableConfig>>({});
  public data$: Observable<Permission[]> = of([]);
  private filter: object = {};
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  filteredPermisos: any[] = [];
  filters: any = {};
  selectedPermisoId: string | null = null;
  selectedAction: string | null = null;
  showModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';
  totalCount: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  showCreateModal: boolean = false;

  // cambiar con datos de table
  @ViewChild('user', { static: true })
  public userTemplate?: TemplateRef<HTMLElement>;
  @ViewChild('type', { static: true })
  public typeTemplate?: TemplateRef<HTMLElement>;
  @ViewChild('startDate', { static: true })
  public startDateTemplate?: TemplateRef<HTMLElement>;
  @ViewChild('endDate', { static: true })
  public endDateTemplate?: TemplateRef<HTMLElement>;
  @ViewChild('status', { static: true })
  public statusTemplate?: TemplateRef<HTMLElement>;
  @ViewChild('actions', { static: true })
  public actionsTemplate?: TemplateRef<HTMLElement>;

  constructor(
    private permissionService: PermissionService,
    private _filterService: FilterService<object>
  ) {}

  ngOnInit(): void {
    this.suscribeFilter();
    this.config$ = this.setConfigDatatable();
    this.data$ = this.fetchPermissions(this.setFilter());

    // this.fetchPermissions();
    // this.filterService.getFilterData().subscribe((filterData) => {
    //   this.filters = filterData;
    //   console.log('Filtros aplicados:', filterData);
    //   this.currentPage = 1;
    //   this.fetchPermissions();
    // });
  }

  private suscribeFilter(): void {
    this._filterService
      .getFilterData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (filter) => {
          this.filter = filter;
          this.reloadDatatable();
        },
        error: (error) => this.reloadDatatable(),
      });
  }
  private setFilter(): object {
    return {
      ...this.filter,
      limit: this.config$.value.limit,
      page: this.config$.value.page,
    };
  }

  public reloadDatatable(): void {
    this.config$.next({
      ...this.config$.value,
      limit: this.PAGINATION.LIMIT,
      page: this.PAGINATION.PAGE,
    });
    this.data$ = this.fetchPermissions(this.setFilter());
  }

  private setConfigDatatable(): BehaviorSubject<Partial<NgxDatatableConfig>> {
    return new BehaviorSubject<Partial<NgxDatatableConfig>>({
      limit: DEFAULT_NGX_DATATABLE_PAGINATION.LIMIT,
      page: DEFAULT_NGX_DATATABLE_PAGINATION.PAGE,
      columns: [
        ...PERMISSION_TABLE_COLUMNS,
        {
          name: 'Acciones',
          width: 100,
          frozenRight: true,
          cellTemplate: this.actionsTemplate ?? undefined,
        },
      ],
    });
  }
  public onChangeLimit(limit: number): void {
    this.config$.next({
      ...this.config$.value,
      limit,
      page: this.PAGINATION.PAGE,
    });
    this.data$ = this.fetchPermissions(this.setFilter());
  }

  public onChangePage(page: number): void {
    this.config$.next({ ...this.config$.value, page });
    this.data$ = this.fetchPermissions(this.setFilter());
  }
  private fetchPermissions(filter: Object): Observable<Permission[]> {
    this.config$.next({ ...this.config$.value, loadingIndicator: true });
    return this.permissionService.getFilteredPermissions(filter).pipe(
      tap((res) => {
        this.config$.next({
          ...this.config$.value,
          loadingIndicator: false,
          count: res.data.totalCount,
        });
      }),
      map((res) =>
        (res.data.result || []).map((permiso: Permission) => ({
          ...permiso,
          fullName: `${permiso.userId?.firstName || ''} ${
            permiso.userId?.lastName || ''
          }`.trim(),
        }))
      ),
      catchError((error) => {
        this.config$.next({ ...this.config$.value, loadingIndicator: false });
        return of([]);
      })
    );
  }

  openModal(action: string, permisoId: string): void {
    this.selectedAction = action;
    this.selectedPermisoId = permisoId;

    if (action === 'aprobar') {
      this.modalTitle = 'Confirmar Aprobación';
      this.modalMessage = '¿Está seguro de que desea aprobar este permiso?';
    } else if (action === 'rechazar') {
      this.modalTitle = 'Confirmar Rechazo';
      this.modalMessage = '¿Está seguro de que desea rechazar este permiso?';
    }

    this.showModal = true;
  }

  // goToPage(page: number): void {
  //   if (page >= 1 && page <= this.totalPages) {
  //     this.currentPage = page;
  //     this.fetchPermissions();
  //   }
  // }
  openCreateModal(): void {
    this.showCreateModal = true;
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
  }

  handleCreatePermission(permissionData: any): void {
    this.permissionService.createPermission(permissionData).subscribe({
      next: (response) => {
        console.log('Permiso creado exitosamente:', response);
        this.closeCreateModal();
        // Refrescar la lista de permisos si es necesario
      },
      error: (err) => {
        console.error('Error al crear el permiso:', err);
      },
    });
  }

  // handleConfirmAction(): void {
  //   if (this.selectedAction === 'aprobar' && this.selectedPermisoId) {
  //     this.aprobarPermiso(this.selectedPermisoId);
  //   } else if (this.selectedAction === 'rechazar' && this.selectedPermisoId) {
  //     this.rechazarPermiso(this.selectedPermisoId);
  //   }

  //   this.closeModal();
  // }

  // handleCancelAction(): void {
  //   this.closeModal();
  // }

  closeModal(): void {
    this.showModal = false;
  }

  aprobarPermiso(permissionId: string): void {
    const userAdminId = localStorage.getItem('userAdminId');
    if (!userAdminId) {
      console.error('El ID del usuario administrador no está definido');
      return;
    }

    this.permissionService
      .approvePermission(permissionId, userAdminId)
      .subscribe({
        next: () => {
          console.log('Permiso aprobado exitosamente');
          this.data$ = this.fetchPermissions(this.setFilter());
        },
        error: (err) => {
          console.error('Error al aprobar el permiso:', err);
        },
      });
  }

  rechazarPermiso(permissionId: string): void {
    const userAdminId = localStorage.getItem('userAdminId');
    if (!userAdminId) {
      console.error('El ID del usuario administrador no está definido');
      return;
    }

    this.permissionService
      .rejectPermission(permissionId, userAdminId)
      .subscribe({
        next: () => {
          console.log('Permiso rechazado exitosamente');
          this.fetchPermissions(this.setFilter());
        },
        error: (err) => {
          console.error('Error al rechazar el permiso:', err);
        },
      });
  }
}
