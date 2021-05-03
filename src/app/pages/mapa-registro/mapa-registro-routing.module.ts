import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaRegistroPage } from './mapa-registro.page';

const routes: Routes = [
  {
    path: '',
    component: MapaRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaRegistroPageRoutingModule {}
