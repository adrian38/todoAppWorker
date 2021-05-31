import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdjuntarPage } from './adjuntar.page';

const routes: Routes = [
  {
    path: '',
    component: AdjuntarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdjuntarPageRoutingModule {}
