import React from 'react'
import Dashboardnavbar from './Dashboardnavbar'
import Blog from './Blog'
import Footer from './Footer'
import Box from '@mui/joy/Box';

const Blogpage = () => {
  return (
    <>
      <Dashboardnavbar/>
    <Box 
    display="flex" 
    alignContent={"flex-end"}
    gap={4}
    my={18.4}
    p={2}


    >
        <Blog name={"video tutorials"} 
        det={"Our video tutorial series will teach you everything you need to know about our application, one feature at a time."} 
        imglink={"https://cdn1.cronometer.com/media/icon-cronometer-university.png"}
        btnname={"Watch"}
        />
        <Blog name={"Find a Professional"} 
        det={"Find a coach, nutritionist or trainer to help achieve your health and fitness goals.        "} 
        imglink={"https://cdn1.cronometer.com/media/icon-find-a-professional.png"}
        btnname={"Search"}
        />
        <Blog name={"Contact Support"} 
        det={"Can't find an answer to your question? Contact our support team for help.       "} 
        imglink={"https://cdn1.cronometer.com/media/icon-contact-support.png"}
        btnname={"support@dieticianhub"}
        />
        <Blog name={"User Manual"} 
        det={"Complete app info with screenshots and step-by-step explanations of every feature.       "} 
        imglink={"https://cdn1.cronometer.com/media/icon-user-manual.png"}
        btnname={"Read"}
        />
        <Blog name={"Our Blog"} 
        det={"Check out our blog to stay up to date on all the latest news and updates.       "} 
        imglink={"https://cdn1.cronometer.com/media/icon-user-manual.png"}
        btnname={"Read"}
        />
        <Blog name={"Community Forums"} 
        det={"Want to see how others are using DieticianHub? Join the conversation on our forums.        "} 
        imglink={"https://cdn1.cronometer.com/media/icon-community-forum.png"}
        btnname={"Say Hello"}
        />

    </Box>

        <Footer/>
        </>
  )
}

export default Blogpage