import { Component, ViewEncapsulation } from '@angular/core';
import { PaymentService } from '../payment.service';
import { MarketsService } from '../../markets/markets.service';
import { debounceTime } from 'rxjs';
import { handleErrorOnObservable } from '../../shared/helpers/handleErrorObs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-withdraw-content',
  templateUrl: './withdraw-content.component.html',
  styleUrl: './withdraw-content.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class WithdrawContentComponent {
  public selectedCurrency: any = { payment_routes: [] };
  public selectedPaymentRouteId: string = '';
  public isLoading: boolean = false;
  public amount: string = '0';
  public address: string = '';

  constructor(private service: PaymentService, private toast: ToastrService, private marketsService: MarketsService) {}

  public get canWithdraw() {
    return !this.isLoading && !!this.selectedPaymentRouteId && !!this.selectedCurrency.payment_routes.length && !!Number(this.amount) && this.address;
  }

  onChangeCurrency = (_currency_id: string, currency: any) => {
    this.selectedPaymentRouteId = '';
    this.selectedCurrency = currency;
  }

  onChangeProvider = (payment_route_id: string) => {
    this.selectedPaymentRouteId = payment_route_id;
  }

  changeAmount(eventTarget: any) {
    this.amount = eventTarget.value;
  }

  changeAddress(eventTarget: any) {
    this.address = eventTarget.value;
  }

  clearFields() {
    this.selectedCurrency = { payment_routes: [] };
    this.selectedPaymentRouteId = '';
    this.amount = '0';
    this.address = '';
  }

  createWithdraw() {
    this.isLoading = true;
    this.service.createWithdraw({
      currency_id: this.selectedCurrency.currency_id,
      payment_route_id: this.selectedPaymentRouteId,
      amount: Number(this.amount),
      crypto_address: this.address,
    })
      .pipe(debounceTime(1000), handleErrorOnObservable((m: string) => this.toast.error(m)))
      .subscribe(({ data }: any) => {
        this.isLoading = false;
        this.toast.success('Withdraw success!');
        this.clearFields();
        setTimeout(() => this.marketsService.getBalances(), 500);
      })
  }
}
