import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CREATE_DEPOSIT } from './gql-operations';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private apollo: Apollo) { }

  createDeposit(payload: { currency_id: string, payment_route_id: string }) {
    return this.apollo.query({
      query: CREATE_DEPOSIT,
      variables: payload,
    })
  }
}
