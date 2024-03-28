import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CREATE_DEPOSIT, CREATE_CONVERSION_QUOTE, CREATE_CONVERSION, CREATE_WITHDRAW } from './gql-operations';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private apollo: Apollo) { }

  createDeposit(payload: { currency_id: string, payment_route_id: string }) {
    return this.apollo.query({
      query: CREATE_DEPOSIT,
      variables: payload,
      errorPolicy: 'all'
    });
  }

  createWithdraw(payload: { currency_id: string, payment_route_id: string, amount: number, crypto_address: string }) {
    return this.apollo.mutate({
      mutation: CREATE_WITHDRAW,
      variables: payload,
      errorPolicy: 'all'
    });
  }

  createConversionQuote(payload: { source_currency_id: string, target_currency_id: string, source_currency_amount: number | undefined, target_currency_amount: number | undefined }) {
    return this.apollo.mutate({
      mutation: CREATE_CONVERSION_QUOTE,
      variables: payload,
      errorPolicy: 'all'
    });
  }

  createConversion(payload: { conversion_quote_id: string }) {
    return this.apollo.mutate({
      mutation: CREATE_CONVERSION,
      variables: payload,
      errorPolicy: 'all'
    });
  }
}
