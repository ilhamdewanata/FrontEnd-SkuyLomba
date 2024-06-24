import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { faq } from "../../data/faq";

const Faq = () => {
  const [visibleFaqIndex, setVisibleFaqIndex] = useState(null);

  const handleFaq = (index) => {
    setVisibleFaqIndex(visibleFaqIndex === index ? null : index);
  };

  return (
    <div className="mt-14">
      {faq.map((data, index) => (
        <div key={index}>
          <button
            onClick={() => handleFaq(index)}
            className={`mt-4 flex items-center justify-between w-3/4 py-3 px-5 mx-auto text-left rounded-md border border-[#ddd] ${
              visibleFaqIndex === index
                ? "bg-blue-600 text-white"
                : "bg-[#f0f0f0]"
            }`}
          >
            <p>{data.question}</p>
            <IoIosArrowDown />
          </button>
          {visibleFaqIndex === index && (
            <div className="flex items-center justify-between bg-white w-3/4 py-3 px-5 mx-auto text-left rounded-md border border-[#ddd]">
              <p>{data.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;
