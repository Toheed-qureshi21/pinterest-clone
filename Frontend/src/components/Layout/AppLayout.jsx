import React, { useContext } from 'react'
import Navbar from '../UI/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../UI/Footer'
import { UserContext } from '../context/UserContext'
import { Loading } from '../UI/Loading'

const AppLayout = () => {
    const {loading} = useContext(UserContext);
  if (loading) return <Loading/>;
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>

  )
}

export default AppLayout
