import React from "react";
import WhiteLogo from "../../../public/assets/images/logos/Logo-Putih-SkuyLomba.png";
// import "../../assets/css/styles-home.css";

const Footer = () => {
  return (
    <div className="footer w-full">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo">
            {/* <img src="Asset/Image/Logo-Putih-SkuyLomba.png" alt="Logo Skuy Lomba"> */}
            <img src={WhiteLogo} alt="Logo Skuy Lomba" />
          </div>
          <div className="footer-icons">
            <a href="#">
              <i className="fab fa-discord"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        <div className="footer-links flex flex-wrap">
          <a href="#">Tentang Kami</a>
          <a href="#">Lomba</a>
          <a href="#">Forum</a>
          <a href="#">Kerjasama</a>
          <a href="#">FAQ</a>
        </div>
        <div className="footer-contact">
          <button>Contact Us</button>
        </div>
      </div>
      <div className="footer-divider"></div>
      <div className="footer-bottom">
        <p>&copy; 2024 All Rights Reserved</p>
      </div>
    </div>
  );
};
export default Footer;
