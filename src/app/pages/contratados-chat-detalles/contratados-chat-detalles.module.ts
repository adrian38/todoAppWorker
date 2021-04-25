import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContratadosChatDetallesPageRoutingModule } from './contratados-chat-detalles-routing.module';

import { ContratadosChatDetallesPage } from './contratados-chat-detalles.page';
import { ComponentsModule } from 'src/app/components/components.module';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContratadosChatDetallesPageRoutingModule,
    DialogModule,
    ComponentsModule
  ],
  declarations: [ContratadosChatDetallesPage]
})
export class ContratadosChatDetallesPageModule {}
