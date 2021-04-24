import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarcontrasePageRoutingModule } from './recuperarcontrase-routing.module';

import { RecuperarcontrasePage } from './recuperarcontrase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarcontrasePageRoutingModule
  ],
  declarations: [RecuperarcontrasePage]
})
export class RecuperarcontrasePageModule {}
