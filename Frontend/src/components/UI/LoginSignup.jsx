import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'

const LoginSignup = () => {
    const {isAuth} = useContext(UserContext)
    const navigate = useNavigate();
  return (
    !isAuth && (
        <>
          <NavLink
            to="/login"
            className="bg-red-600 text-white font-semibold px-3 py-2 rounded-2xl hover:bg-red-700 hover:cursor-pointer transition-all duration-300"
          >
           <button onClick={(e)=>{
            navigate("/login")
            return e.stopPropagation()

           }}> Log in
            </button>
          </NavLink>
          <NavLink
            to="/register"
            className="bg-gray-200 font-semibold py-2 px-4 rounded-2xl hover:bg-gray-300 hover:cursor-pointer transition-all duration-300"
          >
             <button onClick={(e)=>{
            navigate("/login")
            return e.stopPropagation()

           }}> Sign up
            </button>
          </NavLink>
        </>
      )
  )
}

export default LoginSignup
