import React, { useState } from 'react'
import { Form, Input, Button, Header, Modal } from 'react-bootstrap'

export default function RoomFormModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

// import React, { useState } from 'react'
// import { Row, Col, Form, Button } from "react-bootstrap";

// import { gql, useMutation } from '@apollo/client';

// const REGISTER = gql`
//   mutation register(
//     $username: String!
//     $email:String!
//     $password:String!
//     $confirmPassword:String!
//     ) {
//     register(
//       username:$username
//       email:$email
//       password:$password
//       confirmPassword:$confirmPassword
//       ) {
//       username
//       email
//       createdAt
//     }
//   }
// `;

// export default function Register(props) {
//   const [variables, setVariables] = useState({
//     email:'',
//     username:'',
//     password:'',
//     confirmPassword:'',
//   })

//   const [errors, setErrors] = useState({})

//   const [registerUser, { loading }] = useMutation(REGISTER_USER, {
//     update(_, res){
//       console.log(res)
//     },
//     onError(err){
//       console.log(err)
//     }
//   })

//   const submitRegisterForm = evt => {
//     evt.preventDefault()
//     registerUser({ variables })
//   }

//   //TODO: {errors.email ?? 'Email address'}
//   // if errors.email has a value, it put error.email, if it is null, it puts 'email address'
//   return (
//     <Row className="bg-white py-5 justify-content-center">
//         <Col sm={8} md={6} lg={4}>
//           <h1 className="text-center">Register</h1>
//           <Form onSubmit={submitRegisterForm}>
//             <Form.Group>
//               <Form.Label  className={errors.email && 'text-danger'}>
//                 {errors.email ?? 'Email address'}
//               </Form.Label>
//               <Form.Control type="email" value={variables.email}
//               onChange={e => setVariables({...variables, email: e.target.value})} placeholder="Enter email" />
//             </Form.Group>

//             <div className="text-center">
//               <Button variant="success" type="submit" disabled={loading}>
//                 { loading? 'loading' : 'Register' }
//               </Button>
//             </div>
//           </Form>
//         </Col>
//       </Row>
//   )
// }
