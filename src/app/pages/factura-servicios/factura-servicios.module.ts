import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturaServiciosPageRoutingModule } from './factura-servicios-routing.module';

import { FacturaServiciosPage } from './factura-servicios.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturaServiciosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FacturaServiciosPage]
})
export class FacturaServiciosPageModule {}
