import { Component } from '@angular/core';

@Component({
  selector: 'app-deposit-content',
  templateUrl: './deposit-content.component.html',
  styleUrl: './deposit-content.component.scss',
})
export class DepositContentComponent {
  baseCurrency: string = '';
  public quoteCurrency: string = '';

  // @Output() emitter: EventEmitter<string> = new EventEmitter<string>();
  // explain: emitter lets you to pass data to parent, use in child @Input with same name and subscribe

  constructor() {}

  changeBaseCurrency = (currency: string) => { // explain: arrow function otherwise context will be lost
    this.baseCurrency = currency;
    // this.emitter.emit(currency);
  }

  changeQuoteCurrency = (currency: string) => {
    this.quoteCurrency = currency;
  }
}
