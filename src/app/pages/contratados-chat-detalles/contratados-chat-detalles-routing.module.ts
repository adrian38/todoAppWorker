import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContratadosChatDetallesPage } from './contratados-chat-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: ContratadosChatDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContratadosChatDetallesPageRoutingModule {}
