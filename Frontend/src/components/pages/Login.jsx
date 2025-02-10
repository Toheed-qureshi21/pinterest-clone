
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
