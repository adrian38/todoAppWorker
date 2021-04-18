import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresupuestarPage } from './presupuestar.page';

const routes: Routes = [
  {
    path: '',
    component: PresupuestarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresupuestarPageRoutingModule {}
