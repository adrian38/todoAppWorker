import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TabHeaderComponent } from './tab-header/tab-header.component';


@NgModule({
  declarations: [
    TabHeaderComponent
  ],
  exports: [
    TabHeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
