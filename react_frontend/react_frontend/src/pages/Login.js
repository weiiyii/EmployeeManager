import React, {useContext} from 'react'
import AuthContext from '../context/auth'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {

    let {login} = useContext(AuthContext)

    return (
        <Form onSubmit={login}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" required/>
            <Form.Text className="text-muted">
              Please enter your username.
            </Form.Text>
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
}

export default Login
