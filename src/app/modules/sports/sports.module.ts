import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SportsRoutingModule } from './sports-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { SportsComponent } from '../../components/sports/sports.component';
import { CardElementComponent } from 'src/app/components/card-element/card-element.component';


@NgModule({
  declarations: [
    SportsComponent,
    CardElementComponent
  ],
  imports: [
    CommonModule,
    SportsRoutingModule,
    SharedModuleModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SportsModule { }
