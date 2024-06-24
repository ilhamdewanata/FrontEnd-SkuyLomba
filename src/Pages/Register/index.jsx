import React, { useEffect } from "react";
import "../../assets/css/Login.css"; // Anda dapat menggunakan CSS yang sama atau mengubahnya sesuai kebutuhan
import RegisterForm from "../../Components/RegisterForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { currentUser } = useSelector(state => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return (
    <>
      {!currentUser && <RegisterForm />}
    </>
  );
};

export default Register;
