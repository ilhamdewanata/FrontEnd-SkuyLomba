import React, { useState } from "react";
import Logo from "../../../public/assets/images/logos/Logo-SkuyLomba-Landscape.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutStart, signOutSuccess, signOutFailure } from "../../redux/userSlice";
import toast from "react-hot-toast";

const Nav = () => {
  const [open, setOpen] = useState(false); // Initial state set to false
  const { currentUser } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handleLinkClick(event, targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  const handleSignOut = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/sign-out`, {
        method: 'POST',
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signOutFailure(data.message));
        toast(data.message);
      } else {
        dispatch(signOutSuccess());
        toast(data.message);
        navigate('/');
      }
    } catch (error) {
      dispatch(signOutFailure(error.message));
      console.error(error.message);
    }

  };

  const handleToggleClick = () => {
    setOpen(!open); // Toggle the open state
  };

  return (
    <div>
      <nav className="bg-white w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="cursor-pointer flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="h-8" alt="Logo" />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {currentUser ? (
              <>
                <button
                  id="get-started-btn"
                  type="button"
                  className="text-white font-medium rounded-lg text-sm px-4 py-2 text-center"
                  onClick={() => handleSignOut()}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  id="get-started-btn"
                  type="button"
                  className="text-white font-medium rounded-lg text-sm px-4 py-2 text-center"
                  onClick={() => navigate("/Login")}
                >
                  Masuk
                </button>
              </>

            )}

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded={open}
              onClick={handleToggleClick} // Updated to use handleToggleClick
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${open ? "block" : "hidden"
              }`} // Conditional class based on the state
            id="navbar-sticky"
          >
            <ul className="flex flex-col sm:p-4 md:p-0 sm:mt-4 font-medium sm:border sm:border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link to="/about" className="cursor-pointer nav-link">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/competition" className="cursor-pointer nav-link">
                  Kompetisi
                </Link>
              </li>
              <li>
                <Link
                  to="/#partnership"
                  className="nav-link cursor-pointer"
                  onClick={(e) => handleLinkClick(e, "partnership")}
                >
                  Kerjasama
                </Link>
              </li>
              <li>
                <Link
                  to="/#faq"
                  className="nav-link cursor-pointer"
                  onClick={(e) => handleLinkClick(e, "faq")}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <Login /> */}
    </div>
  );
};

export default Nav;
