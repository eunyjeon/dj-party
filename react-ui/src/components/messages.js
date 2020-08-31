import React from 'react'
//import { gql } from 'apollo-boost'
import { gql, useMutation } from '@apollo/client'
// import { GET_ROOM_INFO } from './room'
import Message from './message'

//socket stuff
// import { useSubscription } from '@apollo/client'
// import { getMainDefinition } from '@apollo/client/utilities'

//
// import Message from './message'
//import { messageData } from './api'

// function LatestMessage({ roomId }) {
//   const {
//     data: { messageAdded },
//     loading,
//   } = useSubscription(MESSAGES_SUBSCRIPTION, { variables: { roomId } })
//   return <h4>New message: {!loading && messageAdded.message}</h4>
// }



/* C
mutation createMessage($message: String!) {
  createMessage(message: $message) {
      message
      user {
        spotifyUsername
      }
 	 }
  }
*/

const CREATE_MESSAGE = gql`
    mutation createMessage($message: String!) {
        createMessage(message: $message) {
              message
              user {
                spotifyUsername
            }
        }
    }
`

export default function Messages(props) {
  // const { loading, error, data } = useQuery(GET_ROOM_INFO)
  console.log("props.messages here:",props.messages);
  let input;
  const [createMessage, { loading }] = useMutation(CREATE_MESSAGE,
    update: (cache, { data: { createMessage } }) => {
      const data = cache.readQuery({ query: GET_MESSAGES});
      data.messages = [...data.messages, createMessage];
      cache.writeQuery({ query: GET_MESSAGES }, data)
    }
  )


  function handleSubmit(event) {
    event.preventDefault();
    createMessage({variables: {type: input.value}} );
    input.value = ''
  }

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :( </p>

  return (
    <div>
      <h1>ChatRoom</h1>
      {props.messages.map((message) => (
       <Message key={message.id} disabled={loading} {...message} />
      ))}
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">
          <input name="message" type="text" />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
