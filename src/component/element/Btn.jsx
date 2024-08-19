import React from "react";

const BtnTrend = ({ btnClick, btnTitle, btnClass }) => {
  return (
    <button
      onClick={btnClick}
      style={{ fontFamily: "monospace" }}
      className={`${btnClass} rounded-md tracking-wide py-2 px-4 text-center text-sm font-bold uppercase  transition-all`}
    >
      {btnTitle}
    </button>
  );
};

export default BtnTrend;
