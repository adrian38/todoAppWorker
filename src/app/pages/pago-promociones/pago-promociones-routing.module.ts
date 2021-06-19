import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoPromocionesPage } from './pago-promociones.page';

const routes: Routes = [
  {
    path: '',
    component: PagoPromocionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoPromocionesPageRoutingModule {}
