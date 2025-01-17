import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BetshopComponent } from "./pages/betshop/betshop.component";

const routes: Routes = [
  {
    path: "betshop",
    component: BetshopComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BetshopManagementRoutingModule {}
