import React, { useState } from 'react'
import NavbarComponent from './NavbarComponent '
import Dashboardnavbar from './Dashboardnavbar'
import Summary from './home/Summary'
import Macros from './home/Macros'
import Bmicomp from './home/Bmicomp'
import Callog from './home/Callog'
import Bargraph from './home/Bargraph'
import { Box } from '@mui/joy'

const Dashboard = () => {
 
  return (
    <>
      <Dashboardnavbar/>
      
      <Box width={1000}
      
       mx={55} py={2} my={1}  display={"flow"} boxShadow={"rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"}>
              <Box mx={5} display={"flex"} >

      <Summary/>
      <Bmicomp/>
      </Box>
      <Box mx={5} display={"flex"} >

      <Macros/>
      <Bargraph/>
      </Box>
      <Box mx={32}>
      <Callog />
      </Box>
      </Box>
      </>
  )
}

export default Dashboard