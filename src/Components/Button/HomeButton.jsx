import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const HomeButton = ({ text, link, icon: Icon }) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(`${link}`)} className="cta-button flex items-center gap-2">
      {Icon && <Icon className="text-white" />} {/* Menambahkan ikon jika ada */}
      {text}
    </button>
  );
};

// Menambahkan prop types untuk validasi props
HomeButton.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.elementType, // Ikon opsional
};

export default HomeButton;
