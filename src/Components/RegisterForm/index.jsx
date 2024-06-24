import React, { useEffect, useState } from "react";
import img from '../../assets/Image/Gambar-Skuy-Lomba/Skuy-lomba-1.png';
import { FiCheckCircle, FiKey, FiMail, FiPhone, FiShield, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {

    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/sign-up`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                toast('Terjadi error, periksa pesan error pada console log');
                throw new Error('Network response was not ok');
            }

            toast('Register berhasil');
            navigate('/login');
        } catch (error) {
            console.error('Error:', error.message);
            toast('Terjadi error, periksa pesan error pada console log');
        }
    };

    useEffect(() => {
        setFormData({}); // untuk reset form ketika refresh
    }, []);


    return (
        <section className="h-full md:py-[50px] flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-5 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/2 max-w-sm">
                <img
                    src={img}
                    alt="Sample image"
                />
            </div>
            <div className="md:w-1/2 max-w-sm">
                <h1 className="mb-4">Form Register User</h1>

                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            className="text-sm w-full ps-5 py-2 border border-solid border-gray-300 bg-slate-100 rounded"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email Address"
                            onChange={handleChange}
                        />
                        <div className="absolute inset-y-0 left-0 pl-5  
                    flex items-center  
                    pointer-events-none">
                            <FiMail />
                        </div>
                    </div>

                    <div className="relative">
                        <input
                            className="text-sm w-full ps-5 py-2 border border-solid border-gray-300 bg-slate-100 rounded mt-3"
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            onChange={handleChange}
                        />
                        <div className="absolute inset-y-0 top-4 left-0 pl-5  
                    flex items-center  
                    pointer-events-none">
                            <FiShield />
                        </div>
                    </div>

                    <div className="relative">
                        <input
                            className="text-sm w-full ps-5 py-2 border border-solid border-gray-300 bg-slate-100 rounded mt-3"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        <div className="absolute inset-y-0 top-4 left-0 pl-5  
                    flex items-center  
                    pointer-events-none">
                            <FiKey />
                        </div>
                    </div>

                    <div className="relative">
                        <input
                            className="text-sm w-full ps-5 py-2 border border-solid border-gray-300 bg-slate-100 rounded mt-3"
                            type="text"
                            name="nama_lengkap"
                            id="nama_lengkap"
                            placeholder="Nama Lengkap"
                            onChange={handleChange}
                        />
                        <div className="absolute inset-y-0 top-4 left-0 pl-5  
                    flex items-center  
                    pointer-events-none">
                            <FiUser />
                        </div>
                    </div>

                    <div className="relative">
                        <input
                            className="text-sm w-full ps-5 py-2 border border-solid border-gray-300 bg-slate-100 rounded mt-3"
                            type="text"
                            name="nomor_telepon"
                            id="nomor_telepon"
                            placeholder="No. Telp/HP"
                            onChange={handleChange}
                        />
                        <div className="absolute inset-y-0 top-4 left-0 pl-5  
                    flex items-center  
                    pointer-events-none">
                            <FiPhone />
                        </div>
                    </div>

                    <div className="form-group mt-3 ">
                        <label htmlFor="tgl_lahir">Jenis Kelamin</label>
                        <select id="jenis_kelamin" name="jenis_kelamin" className="border border-solid border-gray-300 bg-slate-100 rounded w-full py-2 px-3" onChange={handleChange} defaultValue={""}>
                            <option value="" disabled>Pilih opsi</option>
                            <option value="male">Laki-laki</option>
                            <option value="female">Perempuan</option>
                            <option value="other">Lainnya</option>
                        </select>
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="tgl_lahir">Tanggal Lahir</label>
                        <input
                            className="text-sm w-full px-3 py-2 border border-solid border-gray-300 bg-slate-100 rounded"
                            type="date"
                            name="tanggal_lahir"
                            id="tanggal_lahir"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="text-center md:text-left">
                        <button
                            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white flex align-middle justify-center gap-2 uppercase rounded text-xs tracking-wider w-100"
                            type="submit"
                        >
                            <FiCheckCircle size={15} /> Register
                        </button>
                    </div>

                </form>

                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Sudah memiliki akun?{" "}
                    <Link
                        className="text-red-600 hover:underline hover:underline-offset-4"
                        to="/login"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RegisterForm;