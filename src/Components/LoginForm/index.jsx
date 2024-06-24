import React, { useEffect, useState } from "react";
import img from '../../assets/Image/Gambar-Skuy-Lomba/Skuy-lomba-1.png';
import { FiCheckCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signInStart, signInSuccess, signInFailure } from "../../redux/userSlice";
import { useDispatch, useSelector } from 'react-redux';

const LoginForm = () => {
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error: errorMessage } = useSelector(state => state.user);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!formData.email || !formData.password) return dispatch(signInFailure("Harap mengisi email dan password"));

            dispatch(signInStart());

            const loginUser = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/sign-in`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const response = await loginUser.json();

            if (!response) {
                return dispatch(signInFailure(response.message));
            }

            dispatch(signInSuccess(response));
            toast('Login berhasil');
            navigate('/');
        } catch (error) {
            dispatch(signInFailure(error.message));
            console.error('Error:', error.message);
        }
    };

    useEffect(() => {
        setFormData({
            email: "",
            password: ""
        }); // untuk reset form ketika refresh
    }, []);

    return (
        <section className="max-h-dvh md:py-[100px] flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-5 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/2 max-w-sm">
                <img
                    src={img}
                    alt="Sample image"
                />
            </div>
            <div className="md:w-1/2 max-w-sm">
                <h1 className="text-3xl p-4 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">Selamat datang!</h1>
                {errorMessage && (
                    <div className="bg-red-500 text-white my-5 p-2 rounded text-xs">{errorMessage}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 bg-slate-100 rounded"
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        placeholder="Email Address"
                        onChange={handleChange}
                    />
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 bg-slate-100 rounded mt-4"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <div className="mt-4 flex justify-between font-semibold text-sm">
                        <a
                            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                            href="/lupa-password"
                        >
                            Lupa password? Klik disini
                        </a>
                    </div>
                    <div className="text-center md:text-left">
                        <button
                            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white flex align-middle justify-center gap-2 uppercase rounded text-xs tracking-wider w-100"
                            type="submit"
                        >
                            {loading === true ? 'Please wait..' : (
                                <>
                                    <FiCheckCircle size={15} /> Login
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Belum memiliki akun?{" "}
                    <Link
                        className="text-red-600 hover:underline hover:underline-offset-4"
                        to="/register"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;