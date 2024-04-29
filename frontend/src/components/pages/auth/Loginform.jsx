import React, { useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import {useNavigate,Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'; 
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import authService from '../../api/services/authservice'
import { useEffect } from 'react';


const Loginform = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

    async function  loginHandler(e){
        e.preventDefault();
        try {
            const userData = await authService.login(email, password);
           console.log(userData); 
            // console.log(userData);
            if (userData.status==200) {
                // Navigate to home only if login was successful
                navigate('/home');
              } 
              else{
                console.log('Login failed:', userData.error);
              }
            } catch (error) {
              console.log('Login failed:', error);
            }
      
    }

  return (
    <div>
         <Container fluid>
               
               <Card style={{width:'20em'}}>
               <form onSubmit={loginHandler}>
                   <Row>
                       <Col>
                   <input required  onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='email address'/>
                   </Col>
                   </Row>
                   <Row>
                       <Col>
                   <input required onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='password'/>
                   </Col>
                   </Row>
                   <Row>
                       <Col>
                   <button>Submit</button>
                   </Col>
                   </Row>
               </form>
               <Row>
                   <Col>new user?
                <Link to="/signup">sign up now!</Link></Col>
                <Col><Link to="#">forgot password?</Link></Col>
                </Row>
               </Card>
           </Container>


    </div>
  )
}

export default Loginform