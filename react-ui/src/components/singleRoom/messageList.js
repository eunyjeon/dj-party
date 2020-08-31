import React, {useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom';
import { gql, useMutation} from '@apollo/client'
import SingleMessage from './singleMessage'
import { Form, Button } from 'react-bootstrap'

function MessageList(props) {
  useEffect(() => {
    props.subscribeToNewMessages()
  })

  const [variables, setVariables] = useState({
    roomId: props.match.params.roomId,
    message: '',
})

  const [createMessage, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_MESSAGE)

  const handleSubmit = evt => {
    evt.preventDefault()
    createMessage({ variables })
    setVariables({...variables, message:''})
}
console.log('what is happening')

  return (
  <div>
      <h1>Message List</h1>
      {props.messages.map((message) => (
      <SingleMessage key={message.id} {...message} />
      ))}
      <Form onSubmit={handleSubmit}>
          <Form.Group controlId="newMessage">
              <Form.Control
                  type="text"
                  value={variables.message}
                  onChange={(e) =>
                      setVariables({...variables, message: e.target.value})
                  }
                  placeholder="New Message"
              />
          </Form.Group>
          <div>
              <Button variant="primary" type="submit">
                  Send
              </Button>
          </div>
        </Form>
      {/* <form  onSubmit={e => {
            e.preventDefault()
            createMessage({ variables: { message: input.value, roomId: props.roomId} })
            input.value = ''
          }}>
      <input
            ref={node => {
              input = node
            }}
          />
      <button type="submit">Send</button>
    </form> */}
    {mutationLoading && <p>Loading...</p>}
    {mutationError && <p>Error :( Please try again</p>}
  </div>
  )
}


const CREATE_MESSAGE = gql`
mutation createMessage($roomId: ID $message: String! ) {
    createMessage(roomId: $roomId message:$message) {
          message
          user {
            spotifyUsername
        }
    }
}
`
export default withRouter(MessageList)
