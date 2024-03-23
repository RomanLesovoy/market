import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Subject } from 'rxjs';
import { GET_INSTRUMENTS } from './gql-operations';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {
  instruments: Subject<Array<any>> = new Subject(); // explain: Subject is observable object;

  constructor(private apollo: Apollo){
    console.log('constr markets')
  }

  getInstruments() {
    const prepareInstruments = <T>(instruments: Array<T>): { [name: string]: Array<T> } => {
      return instruments.reduce((acc, current) => {
        // @ts-ignore
        if (!current.price || !current.price.ask) {
          return acc;
        }
        // @ts-ignore
        const key: string = current.base as string;
        // @ts-ignore
        !acc[key] ? acc[key] = [current] : acc[key].push(current);
        return acc;
      }, {});
    }

    this.apollo.watchQuery({
      query: GET_INSTRUMENTS,
    }).valueChanges.pipe(
      // @ts-ignore
        map((v) => ({ ...v, data: { ...v.data, instruments: prepareInstruments(v.data.instruments) }}))
      ).subscribe(({data, error}: any) => {
      this.instruments.next(data.instruments);
    });
  }

  watchQueryInstruments() {
    return this.apollo.watchQuery({ // explain watchQuery
      query: GET_INSTRUMENTS,
    })
  }
}
