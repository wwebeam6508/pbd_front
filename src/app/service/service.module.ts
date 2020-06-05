import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicePageRoutingModule } from './service-routing.module';

import { ServicePage } from './service.page';
import { ComponentsModule } from '../components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ServicePage]
})
export class ServicePageModule {}
