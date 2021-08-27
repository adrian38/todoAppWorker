import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContrasePageRoutingModule } from './contrase-routing.module';

import { ContrasePage } from './contrase.page';
import { ComponentsModule } from '../../components/components.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContrasePageRoutingModule,
    ComponentsModule,
    ToastModule
   
 
  ],
  declarations: [ContrasePage]
})
export class ContrasePageModule {}
