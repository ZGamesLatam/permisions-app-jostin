import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './shared/components/layout/content/content.component';
import { FullComponent } from './shared/components/layout/full/full.component';
import { full } from './shared/routes/full.routes';
import { content } from './shared/routes/content.routes';
import { LoginComponent } from './features/auth/pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: ContentComponent,
    children: content,
  },
  {
    path: '',
    component: FullComponent,
    children: full,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [
    [
      RouterModule.forRoot(routes, {
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ],
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
