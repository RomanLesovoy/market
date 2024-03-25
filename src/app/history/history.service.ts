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
    this.apollo.watchQuery({
      query: GET_HISTORY,
    }).valueChanges.subscribe(({data, error}: any) => {
      this.history.next(data.account_transactions);
    });
  }
}
