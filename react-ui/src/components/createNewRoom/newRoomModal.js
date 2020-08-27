import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import NewRoomForm from './newRoomForm'

export default function NewRoomModal() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create New Room
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Let's MOOOOOZIK together!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewRoomForm />
        </Modal.Body>
      </Modal>
    </>
  )
}
