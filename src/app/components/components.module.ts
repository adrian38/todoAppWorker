import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TabHeaderComponent } from './tab-header/tab-header.component';
import { SolicitudComponent } from './solicitud/solicitud.component';


@NgModule({
  declarations: [
    TabHeaderComponent,
    SolicitudComponent
  ],
  exports: [
    TabHeaderComponent,
    SolicitudComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
