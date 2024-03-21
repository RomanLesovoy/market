import { gql } from "apollo-angular";

const GET_INSTRUMENTS = gql `
  query {
    instruments {
      instrument_id
      name
      price {
        instrument_id
        ask
        bid
      }
    }
  }
`;

export { GET_INSTRUMENTS }