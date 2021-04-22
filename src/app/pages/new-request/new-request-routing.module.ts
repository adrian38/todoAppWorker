import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';

import { NewRequestPage } from './new-request.page';

const routes: Routes = [
  {
    path: '',
    component: NewRequestPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class NewRequestPageRoutingModule {}
