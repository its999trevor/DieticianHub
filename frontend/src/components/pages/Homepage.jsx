import React from 'react'
import Navbar from './NavbarComponent '
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';

const Homepage = () => {
  return (
    <div>
        <Navbar/>
        <Container fluid="md">
            <Row>
              <Col><h1>Track your goals</h1></Col>
            </Row>
            <Row>
              <Col>
                <Button variant='primary'>Sign up</Button>  
              </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Homepage