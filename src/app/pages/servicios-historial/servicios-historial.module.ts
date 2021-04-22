import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiciosHistorialPageRoutingModule } from './servicios-historial-routing.module';

import { ServiciosHistorialPage } from './servicios-historial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciosHistorialPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ServiciosHistorialPage]
})
export class ServiciosHistorialPageModule {}
