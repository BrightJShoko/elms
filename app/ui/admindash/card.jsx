import React from "react";

const Card = ({ title, subTitle, sub, background }) => {
  return (
    <div
      className={`${background} text-[#00913E] flex items-center gap-1 p-2 rounded-lg px-[50px] content-center`}
    >
      <div className="font-semibold text-[50px]">{title}</div>
      <div className="flex flex-col">
        <span className="font-semibold text-[14px]">{subTitle}</span>
        <span className="font-semibold text-[14px]">{sub}</span>
      </div>
    </div>
  );
};

export default Card;
