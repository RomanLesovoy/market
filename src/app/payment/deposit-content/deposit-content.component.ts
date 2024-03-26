import { Component } from '@angular/core';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-deposit-content',
  templateUrl: './deposit-content.component.html',
  styleUrl: './deposit-content.component.scss',
})
export class DepositContentComponent {
  public selectedCurrency: any = { payment_routes: [] };
  public selectedPaymentRouteId: string = '';

  constructor(private service: PaymentService) {}

  onChangeCurrency = (_currency_id: string, currency: any) => {
    this.selectedPaymentRouteId = '';
    this.selectedCurrency = currency;
  }

  onChangeProvider = (payment_route_id: string) => {
    this.selectedPaymentRouteId = payment_route_id;
  }

  createDeposit() {
    this.service.createDeposit({ currency_id: this.selectedCurrency.currency_id, payment_route_id: this.selectedPaymentRouteId })
      .subscribe((res) => console.log(res))
  }
}
