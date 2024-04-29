import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import {BrowserRouter,Routes,Route, useNavigate,Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'; 
import img from '../../assets/logo.png'

const NavbarComponent  = () => {
  const navigate=useNavigate();

  return (
      <>
        <Navbar className="bg-body-tertiary" expand="lg">
        <Container className="d-flex justify-content-between"> {/* Use Bootstrap flex utilities */}
          <Navbar.Brand  onClick={()=>{
                  navigate("/");

            }} >
            <img
              alt=""
              src={img}
              width="200"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="#about">About</Nav.Link>
            <Button onClick={()=>{
                  navigate("/login");

            }}   variant="outline-primary">Login</Button>
          </Nav>
        </Container>
      </Navbar>
      </>
  )
}

export default NavbarComponent 