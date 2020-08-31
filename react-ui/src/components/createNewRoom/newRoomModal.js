import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Modal } from 'react-bootstrap'
import NewRoomForm from './newRoomForm'

const StyledButton = styled(Button)`
  color: #000000;
  font-size: 1em;
  margin: 1em;
  padding: 0.5em 1.5em;
  border: 2px solid #000000;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.offWhite};
`

const StyledModal = styled(Modal)`
  border-radius: 8px;
  width: 20rem;
  height: 20rem;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  position: fixed;
  top: 20%;
  left: 20%;
  transform: (translate(-50%, -50%);
  border: 2px solid black;
  z-index: 3;
`

export default function NewRoomModal(props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <div className="text-center">
        <StyledButton onClick={handleShow}>
          Create New Room
        </StyledButton>
      </div>

      <StyledModal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Let's MOOOOOZIK together!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewRoomForm />
        </Modal.Body>
      </StyledModal>
    </>
  )
}

