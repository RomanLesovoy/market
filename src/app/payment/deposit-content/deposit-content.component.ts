import { Component, ViewEncapsulation } from '@angular/core';
import { PaymentService } from '../payment.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-deposit-content',
  templateUrl: './deposit-content.component.html',
  styleUrl: './deposit-content.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DepositContentComponent {
  public selectedCurrency: any = { payment_routes: [] };
  public selectedPaymentRouteId: string = '';
  public deposit: any = null;
  public isLoading: boolean = false;
  public qrHeight: number = 256;

  constructor(private service: PaymentService) {}

  onChangeCurrency = (_currency_id: string, currency: any) => {
    this.selectedPaymentRouteId = '';
    this.selectedCurrency = currency;
    this.deposit = null;
  }

  onChangeProvider = (payment_route_id: string) => {
    this.selectedPaymentRouteId = payment_route_id;
  }

  createDeposit() {
    this.isLoading = true;
    this.service.createDeposit({ currency_id: this.selectedCurrency.currency_id, payment_route_id: this.selectedPaymentRouteId })
      .pipe(delay(1000))
      .subscribe(({ data }: any) => {
        this.isLoading = false;
        this.deposit = data.deposit_address_crypto;
      })
  }
}
