import React, { useEffect } from "react";
import "../../assets/css/Login.css";

import LoginForm from "../../Components/LoginForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { currentUser } = useSelector(state => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return (
    <>
      {!currentUser && <LoginForm />}
    </>
  );
};

export default Login;
