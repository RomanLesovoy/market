import { Component, Input, ViewEncapsulation, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MarketsService } from '../markets.service';

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrl: './currency-selector.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencySelectorComponent {
  public loading: boolean = true;
  public selectedCurrency: string = '';
  public currencies: Array<any> = [];

  @Input() label = 'Select currency';
  @Input() excludeCurrency = ''; // explain: prop to pass from parent
  @Input() onChangeCurrency = (value: string, currency: any) => {};

  constructor (public service: MarketsService) {
    this.service.currencies.subscribe((currencies: Array<any>) =>
      this.currencies = currencies
    );
  }

  ngOnChanges(changes: SimpleChanges) { // explain: lifecycle hook to detect changes
    if (changes.excludeCurrency.previousValue
      && changes.excludeCurrency.previousValue !== changes.excludeCurrency.currentValue
      && !changes.excludeCurrency.currentValue
    ) { // should reset selectedCurrency (was cleared input)
      this.selectedCurrency = '';
    }
  }

  changeCurrency(value: string) {
    this.onChangeCurrency(value, this.currencies.find((c) => c.currency_id === value));
  }
}
