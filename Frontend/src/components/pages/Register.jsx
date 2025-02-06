import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AuthForm from "../UI/AuthForm";
import { PinContext } from "../context/PinContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuth, registerUser, btnLoading } = useContext(UserContext);
  const{fetchPins} = useContext(PinContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(username, email, password,fetchPins);
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <AuthForm
      title="Join Pinterest today"
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleSubmit}
      buttonText="Register"
      btnLoading={btnLoading}
      isRegister={true}
    />
  );
};

export default Register;
