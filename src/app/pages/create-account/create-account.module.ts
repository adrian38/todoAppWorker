import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAccountPageRoutingModule } from './create-account-routing.module';

import { CreateAccountPage } from './create-account.page';
import { DropdownModule } from 'primeng/dropdown';
//import { MessageService } from 'primeng/api';
//import {ToastModule} from 'primeng/toast';
//import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAccountPageRoutingModule,
    DropdownModule,
    //MessageService,
    //ToastModule,
    //TableModule
  ],
  declarations: [CreateAccountPage]
  
})
export class CreateAccountPageModule {}
