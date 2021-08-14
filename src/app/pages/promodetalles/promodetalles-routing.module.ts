import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromodetallesPage } from './promodetalles.page';

const routes: Routes = [
  {
    path: '',
    component: PromodetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromodetallesPageRoutingModule {}
