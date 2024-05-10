import React, { useState } from 'react'
import NavbarComponent from './NavbarComponent '
import Dashboardnavbar from './Dashboardnavbar'
import Summary from './home/Summary'
import Macros from './home/Macros'

const Dashboard = () => {
 
  return (
    <div>
      <Dashboardnavbar/>
      <Summary/>
      <Macros/>
      
      </div>
  )
}

export default Dashboard