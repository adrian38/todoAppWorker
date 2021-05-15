import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPromocionPageRoutingModule } from './crear-promocion-routing.module';

import { CrearPromocionPage } from './crear-promocion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearPromocionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CrearPromocionPage]
})
export class CrearPromocionPageModule {}
