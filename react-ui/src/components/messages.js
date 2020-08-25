import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

//
import Message from "./message";
import { messageData } from "./api";

const QUERY_MESSAGES = gql`
  query {
    messages @client {
      id
      author
      content
    }
  }
`;

export default function Messages() {
  const { data } = useQuery(QUERY_MESSAGES);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div>
      <h1>ChatRoom</h1>
      {data.messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">
          <input name="message" type="text" />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
