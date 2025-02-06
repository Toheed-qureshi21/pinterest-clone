import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LoadingAnimation } from "../UI/Loading";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

const AuthForm = ({ title, email, setEmail, password, setPassword, onSubmit, buttonText, btnLoading, isRegister, username, setUsername }) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">

      <section className=" responsive bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div id="logo" className="flex justify-center mb-1">
          <img src="./pinterestLogo.jpg" alt="Pinterest logo" className="h-[5rem]" />
        </div>

        <h2 className="text-bold text-center font-semibold text-3xl">{title}</h2>

        <form className="mt-4" onSubmit={onSubmit}>
          {isRegister && (
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                className="common-input"
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="common-input "
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="common-input relative"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="absolute right-3 top-[2.5rem] transform -translate-y-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoIosEyeOff /> : <IoMdEye />}
            </button>
          </div>
          <button type="submit" className="common-btn" disabled={btnLoading}>
            {btnLoading ? <LoadingAnimation /> : buttonText}
          </button>
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-400"></div>
            <span className="px-2 text-gray-600 font-medium">OR</span>
            <div className="flex-1 border-t border-gray-400"></div>
          </div>
          <p className="text-center">
            {isRegister ? "Already have an account?" : "Not on Pinterest yet?"}{" "}
            <NavLink to={isRegister ? "/login" : "/register"} className="font-semibold text-zinc-950">
              {isRegister ? "Login" : "Register"}
            </NavLink>
          </p>
        </form>
      </section>
    </section>
  );
};

export default AuthForm;
