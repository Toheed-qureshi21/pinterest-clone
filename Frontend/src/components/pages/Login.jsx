// import React, { useContext, useEffect, useState } from 'react'
// import { NavLink, useNavigate } from "react-router-dom"
// import { UserContext } from '../context/UserContext';
// import {LoadingAnimation} from '../UI/Loading';
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const {isAuth, loginUser, btnLoading } = useContext(UserContext);
//   const navigate = useNavigate();
//   const handleSubmit =async (e) => {
//     e.preventDefault();
//     await loginUser(email, password)

//   }
//   useEffect(() => {
//     if (isAuth) {
//       navigate("/"); 
//     }
//   }, [isAuth, navigate]);


//   return (
//     <section className='min-h-screen flex items-center justify-center bg-gray-100'>
//       <section className='bg-white p-8 rouded-lg shadow-lg w-full max-w-md'>
//         <div id='logo' className='flex justify-center mb-1'>
//           <img src="./pinterestLogo.jpg" alt="Pinterest logo" className='h-[5rem]' />
//         </div>
//         <h2 className='text-bold text-center font-semibold text-3xl'>Log in to see more</h2>
//         <form className='mt-4' onSubmit={handleSubmit}>
//           <div className='flex flex-col'>
//             <label htmlFor="email">Email</label>
//             <input className='common-input ' type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </div>
//           <div className='flex flex-col'>
//             <label htmlFor="password">Password</label>
//             <input className='common-input' type="password" name="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
//           </div>
//           <button type='submit' className='common-btn' disabled={btnLoading}>{btnLoading?<LoadingAnimation/>:"Login"}</button>
//           <div class="flex items-center my-4">
//             <div class="flex-1 border-t border-gray-400"></div>
//             <span class="px-2 text-gray-600 font-medium">OR</span>
//             <div class="flex-1 border-t border-gray-400"></div>
//           </div>
//           <p className='text-center'>Not on Pinterest yet? <NavLink to="/register" className="font-semibold text-zinc-950">Register</NavLink></p>

//         </form>
//       </section>
//     </section>
//   )
// }

// export default Login

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AuthForm from "../UI/AuthForm";
import { PinContext } from "../context/PinContext";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuth, loginUser, btnLoading, } = useContext(UserContext);
  const{fetchPins} = useContext(PinContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(email, password,fetchPins);
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <AuthForm
      title="Log in to see more"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleSubmit}
      buttonText="Login"
      btnLoading={btnLoading}
      isRegister={false}
    />
  );
};

export default Login;
