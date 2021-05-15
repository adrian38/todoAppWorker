import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ComponentsModule } from 'src/app/components/components.module';
import { PopoverIaeComponent } from 'src/app/components/popover-iae/popover-iae.component';

import { CreateAccountPage } from './create-account.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAccountPage
  }
];

@NgModule({
  entryComponents: [PopoverIaeComponent],
  imports: [
    RouterModule.forChild(routes),
    ComponentsModule,
    DropdownModule
  ],
  exports: [RouterModule],
})
export class CreateAccountPageRoutingModule {}
