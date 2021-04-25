import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarcontrasePage } from './recuperarcontrase.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarcontrasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarcontrasePageRoutingModule {}
