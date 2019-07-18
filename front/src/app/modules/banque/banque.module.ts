import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanqueRoutingModule } from './banque-routing.module';
import { BankListComponent } from './components/bank-list/bank-list.component';

@NgModule({
  declarations: [BankListComponent],
  imports: [
    CommonModule,
    BanqueRoutingModule
  ]
})
export class BanqueModule { }
