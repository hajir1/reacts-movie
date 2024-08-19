import React from "react";

const FilmIcon = ({fill}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2.2rem"
      height="2.2rem"
      viewBox="0 0 50 50"
    >
      <g
        fill={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
      >
        <path
          stroke={"#232423"}
          d="M25 35.417v8.333h12.5v-8.333zm-12.5 0v8.333H25v-8.333zM6.25 43.75h37.5zM37.5 14.583V6.25H25v8.333zm-12.5 0V6.25H12.5v8.333zM6.25 6.25h37.5zM27.083 25l-4.166-3.125v6.25z"
        ></path>
        <path
          stroke="#232423"
          d="M43.75 33.333V16.667a2.084 2.084 0 0 0-2.083-2.084H8.333c-1.15 0-2.083.933-2.083 2.084v16.666c0 1.15.933 2.084 2.083 2.084h33.334c1.15 0 2.083-.933 2.083-2.084"
        ></path>
      </g>
    </svg>
  );
};

export default FilmIcon;
