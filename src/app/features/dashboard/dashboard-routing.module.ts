import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PermissionListComponent } from '../permissions/pages/permission-list/permission-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'permissions',
        component: PermissionListComponent, // Aquí cargas el componente de la tabla
      },
      {
        path: '', // Redirección por defecto
        redirectTo: 'permissions',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
