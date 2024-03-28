import { Component, ViewEncapsulation } from '@angular/core';
import { PaymentService } from '../payment.service';
import { debounceTime } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MarketsService } from '../../markets/markets.service';
import { handleErrorOnObservable } from '../../shared/helpers/handleErrorObs';

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

  constructor(private service: PaymentService, private toast: ToastrService, private marketsService: MarketsService) {}

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
      .pipe(debounceTime(1000), handleErrorOnObservable((m: string) => this.toast.error(m)))
      .subscribe(({ data }: any) => {
        this.isLoading = false;
        this.deposit = data.deposit_address_crypto;
        setTimeout(() => this.marketsService.getBalances(), 500);
      })
  }
}
