import React from 'react'
import Navbar from './NavbarComponent '
import Loginform from './auth/Loginform'
import Footer from './Footer'

const Login = () => {
  return (
        <>
        <Navbar classname={"navbar navcolor"} />
        <Loginform/>
        </>
)
}

export default Login