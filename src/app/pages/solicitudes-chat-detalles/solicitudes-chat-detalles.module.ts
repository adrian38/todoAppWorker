import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesChatDetallesPageRoutingModule } from './solicitudes-chat-detalles-routing.module';

import { SolicitudesChatDetallesPage } from './solicitudes-chat-detalles.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesChatDetallesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SolicitudesChatDetallesPage]
})
export class SolicitudesChatDetallesPageModule {}
