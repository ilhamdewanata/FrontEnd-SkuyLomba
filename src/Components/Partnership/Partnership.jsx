import { partnership } from "../../data/partnership";
import React from "react";
import Subtitle from "../Text/Subtitle";

const Partnership = () => {
  return (
    <div className="partnership-section" id="kerjasama">
      <div className="partnership-container">
        <Subtitle text="Partnership" />
        <div className="partnership-row">
          {partnership.map((data, key) => {
            return <img key={key} src={data.logo} className="partner-logo" />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Partnership;
