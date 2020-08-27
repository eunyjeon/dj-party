import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { gql, useMutation } from '@apollo/client'

const CREATE_ROOM = gql`
    mutation createRoom(
        $name: String!
        $description: String!
        $public: Boolean
    ) {
        createRoom(
            name: $name
            description: $description
            public: $public
        ) {
            ok
            roomMade
        }
    }
`
//TODO: where this props(history) comes from??
export default function NewRoomForm({history}) {
    const [variables, setVariables] = useState({
        name: '',
        description: '',
        public: true,
    })
    const [createRoom, { loading }] = useMutation(CREATE_ROOM, {
        //TODO: add route
        update: (_, __) => history.push('/whereToGo??'),
        onError: err => console.log(err)
    })

    const handleSubmit = evt => {
        evt.preventDefault()
        createRoom({ variables })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="roomName">
                <Form.Label>Room Name</Form.Label>
                <Form.Control
                    type="text"
                    value={variables.name}
                    onChange={(e) =>
                        setVariables({ ...variables, name: e.target.value })
                    }
                    placeholder="Enter Room Name"
                />
            </Form.Group>

            <Form.Group controlId="roomDescription">
                <Form.Label>Room Description</Form.Label>
                <Form.Control
                    type="text"
                    value={variables.name}
                    onChange={(e) =>
                        setVariables({ ...variables, description: e.target.value })
                    }
                    placeholder="Enter Room Description"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}
