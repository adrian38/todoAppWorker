import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContratadosChatDetallesPageRoutingModule } from './contratados-chat-detalles-routing.module';

import { ContratadosChatDetallesPage } from './contratados-chat-detalles.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContratadosChatDetallesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ContratadosChatDetallesPage]
})
export class ContratadosChatDetallesPageModule {}
