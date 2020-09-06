import React from 'react'
import styled from 'styled-components'

const Messages = styled.div`
  text-align: left;
  height: 80%;
  overflow: scroll;
  padding-left: 10px;
  padding-right: 10px;
`

export default function SingleMessage(props) {
  return (
    <Messages>
      <p>
        {props.user.spotifyUsername}: {props.message}
      </p>
    </Messages>
  )
}
