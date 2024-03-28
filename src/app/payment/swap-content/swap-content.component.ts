import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../payment.service';
import { debounceTime, map } from 'rxjs';
import { MarketsService } from '../../markets/markets.service';
import { handleErrorOnObservable } from '../../shared/helpers/handleErrorObs';

@Component({
  selector: 'app-swap-content',
  templateUrl: './swap-content.component.html',
  styleUrl: './swap-content.component.scss'
})
export class SwapContentComponent {
  public baseCurrency: string = '';
  public quoteCurrency: string = '';
  public amountBase: string = '0';
  public amountQuote: string = '0';
  public isLoading: boolean = false;
  public conversionQuote: null | { [name: string]: never } = null;

  public get canCreateConversionQuote() {
    return (!!Number(this.amountBase) || !!Number(this.amountQuote)) && this.baseCurrency && this.quoteCurrency;
  }

  // @Output() emitter: EventEmitter<string> = new EventEmitter<string>();
  // explain: emitter lets you to pass data to parent, use in child @Input with same name and subscribe

  constructor(private service: PaymentService, private toast: ToastrService, private marketsService: MarketsService) {}

  resetData() {
    this.amountBase = '0';
    this.amountQuote = '0';
    this.baseCurrency = '';
    this.quoteCurrency = '';
    this.conversionQuote = null;
  }

  changeBaseCurrency = (currency: string) => { // explain: arrow function otherwise context will be lost
    this.baseCurrency = currency;
    // this.emitter.emit(currency);
  }

  changeQuoteCurrency = (currency: string) => {
    this.quoteCurrency = currency;
  }

  changeAmountBase(eventTarget: any) {
    this.amountQuote = '0';
    this.conversionQuote = null;
    this.amountBase = eventTarget.value;
  }

  changeAmountQuote(eventTarget: any) {
    this.amountBase = '0';
    this.conversionQuote = null;
    this.amountQuote = eventTarget.value;
  }

  unifiedHandleRequestComplete(errors: Array<any> | null) {
    this.isLoading = false;
    if (errors?.length) {
      this.toast.error(errors[0].message);
    }
  }
  
  createConversionQuote() {
    if (!this.canCreateConversionQuote) return;
    this.isLoading = true;

    this.service.createConversionQuote({
      source_currency_id: this.baseCurrency,
      target_currency_id: this.quoteCurrency,
      source_currency_amount: Number(this.amountBase) || undefined,
      target_currency_amount: Number(this.amountQuote) || undefined,
    })
      .pipe(debounceTime(1000), handleErrorOnObservable((m: string) => this.toast.error(m)))
      .subscribe(({ data }: any) => {
        this.isLoading = false;
        if (data?.create_conversion_quote) {
          const conversion = data.create_conversion_quote
          this.conversionQuote = conversion;
          this.amountBase = conversion.source_currency_amount;
          this.amountQuote = conversion.target_currency_amount;
        }  
      });
  }

  createConversion() {
    if (!this.conversionQuote?.conversion_quote_id) return;
    this.isLoading = true;
    const conversion_quote_id = this.conversionQuote.conversion_quote_id;
    this.conversionQuote = null;

    this.service.createConversion({ conversion_quote_id })
      .pipe(debounceTime(1000), handleErrorOnObservable((m: string) => this.toast.error(m)))
      .subscribe(({ data }: any) => {
        this.isLoading = false;
        if (data.create_conversion_order) {
          this.toast.success('Convertion success!');
          this.resetData();
          setTimeout(() => this.marketsService.getBalances(), 500);
        }
      });
  }
}
