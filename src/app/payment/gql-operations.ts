import { gql } from "apollo-angular";

const CREATE_DEPOSIT = gql `
  query ($currency_id: String!, $payment_route_id: String) {
    deposit_address_crypto(currency_id: $currency_id, payment_route_id: $payment_route_id) {
     deposit_address_crypto_id
     address
    }
  }
`;

export { CREATE_DEPOSIT }
