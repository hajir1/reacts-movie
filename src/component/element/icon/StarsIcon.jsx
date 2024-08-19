import React from "react";

const StarsIcon = ({key, wdth}) => {
  return (
    <svg
      key={key}
      className={`${wdth} text-yellow-500`}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .587l3.668 7.431L24 9.587l-6 5.847 1.416 8.246L12 18.847l-7.416 4.833L6 15.434 0 9.587l8.332-1.569L12 .587z" />
    </svg>
  );
};

export default StarsIcon;
