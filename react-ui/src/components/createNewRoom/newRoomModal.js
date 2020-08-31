import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Modal } from 'react-bootstrap'
import NewRoomForm from './newRoomForm'

const StyledButton = styled(Button)`
  color: #000000;
  font-size: 1.2em;
  font-weight: bold;
  margin: 1em;
  padding: 0.5em 1.5em;
  border: 2px solid ${({ theme }) => theme.blush};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.blush};
`

const StyledModal = styled(Modal)`
  border-radius: 20px;
  width: 15rem;
  height: 17rem;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.secondary};
  position: fixed;
  top: 20%;
  left: 20%;
  transform: (translate(-50%, -50%);
  border: 10px solid black;
  z-index: 3;
  padding: 50px;
`

const ModalHeader = styled.div`
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  justify-content: space-around;
  box-shadow: 5px 5px 10px black;
`

export default function NewRoomModal(props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <div className="text-center">
        <StyledButton onClick={handleShow}>Start a Party!</StyledButton>
      </div>

      <StyledModal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <ModalHeader>Let's start a party</ModalHeader>
        </Modal.Header>
        <Modal.Body>
          <NewRoomForm />
        </Modal.Body>
      </StyledModal>
    </>
  )
}
