import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';

export const content: Routes = [
  // {
  //   path: 'betshop-management',
  //   loadChildren: () =>
  //     import(
  //       '../../features/betshop-management/betshop-management.module'
  //     ).then((m) => m.BetshopManagementModule),
  //   canActivate: [AuthGuard],
  // },

  {
    path: 'login',
    loadChildren: () =>
      import('../../features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'permissions',
    loadChildren: () =>
      import('../../features/permissions/permissions.module').then(
        (m) => m.PermissionsModule
      ),
  },
];
