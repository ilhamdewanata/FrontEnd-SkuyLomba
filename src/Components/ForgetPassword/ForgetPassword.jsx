
import React from 'react';
import SkuyLombaRight from "../../assets/Image/Gambar-Skuy-Lomba/Skuy-lomba-1.png";
import Lupapassword from "../../assets/Image/Gambar-Font/Lupa-password.png";
import { FaLongArrowAltLeft } from "react-icons/fa";

import "../../assets/css/ForgetPassword.css";
import { Link, useNavigate } from 'react-router-dom';

const ForgetPassword = () => {

    const navigate = useNavigate();

    return (
        <div className='a'>

            <header className="container">
                {/* <nav className="d-flex justify-content-between align-items-center mt-3">
        <ul>
            <img src={LogoSkuyLombaLands} className="co-logo" alt="" />
        </ul>
    </nav> */}
                <div className="container px-2 py-3 mx-auto">
                    <div className="card card0" id="allcards">
                        <div className="d-flex flex-lg-row flex-column-reverse">
                            <div className="card card1">
                                <div className="row justify-content-center my-auto">
                                    <div className="col-md-10 col-10 my-1">
                                        <div className="mb-3 px-3">
                                            {/* <a href="Login.jsx" className="back-icon"><i className="fa-solid fa-angle-left"></i> Back to login</a> */}
                                            <Link to={navigate("/Login")}><FaLongArrowAltLeft /><small className='text-muted'>Back to Login</small></Link>
                                        </div>
                                        <div className="row justify-content-center px-3 mb-1">
                                            <img id="lupapw" src={Lupapassword} />
                                        </div>
                                        <p className="mb-5 text-center">Masukkan email Anda di bawah ini untuk memulihkan kata sandi Anda</p>
                                        <div className="mb-3 form-group">
                                            {/* <!-- <label className="form-control-label text-muted">Username</label> --> */}
                                            <input type="text" id="email" name="email" placeholder="Email" className="user-icon" />
                                        </div>
                                        <div className="form-group">
                                            {/* <!-- <label className="form-control-label text-muted">Password</label> --> */}
                                            {/* <!-- <input type="password" id="psw" name="psw" placeholder="Password" className="psw-icon"> --> */}
                                        </div>
                                        <div className="row justify-content-center my-1 px-3">
                                            <button className="btn-block btn-color">Kirim</button>
                                        </div>
                                        {/* <!-- <div className="row justify-content-center my-4">
                                <a href="#" className="text-center"><small className="text-muted">Lupa Password?</small></a>
                            </div>
                            <div className="row justify-content-center my-1 px-3">
                                <button className="btn btn-white"></i> Login menggunakan <b>Google</b></button>
                            </div>  --> */}
                                    </div>
                                </div>
                            </div>
                            <div className="card card2">
                                <img src={SkuyLombaRight} alt="" />
                                {/* <div className="my-auto mx-md-5 px-md-5 right">
                        <h3 className="text-white">We are more than just a company</h3>
                        <small className="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</small>
                    </div>  */}
                            </div>
                        </div>
                    </div>
                </div>
            </header>


        </div>
    );
};

export default ForgetPassword;
