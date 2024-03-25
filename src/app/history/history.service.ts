import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subject } from 'rxjs';
import { GET_HISTORY } from './gql-operations';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  public history: Subject<Array<any>> = new Subject(); // todo

  constructor(private apollo: Apollo) { }

  getHistory() {
    const prepareHistory = (row: any) => {
      const timeValues = row.created_at_iso.split('T');
      return {
        ...row,
        amount: row.amount.toString().indexOf('e') !== -1 ? row.amount.toFixed(Number(row.amount.toString().split('e-')[1]) + 1) : row.amount,
        created_at_iso: `${timeValues[0]} ${timeValues[1].split('+')[0]}`,
      };
    }

    this.apollo.watchQuery({
      query: GET_HISTORY,
    }).valueChanges.subscribe(({data, error}: any) => {
      this.history.next(data.account_transactions.map(prepareHistory));
    });
  }
}
