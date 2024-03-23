import { gql } from "apollo-angular";

const GET_INSTRUMENTS = gql `
  query {
    instruments {
      instrument_id
      name
      base: base_currency_id
      quote: quote_currency_id
      price {
        instrument_id
        ask
        bid
        price_24h_change
      }
    }
  }
`;

export { GET_INSTRUMENTS }