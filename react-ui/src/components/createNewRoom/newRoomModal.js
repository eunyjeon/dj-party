import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import NewRoomForm from './newRoomForm'

export default function NewRoomModal(props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <div className="text-center">
        <Button variant="primary" onClick={handleShow}>
          Create New Room
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} sm={8} md={6} lg={4}>
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

