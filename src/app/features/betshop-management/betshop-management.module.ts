import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { BetshopManagementRoutingModule } from './betshop-management-routing.module';
import { BetshopFilterFormComponent } from './components/betshop-filter-form/betshop-filter-form.component';
import { BetshopModalFormComponent } from './components/betshop-modal-form/betshop-modal-form.component';
import { BetshopComponent } from './pages/betshop/betshop.component';

@NgModule({
  declarations: [
    BetshopComponent,
    BetshopModalFormComponent,
    BetshopFilterFormComponent,
  ],
  imports: [CommonModule, SharedModule, BetshopManagementRoutingModule],
})
export class BetshopManagementModule {}
