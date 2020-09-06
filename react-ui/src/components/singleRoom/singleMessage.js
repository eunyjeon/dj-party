import React from 'react'
import styled from 'styled-components'

const Message = styled.p`
  color: black;
`

const Author = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.purple};
`
export default function SingleMessage(props) {
  return (
    <Message>
      <Author>{props.user.spotifyUsername}:</Author> {props.message}
    </Message>
  )
}
