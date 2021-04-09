import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudesChatDetallesPage } from './solicitudes-chat-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesChatDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesChatDetallesPageRoutingModule {}
