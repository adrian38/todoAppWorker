import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasificacionesPageRoutingModule } from './clasificaciones-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ClasificacionesPage } from './clasificaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ClasificacionesPageRoutingModule
  ],
  declarations: [ClasificacionesPage]
})
export class ClasificacionesPageModule {}
