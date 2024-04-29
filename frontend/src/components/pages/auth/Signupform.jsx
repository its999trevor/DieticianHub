import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
const Signupform = () => {
  return (
    <div>  <Container>
    <Card style={{width:'20em'}} >
        <form>
        <Row>
                <Col>
            <input required name="name" placeholder='name'/>
            </Col>
            </Row>
        <Row>
                <Col>
            <input required name="email" placeholder='email address'/>
            </Col>
            </Row>
            <Row>
                <Col>
            <input required name="password" minlength="6" type='password' placeholder='password'/>
            </Col>
            </Row>
             

        </form>
    </Card>
            <Button  variant='primary'>create account</Button>
</Container></div>
  )
}

export default Signupform