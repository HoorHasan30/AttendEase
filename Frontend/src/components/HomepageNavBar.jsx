import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'

function HomepageNavBar() {
  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

export default HomepageNavBar