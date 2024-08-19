import React from "react";
const skeletonArray = Array.from({ length: 20 }, (_, index) => index);
const skeletonArray4 = Array.from({ length: 4 }, (_, index) => index);
const skeletonArray8 = Array.from({ length: 8 }, (_, index) => index);

export const SkeletonvSimple = () => {
  return (
    <div className="w-full flex justify-evenly gap-1 p-1 flex-wrap">
      {skeletonArray8.map((key) => (
        <div
          key={key}
          className="bg-gray-200 animate-pulse duration-100 transition-all w-[31%] h-6 rounded-md mt-1"
        ></div>
      ))}
    </div>
  );
};
export const SkeletonvSimpleV2 = () => {
  return (
    <>
      {skeletonArray4.map((key) => (
        <div key={key}>
          <div className="ml-1 mt-2 bg-gray-200 animate-pulse duration-100 transition-all h-8 w-2/6 rounded-md"></div>
          <div className="ml-1 mt-2 bg-gray-200 animate-pulse duration-100 transition-all h-8 w-2/5 rounded-md"></div>
        </div>
      ))}
    </>
  );
};
export const SkeletonvSimpleV3 = () => {
  return (
    <>
      <div className="w-full flex justify-start gap-1 mb-6">
        {skeletonArray4.map((key) => (
          <div
            key={key}
            className="mt-1 bg-gray-200 animate-pulse duration-100 transition-all h-8 w-8 rounded-md"
          ></div>
        ))}
      </div>
    </>
  );
};

export const SkeletonV1 = () => {
  return (
    <div className=" flex overflow-x-auto gap-1 mt-2 lg:p-4 ">
      {skeletonArray?.map((key, index) => (
        <div
          className="w-[45%] h-[17.5rem] rounded-md shrink-0 custom:w-1/3 md:w-1/4 lg:w-1/6 "
          key={index}
        >
          <div className="bg-gray-200 w-full h-[14rem] animate-pulse duration-100 transition-all"></div>
          <div className="w-11/12 mt-1 rounded-md h-6 bg-gray-200 animate-pulse duration-100 transition-all"></div>
          <div className="w-3/5 mt-2 rounded-md h-4 bg-gray-200 animate-pulse duration-100 transition-all"></div>
        </div>
      ))}
    </div>
  );
};
export const Skeletonv2 = () => {
  return (
    <div className="flex flex-col gap-1 mt-2 w-full">
      {skeletonArray?.map((key, index) => (
        <div
          className="w-full p-1 justify-evenly flex items-center gap-1"
          key={index}
        >
          <div className="w-14 h-14 rounded-md bg-gray-200 animate-pulse duration-100 transition-all" />
          <div className="flex flex-col w-4/5">
            <div className="ml-1 mt-1 mr-1 bg-gray-200 animate-pulse duration-100 transition-all h-5 w-4/5 rounded-md lg:w-1/5"></div>
            <div className="ml-1 mt-2 bg-gray-200 animate-pulse duration-100 transition-all w-3/5 h-4 rounded-md lg:w-2/5"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export const Skeletonv3 = () => {
  return (
    <div className="flex flex-col gap-1 mt-2 w-full">
      {skeletonArray?.map((key, index) => (
        <div
          className="w-full p-1 justify-evenly flex items-center gap-1"
          key={index}
        >
          <div className="w-14 h-14 rounded-md bg-gray-200 animate-pulse duration-100 transition-all" />
          <div className="flex flex-col w-4/5">
            <div className="ml-1 mt-1 mr-1 left-1/2 -translate-x-1/2 relative bg-gray-200 animate-pulse duration-100 transition-all h-5 w-4/5 rounded-md lg:w-1/5"></div>
            <div className="ml-1 mt-2 bg-gray-200 left-1/2 -translate-x-1/2 relative animate-pulse duration-100 transition-all w-3/5 h-4 rounded-md lg:w-2/5"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
