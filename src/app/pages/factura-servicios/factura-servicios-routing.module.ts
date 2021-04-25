import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturaServiciosPage } from './factura-servicios.page';

const routes: Routes = [
  {
    path: '',
    component: FacturaServiciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturaServiciosPageRoutingModule {}
