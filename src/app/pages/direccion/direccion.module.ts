import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionPageRoutingModule } from './direccion-routing.module';
import { ToastModule } from 'primeng/toast';
import { DireccionPage } from './direccion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccionPageRoutingModule,
    ComponentsModule,
    ToastModule 
  ],
  declarations: [DireccionPage]
})
export class DireccionPageModule {}
