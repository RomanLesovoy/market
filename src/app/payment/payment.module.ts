import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { DepositContentComponent } from './deposit-content/deposit-content.component';
import { PaymentDialogComponent } from './payment-modal/payment-modal.component';
import { PaymentComponent } from './payment.component';
import { ShareLibModulesModule } from '../shared/share-lib-modules/share-lib-modules.module';
import { WithdrawContentComponent } from './withdraw-content/withdraw-content.component';
import { SwapContentComponent } from './swap-content/swap-content.component';
import { MarketsModule } from '../markets/markets.module';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [
    PaymentDialogComponent,
    PaymentComponent,
    DepositContentComponent,
    WithdrawContentComponent, // explain: ng generate component payment/WithdrawContent - creates a folder and puts it to closest module
    SwapContentComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MarketsModule, // explain without import module we can't use it's own components + requires to restart build
    ShareLibModulesModule, // explain: we can use modules to import\export
    QRCodeModule,
  ],
})
export class PaymentModule {}
