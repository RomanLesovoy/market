import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Subject, interval, BehaviorSubject, Subscription } from 'rxjs';
import { GET_INSTRUMENTS, SUBSCRIBE_INSTRUMENTS } from './gql-operations';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {
  instruments: BehaviorSubject<Array<never>> = new BehaviorSubject([]); // explain: BehaviorSubject with current value;
  prices: { [instrument_id: string]: any } = {};
  interval: Subscription | null = null;
  subscriptionPrices: Array<Subject<any>> = []; // Subject is observable object

  constructor(private apollo: Apollo) {}

  getInstruments() {
    this.apollo.watchQuery({
      query: GET_INSTRUMENTS,
    }).valueChanges.pipe(
      // @ts-ignore
        map((v) => ({ ...v, data: { ...v.data, instruments: v.data.instruments.filter((i) => !!i.price && !!i.price.ask) }}))
      ).subscribe(({data, error}: any) => {
      this.instruments.next(data.instruments);
    });
  }

  subscribeInstruments() {
    this.unsubscribeInstruments(); // unsubscribe firstly
    
    this.instruments.value.map((instrument: any) => {
      const subscription = this.apollo.subscribe({
        query: SUBSCRIBE_INSTRUMENTS,
        variables: { instrument_id: instrument.instrument_id },
      }).subscribe((res: any) => {
        this.prices[instrument.instrument_id] = res.data.instrument_price;
      });
      this.subscriptionPrices.push(subscription as any);
    });

    this.interval = interval(2000).subscribe(() => { // explain: interval update prices
      const newValue = this.instruments.value.map((i: any) => ({ ...i, price: { ...i.price, ...this.prices[i.instrument_id] } })) as Array<never>
      this.instruments.next(newValue);
    });
  }

  unsubscribeInstruments() {
    this.subscriptionPrices.forEach(s => s.unsubscribe());
    this.interval?.unsubscribe();
    this.subscriptionPrices = [];
  }

  watchQueryInstruments() {
    return this.apollo.watchQuery({ // explain watchQuery
      query: GET_INSTRUMENTS,
    })
  }
}
