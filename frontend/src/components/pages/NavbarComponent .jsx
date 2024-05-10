import React from 'react'
import {BrowserRouter,Routes,Route, useNavigate,Link} from 'react-router-dom'

import img from '../../assets/logo.png'

const NavbarComponent  = () => {
  const navigate=useNavigate();

  return (
      <>
      
          <div  onClick={()=>{
                  navigate("/");

            }} >
            <img
              alt=""
              src={img}
              width="200"
              height="30"
              className="d-inline-block align-top"
            />
          </div>
         
            <button onClick={()=>{
                  navigate("/login");

            }} >Login</button>
        
     
      </>
  )
}

export default NavbarComponent 