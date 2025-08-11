import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../pages/frontend/Header'
import Footer from '../pages/frontend/Footer'

function FrontendLayout() {
  return (
    <>
   
    
 <Header /> 
 <Outlet/>
 <Footer/>  
      
     </>
  )
}

export default FrontendLayout