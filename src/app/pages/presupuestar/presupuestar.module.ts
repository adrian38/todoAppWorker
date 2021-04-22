import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PresupuestarPageRoutingModule } from './presupuestar-routing.module';

import { PresupuestarPage } from './presupuestar.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PresupuestarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PresupuestarPage]
})
export class PresupuestarPageModule {}
