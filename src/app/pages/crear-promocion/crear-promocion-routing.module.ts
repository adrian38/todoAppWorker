import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearPromocionPage } from './crear-promocion.page';

const routes: Routes = [
  {
    path: '',
    component: CrearPromocionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearPromocionPageRoutingModule {}
