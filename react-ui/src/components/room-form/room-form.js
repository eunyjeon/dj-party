import React, { useState } from 'react'
import { Row, Col, Form, Button } from "react-bootstrap";

import { gql, useMutation } from '@apollo/client';

const CREATE_ROOM = gql`
  mutation register(
    $username: String!
    $email:String!
    $password:String!
    $confirmPassword:String!
    ) {
    register(
      username:$username
      email:$email
      password:$password
      confirmPassword:$confirmPassword
      ) {
      username
      email
      createdAt
    }
  }
`;

export default function Register(props) {
  const [variables, setVariables] = useState({
    email:'',
    username:'',
    password:'',
    confirmPassword:'',
  })

  const [errors, setErrors] = useState({})

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, res){
      console.log(res)
    },
    onError(err){
      // console.log(err.graphQLErrors[0].extensions.errors)
      setErrors(err.graphQLErrors[0].extensions.errors)
    }
  })

  const submitRegisterForm = evt => {
    evt.preventDefault()
    registerUser({ variables })
  }

  //TODO: {errors.email ?? 'Email address'}
  // if errors.email has a value, it put error.email, if it is null, it puts 'email address'
  return (
    <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h1 className="text-center">Register</h1>
          <Form onSubmit={submitRegisterForm}>
            <Form.Group>
              <Form.Label  className={errors.email && 'text-danger'}>
                {errors.email ?? 'Email address'}
              </Form.Label>
              <Form.Control type="email" value={variables.email}
              onChange={e => setVariables({...variables, email: e.target.value})} placeholder="Enter email" />
            </Form.Group>

            <Form.Group>
              <Form.Label  className={errors.username && 'text-danger'}>
                {errors.username ?? 'Username'}
              </Form.Label>
              <Form.Control
                type="text"
                value={variables.username}
                className={errors.username && 'is-invalid'}
                onChange={e => setVariables({...variables, username: e.target.value})} placeholder="Enter username" />
              </Form.Group>

            <Form.Group>
              <Form.Label  className={errors.password && 'text-danger'}>
                {errors.password ?? 'Password'}
              </Form.Label>
              <Form.Control
                type="password"
                value={variables.password}
                className={errors.password && 'is-invalid'}
                onChange={e => setVariables({...variables, password: e.target.value})} placeholder="Enter password" />
              </Form.Group>

            <Form.Group>
              <Form.Label  className={errors.confirmPassword && 'text-danger'}>
                {errors.confirmPassword ?? 'Confirm password'}
              </Form.Label>
              <Form.Control
                type="password"
                value={variables.confirmPassword}
                className={errors.confirmPassword && 'is-invalid'}
                onChange={e => setVariables({...variables, confirmPassword: e.target.value})} placeholder="Enter password" />
              </Form.Group>
            <div className="text-center">
              <Button variant="success" type="submit" disabled={loading}>
                { loading? 'loading' : 'Register' }
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
  )
}
