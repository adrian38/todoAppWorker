import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ToastModule } from 'primeng/toast';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    ComponentsModule,
    ToastModule,
    DialogModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
