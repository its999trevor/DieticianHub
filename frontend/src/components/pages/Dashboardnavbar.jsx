import React from 'react'
import logo from "../../assets/logo.png"
import {BrowserRouter,Routes,Route, useNavigate,Link} from 'react-router-dom'


const Dashboardnavbar = () => {
  return (
    <div>
              <style type='text/css'>
            {`      
                   .navbar{
                    list-style-type: none;
                    display: inline-flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0;
                   }
                   .brand{
                    padding-right:30px;
                   }
                   .linkgroup {
                    display:flex;
                    margin-left:600px;
                  }
                  .link{
                    padding-right:60px;
                  }
                   .right{
                    margin-left:700px;
                              }
                    

            `}

        </style>
            <nav className='navbar'>
               

                <div className='brand'>  <img
              alt=""
              src={logo}
              width="200"
              height="30"
              className=""
              /></div>
              <div className='linkgroup'>

            <div className='link'><Link to="/home">Home</Link></div>
            <div  className='link'><Link to="/diary">Diary</Link></div>
            <div  className='link'><Link to="/dietplan">Diet Plan</Link></div>
              </div>
            
            <div className='right'><button>Logout</button></div>
            </nav>
                      
        
        
         

   </div>
  )
}

export default Dashboardnavbar