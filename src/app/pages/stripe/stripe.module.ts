import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StripePageRoutingModule } from './stripe-routing.module';

import { StripePage } from './stripe.page';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToastModule,
    StripePageRoutingModule
  ],
  declarations: [StripePage]
})
export class StripePageModule {}
