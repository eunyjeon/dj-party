import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

//
import { Message } from "./message";

const QUERY_MESSAGES = gql`
  query {
    messages @client {
      author
      content
    }
  }
`;
