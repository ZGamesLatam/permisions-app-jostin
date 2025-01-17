import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionListComponent } from './pages/permission-list/permission-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PermissionModalComponent } from './components/permission-modal/permission-modal.component';
import { PermissionFilterFormComponent } from './components/permission-filter-form/permission-filter-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePermissionModalComponent } from './components/create-permission-modal/create-permission-modal.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    PermissionListComponent,
    PermissionModalComponent,
    PermissionFilterFormComponent,
    CreatePermissionModalComponent,
  ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxPaginationModule,
  ],
})
export class PermissionsModule {}
