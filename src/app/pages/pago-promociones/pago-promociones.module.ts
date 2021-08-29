import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoPromocionesPageRoutingModule } from './pago-promociones-routing.module';
import { ToastModule } from 'primeng/toast';
import { PagoPromocionesPage } from './pago-promociones.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoPromocionesPageRoutingModule,
    ToastModule,
    ComponentsModule
  ],
  declarations: [PagoPromocionesPage]
})
export class PagoPromocionesPageModule {}
