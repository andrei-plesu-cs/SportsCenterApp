import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleRoutingModule } from './shared-module-routing.module';

import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { CheckButtonComponent } from 'src/app/components/check-button/check-button.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    CheckButtonComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    SharedModuleRoutingModule
  ],
  exports: [
    LoadingSpinnerComponent,
    CheckButtonComponent,
    ModalComponent
  ]
})
export class SharedModuleModule { }
