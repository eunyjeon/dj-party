import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Form } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'
import {CREATE_PLAYLIST, CREATE_ROOM} from '../../graphql'




const StyledForm = styled(Form)`
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  width: 18rem;
`

const FormButton = styled.button`
  background-color: ${({ theme }) => theme.sky};
  color: #000000;
  font-size: 1em;
  font-weight: 800;
  margin: 0.5em;
  border-radius: 20px;
  padding: 0.5em 1em;
`

function NewRoomForm(props) {
  const [variables, setVariables] = useState({
    name: '',
    description: '',
  })
  
  const [createNewRoom] = useMutation(CREATE_ROOM, {
    onError: (err) => console.log(err),
  })

  const [createNewPlaylist] = useMutation(CREATE_PLAYLIST, {
    onError: (err) => console.log(err)
  })

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const res = await createNewRoom({variables})
   await createNewPlaylist({variables: {name: variables.name, description: variables.description, roomId: res.data.createRoom.roomMade.id}})
    props.history.push(`/room/${res.data.createRoom.roomMade.id}`)
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Form.Group controlId="roomName">
        <Form.Label>Room Name</Form.Label>
        <Form.Control
          type="text"
          value={variables.name}
          onChange={(e) => setVariables({ ...variables, name: e.target.value })}
          placeholder="Enter Room Name"
        />
      </Form.Group>

      <Form.Group controlId="roomDescription">
        <Form.Label>Room Description</Form.Label>
        <Form.Control
          type="text"
          value={variables.description}
          onChange={(e) =>
            setVariables({ ...variables, description: e.target.value })
          }
          placeholder="Enter Room Description"
        />
      </Form.Group>
      <br />
    <FormButton type="submit">Submit</FormButton>
    </StyledForm>
  )
}
export default withRouter(NewRoomForm)
