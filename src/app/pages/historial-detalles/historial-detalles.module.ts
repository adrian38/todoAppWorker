import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialDetallesPageRoutingModule } from './historial-detalles-routing.module';

import { HistorialDetallesPage } from './historial-detalles.page';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule, 
    HistorialDetallesPageRoutingModule
  ],
  declarations: [HistorialDetallesPage]
})
export class HistorialDetallesPageModule {}
