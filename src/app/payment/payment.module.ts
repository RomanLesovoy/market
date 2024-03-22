import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { PaymentRoutingModule } from './payment-routing.module';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { PaymentDialogComponent } from './payment-modal/payment-modal.component';


@NgModule({
  declarations: [
    DepositComponent,
    WithdrawComponent,
    PaymentDialogComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    // MatFormFieldModule,
    // MatInputModule,
    // FormsModule,
    // MatButtonModule,
    MatDialogModule,
  ],
})
export class PaymentModule {
  constructor() {
    console.log('000')
  }
}
