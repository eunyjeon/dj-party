import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import NewRoomForm from './newRoomForm'

const StyledButton = styled(Button)`
  color: #000000;
  font-size: 1.2em;
  font-weight: 800;
  margin: 1em;
  padding: 0.5em 1.5em;
  border: 2px solid ${({ theme }) => theme.mint};
  border-radius: 25px;
  background-color: ${({ theme }) => theme.mint};
  :hover {
    background-color: ${({ theme }) => theme.sky};
    color: black;
  }
`

const StyledModal = styled(Modal)`
  border-radius: 20px;
  width: 25rem;
  height: 20rem;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.mint};
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
