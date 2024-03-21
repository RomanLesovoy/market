import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_INSTRUMENTS } from './gql-operations';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {
  countries: any[] = [];
  error: any;
  loading: boolean = true;

  constructor(private apollo: Apollo){
    console.log('constr markets')
  }

  watchInstruments(){
    console.log('watch')
    return this.apollo.watchQuery({
      query: GET_INSTRUMENTS,
    })
  }
}
