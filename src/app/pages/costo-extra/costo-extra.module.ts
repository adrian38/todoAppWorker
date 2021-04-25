import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CostoExtraPageRoutingModule } from './costo-extra-routing.module';

import { CostoExtraPage } from './costo-extra.page';

import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CostoExtraPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CostoExtraPage]
})
export class CostoExtraPageModule {}
