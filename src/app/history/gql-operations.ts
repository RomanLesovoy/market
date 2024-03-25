import { gql } from "apollo-angular";

const GET_HISTORY = gql `
  query {
    account_transactions {
      created_at_iso
      currency
      account_transaction_id
      currency_id
      type
      transaction_class
      amount
      comment
    }
  }
`;

export { GET_HISTORY }
