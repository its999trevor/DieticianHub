import React from 'react'
import {BrowserRouter,Routes,Route, useNavigate,Link} from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import img from '../../assets/logo.png'

const NavbarComponent  = ({classname}) => {
  const navigate=useNavigate();

  return (
      <div className={`${classname}`} style={{display:"inline-flex"}}>
      
            <img
              alt=""
              src={img}
              width={250}
              style={{paddingInlineStart:"300px"}}
              onClick={()=>{
                navigate("/");

          }}
            />
            
         
           <FaUserCircle size={40} style={{paddingInlineStart:"900px",paddingBlockStart:"15px"}} onClick={()=>{
              navigate("/login");}} />
        
     
      </div>
  )
}

export default NavbarComponent 