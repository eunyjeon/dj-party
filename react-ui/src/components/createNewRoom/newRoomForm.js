import React, { useState } from 'react'
import { withRouter } from "react-router";
import { Form, Button } from 'react-bootstrap'
import { gql, useMutation } from '@apollo/client'


const CREATE_ROOM = gql`
    mutation createRoom(
        $name: String!
        $description: String
        $public: Boolean
    ) {
        createRoom(
            name: $name
            description: $description
            public: $public
        ) { ok
            roomMade {
                id
                name
                # messages
                # users
                # isCreator
                # public
                # description
            }
        }
    }
`

function NewRoomForm(props) {
    const [variables, setVariables] = useState({
        name: '',
        description: '',
        public: true,
    })
    const [createNewRoom, { loading, data }] = useMutation(CREATE_ROOM, {
        // update: (_, __) => props.history.push(`/room/${data.createRoom.roomMade.id}`),
        onError: err => console.log(err),
    })

    const handleSubmit = evt => {
        evt.preventDefault()
        createNewRoom({ variables })
            .then((res)=>
                props.history.push(`/room/${res.data.createRoom.roomMade.id}`)
            )
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
                    value={variables.description}
                    onChange={(e) =>
                        setVariables({ ...variables, description: e.target.value })
                    }
                    placeholder="Enter Room Description"
                />
            </Form.Group>
            <div>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </div>
        </Form>
    )
}
export default withRouter(NewRoomForm)
