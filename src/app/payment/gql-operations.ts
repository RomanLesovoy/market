import { gql } from "apollo-angular";

const CREATE_DEPOSIT = gql `
  query ($currency_id: String!, $payment_route_id: String) {
    deposit_address_crypto(currency_id: $currency_id, payment_route_id: $payment_route_id) {
     deposit_address_crypto_id
     address
    }
  }
`;

const CREATE_CONVERSION_QUOTE = gql `
  mutation ($source_currency_id: String!, $target_currency_id: String!, $source_currency_amount: Float, $target_currency_amount: Float) {
    create_conversion_quote(source_currency_id: $source_currency_id, target_currency_id:$target_currency_id, source_currency_amount: $source_currency_amount, target_currency_amount: $target_currency_amount) {
      conversion_quote_id
      fee_currency_id
      fee_currency_amount
      price
      source_currency_amount
      target_currency_amount
    }
  }
`

const CREATE_CONVERSION = gql `
  mutation ($conversion_quote_id: String!) {
    create_conversion_order(conversion_quote_id: $conversion_quote_id) {
      conversion_id
    }
  }
`

const CREATE_WITHDRAW = gql `
  mutation ($currency_id: String!, $payment_route_id: String, $amount: Float!, $crypto_address: String!) {
    create_withdrawal_crypto(currency_id: $currency_id, payment_route_id: $payment_route_id, amount: $amount, crypto_address: $crypto_address) {
      status
      message
      error_message
      approval_status
    }
  }
`

export { CREATE_DEPOSIT, CREATE_CONVERSION_QUOTE, CREATE_CONVERSION, CREATE_WITHDRAW }
