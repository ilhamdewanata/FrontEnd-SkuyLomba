import React from "react";
import Subtitle from "../Text/Subtitle";
import { testimonial } from "../../data/testimonial";
import "../../assets/css/styles-home.css";

const Testimonial = () => {
  return (
    <div className="testimonial-section">
      <Subtitle text="Bagaimana Pengalaman dari para Sobat Skuy?" />
      <div className="testimonial-container">
        {testimonial.map((data, key) => {
          return (
            <div className="testimonial-item" key={key}>
              <div className="testimonial-content">
                <p className="testimonial-text">{data.testimonial}</p>
                <img src={data.image} alt="User 1" className="user-photo" />
                <h4 className="user-name">{data.name}</h4>
                <p className="user-university">{data.organization}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonial;
