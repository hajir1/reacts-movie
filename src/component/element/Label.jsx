import React, { useEffect, useState } from "react";

const Simple = ({ title, quote, children, type }) => {
  return (
    <>
      {" "}
      <h1
        className={`${
          type === "char" && "text-center md:text-start w-full"
        } ml-1 mt-2 mr-1 tracking-wide text-sm font-bold lg:text-base lg:font-semibold md:text-black lg:text-black`}
      >
        {title}
      </h1>
      {children}
      <span
        className={`${
          type === "char" && "text-center mr-1 md:text-start w-full"
        } ml-1 tracking-wide text-sm font-semibold lg:text-base lg:font-normal md:text-black lg:text-black`}
      >
        {type === "char" ?`as ${quote}`:quote}
      </span>
    </>
  );
};

export default Simple;
