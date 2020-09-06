import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import SingleMessage from './singleMessage'
import { Form, Button } from 'react-bootstrap'
import styled from 'styled-components'

const MessageDiv = styled.div`
  margin: 20px;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 8px 8px 10px black;
  background-image: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.mint},
    ${({ theme }) => theme.sky}
  );
  width: 20vw;
  height: 60vh;
`

const ChatButton = styled(Button)`
  background-color: ${({ theme }) => theme.mint};
  color: #000000;
  font-size: 1em;
  font-weight: 800;
  margin: 0.5em;
  border-radius: 20px;
  padding: 0.5em 1em;
`

function MessageList(props) {
  useEffect(() => {
    props.subscribeToNewMessages()
  })

  const [variables, setVariables] = useState({
    roomId: props.match.params.roomId,
    message: '',
  })

  const [
    createMessage,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_MESSAGE)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    createMessage({ variables })
    setVariables({ ...variables, message: '' })
  }

  return (
    <MessageDiv>
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
              setVariables({ ...variables, message: e.target.value })
            }
            placeholder="New Message"
          />
        </Form.Group>
        <div>
          <ChatButton type="submit">Send</ChatButton>
        </div>
      </Form>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}
    </MessageDiv>
  )
}

const CREATE_MESSAGE = gql`
  mutation createMessage($roomId: ID, $message: String!) {
    createMessage(roomId: $roomId, message: $message) {
      message
      user {
        spotifyUsername
      }
    }
  }
`
export default withRouter(MessageList)
