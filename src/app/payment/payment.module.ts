import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { DepositComponent } from './deposit/deposit.component';
import { DepositContentComponent } from './deposit/deposit-content/deposit-content.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { PaymentDialogComponent } from './payment-modal/payment-modal.component';
import { PaymentComponent } from './payment.component';
import { ShareLibModulesModule } from '../shared/share-lib-modules/share-lib-modules.module';
import { WithdrawContentComponent } from './withdraw/withdraw-content/withdraw-content.component';


@NgModule({
  declarations: [
    DepositComponent,
    WithdrawComponent,
    PaymentDialogComponent,
    PaymentComponent,
    DepositContentComponent,
    WithdrawContentComponent, // explain: ng generate component payment/withdraw/WithdrawContent - creates a folder and puts it to closest module
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ShareLibModulesModule, // explain: we can use modules to import\export
  ],
})
export class PaymentModule {}
