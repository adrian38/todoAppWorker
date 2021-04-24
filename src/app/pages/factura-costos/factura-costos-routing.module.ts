import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturaCostosPage } from './factura-costos.page';

const routes: Routes = [
  {
    path: '',
    component: FacturaCostosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturaCostosPageRoutingModule {}
