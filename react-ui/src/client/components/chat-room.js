//save data in the cache as it should refresh every time
//Can also use Optimistic UI to make it faster for the user
import React, {useState} from 'react'
//import { ApolloClient, gql, useQuery } from '@apollo/client'
import styled from 'styled-components'

const ChatroomContainer = styled.div`
  display: inline-grid;
  grid-column: col3-start;
  grid-row: row1-start/ row2-end;
  background-color: white;
  border-style: solid;
  border-width: 2px;
`

const ChatroomButton = () => styled.button`
 padding:0.35em 1.2em;
 background-color: #40916c;
 border:0.1em solid #FFFFFF;
 margin:0 0.3em 0.3em 0;
 border-radius:0.12em;
 box-sizing: border-box;
 font-family: 'Roboto', sans-serif;
 font-weight: 300;
 color: #FFFFFF;
 text-align: center;
&: hover {
  background-color: #FFFFFF;
  color: #000000;
}
`

const Chatroom = () => {
  const [text, writeText] = useState("");

  useEffect()


  return (
    <>
    <ChatroomContainer>
      <form onSubmit={handleSubmit()}>
        <input type="text" id="chat-text" value={text} onChange={event => writeText(event.target.value)} />
        <ChatroomButton onClick={handleClick()} >OK!</ChatroomButton>
      </form>
    </ChatroomContainer>
    </>
  )
}

export default Chatroom
