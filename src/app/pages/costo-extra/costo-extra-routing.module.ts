import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CostoExtraPage } from './costo-extra.page';

const routes: Routes = [
  {
    path: '',
    component: CostoExtraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CostoExtraPageRoutingModule {}
