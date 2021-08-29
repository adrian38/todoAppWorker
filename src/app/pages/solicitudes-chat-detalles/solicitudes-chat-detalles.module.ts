import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesChatDetallesPageRoutingModule } from './solicitudes-chat-detalles-routing.module';

import { SolicitudesChatDetallesPage } from './solicitudes-chat-detalles.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesChatDetallesPageRoutingModule,
    ComponentsModule,
    DialogModule
  ],
  declarations: [SolicitudesChatDetallesPage],
  providers: [
    ScreenOrientation
 ]
})
export class SolicitudesChatDetallesPageModule {}
