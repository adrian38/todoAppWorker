import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturaCostosPageRoutingModule } from './factura-costos-routing.module';

import { FacturaCostosPage } from './factura-costos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturaCostosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FacturaCostosPage]
})
export class FacturaCostosPageModule {}
