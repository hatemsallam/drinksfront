import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button'

function Login() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return !isAuthenticated && (
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>Log In</Card.Title>
      <Card.Text>
        Click Below to Log In
      </Card.Text>
      {/* TODO: add a `LoginButton` component here that will log the user in with Auth0 */}
      <Button onClick={()=>loginWithRedirect()}>Log in</Button>
    </Card.Body>
  </Card>
  );
}

export default Login;