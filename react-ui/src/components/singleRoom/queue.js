import React from 'react'
//import { useCombobox } from 'downshift'
//import UserContext from '../../userContext'
import styled from 'styled-components'

const QueueDiv = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-radius: 20px;
  width: 30vw;
  height: 60vh;
  box-shadow: 8px 8px 10px black;
  background-image: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.purple},
    ${({ theme }) => theme.darkPurple}
  );
`
const Tracks = styled.div`
  text-align: left;
  overflow: scroll;
  padding-left: 10px;
  padding-right: 10px;
  height: 90%;
  background-color: rgba(0, 0, 0, 30%);
`

export default function Queue() {
  return (
    <QueueDiv>
      <h2>Up Next:</h2>
      <Tracks></Tracks>
    </QueueDiv>
  )
}
