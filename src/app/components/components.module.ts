import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address/address.component';
import { IonicModule } from '@ionic/angular';
import { TabHeaderComponent } from './tab-header/tab-header.component';
import { RequestComponent } from './request/request.component';



@NgModule({
  declarations: [
    AddressComponent,
    TabHeaderComponent,
    RequestComponent
  ],
  exports: [
    AddressComponent,
    TabHeaderComponent,
    RequestComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
