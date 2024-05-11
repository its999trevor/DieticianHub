import React, { useState } from 'react'
import NavbarComponent from './NavbarComponent '
import Dashboardnavbar from './Dashboardnavbar'
import Summary from './home/Summary'
import Macros from './home/Macros'
import Bmicomp from './home/Bmicomp'
import Callog from './home/Callog'

const Dashboard = () => {
 
  return (
    <div>
      <Dashboardnavbar/>
      <Summary/>
      <Macros/>
      <Bmicomp/>
      <Callog/>
      </div>
  )
}

export default Dashboard