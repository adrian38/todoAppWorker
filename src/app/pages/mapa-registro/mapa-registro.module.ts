import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaRegistroPageRoutingModule } from './mapa-registro-routing.module';

import { MapaRegistroPage } from './mapa-registro.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaRegistroPageRoutingModule,
    AgmCoreModule,
  ],
  declarations: [MapaRegistroPage]
})
export class MapaRegistroPageModule {}
