import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromodetallesPageRoutingModule } from './promodetalles-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PromodetallesPage } from './promodetalles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PromodetallesPageRoutingModule
  ],
  declarations: [PromodetallesPage]
})
export class PromodetallesPageModule {}
