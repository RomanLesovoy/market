import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositComponent } from './deposit/deposit.component';
// import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

const routes: Routes = [
  {
    path: 'deposit',
    component: DepositComponent,
  },
  {
    path: 'withdraw',
    component: WithdrawComponent,
  },
  // {
  //   path: '',
  //   component: PaymentModalComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {
  constructor() {
    console.log('00')
  }
}
