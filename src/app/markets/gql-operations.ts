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

const GET_CURRENCIES = gql `
  query {
    currencies (type:crypto, is_active:on) {
      currency_id
      is_active
      payment_routes {
        payment_route_id
        psp_service_id
        name
        crypto_network
      }
      precision
    }
  }
`

const SUBSCRIBE_INSTRUMENTS = gql `
  subscription ($instrument_id: String) {
    instrument_price (instrument_id: $instrument_id)  {
      ask
      instrument_id
      price_24h_change
      ts_iso
      __typename
    }
  }
`;

export { GET_INSTRUMENTS, SUBSCRIBE_INSTRUMENTS, GET_CURRENCIES }
