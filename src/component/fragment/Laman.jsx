import React from "react";
import { Link } from "react-router-dom";

const Laman = ({ about, type }) => {
  return (
    <div className="w-full bg-white p-2 rounded-lg lg:w-4/5 ">
      <div className="flex items-center gap-2 lg:p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6rem"
          height="1.6rem"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81zM12 3L2 12h3v8h6v-6h2v6h6v-8h3z"
          ></path>
        </svg>
        <Link to={`/`} className="font-semibold text-slate-900 lg:text-black">
          Home
        </Link>
        <span>&gt;</span>
        <p className="ml-1 tracking-wide text-base font-semibold lg:text-base lg:font-normal md:text-black lg:text-black">
          {about}
        </p>
      </div>
    </div>
  );
};

export default Laman;
