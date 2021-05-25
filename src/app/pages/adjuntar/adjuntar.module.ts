import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdjuntarPageRoutingModule } from './adjuntar-routing.module';

import { AdjuntarPage } from './adjuntar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdjuntarPageRoutingModule
  ],
  declarations: [AdjuntarPage]
})
export class AdjuntarPageModule {}
