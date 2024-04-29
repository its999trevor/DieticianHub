import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import authService from '../../api/services/authservice'
import { useState } from 'react';
import {useNavigate,Link} from 'react-router-dom'
const Signupform = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  async function handleSignup(e){
    e.preventDefault();
try{
      const data=await authService.signup(name,email,password);
      console.log(data);
      if (data.status==200) {
        navigate('/home');
      } 
}
catch(error){
      console.log("signup failed: ",error);
}
  }
  return (
    <div>  <Container>
    <Card style={{width:'20em'}} >
        <form onSubmit={handleSignup} >
        <Row>
                <Col>
            <input required onChange={(e)=>setName(e.target.value)} placeholder='name'/>
            </Col>
            </Row>
        <Row>
                <Col>
            <input required onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='email address'/>
            </Col>
            </Row>
            <Row>
                <Col>
            <input required onChange={(e)=>setPassword(e.target.value)} minLength={6} type='password' placeholder='password'/>
            </Col>
            </Row>
             

            <button variant='primary'>create account</button>
        </form>
    </Card>
</Container></div>
  )
}

export default Signupform