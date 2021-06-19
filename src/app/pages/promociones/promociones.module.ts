import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromocionesPageRoutingModule } from './promociones-routing.module';

import { PromocionesPage } from './promociones.page';
import { ComponentsModule } from 'src/app/components/components.module';

import {DialogModule} from 'primeng/dialog';
import {LightboxModule} from 'primeng/lightbox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromocionesPageRoutingModule,
    ComponentsModule,
    LightboxModule,
    DialogModule
  ],
  declarations: [PromocionesPage]
})
export class PromocionesPageModule {}
