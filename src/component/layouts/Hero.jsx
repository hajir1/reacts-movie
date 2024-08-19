import {
  CircularProgress,
  CircularProgressLabel,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import FormatDate from "../../libs/Formatdate";

const Hero = ({ datas, type, schema }) => {
  return (
    <>
      {datas?.isLoading ? (
        <div className="w-full h-screen flex-col flex items-center justify-center">
          {" "}
          <Spinner width={`10rem`} speed="0.65s" height={`10rem`} />
          <h1 className="text-slate-900 font-semibold font-sans pt-2 text-center text-xl custom:text-black lg:text-gray-200 lg:pt-0 ">
            Loading...
          </h1>
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/w500/${datas?.data?.backdrop_path})`,
            backgroundPosition: "center top",
            backgroundSize: "100%",
          }}
          className="relative w-full p-2 flex flex-col bg-no-repeat lg:h-[40rem] lg:p-4 lg:flex-row"
        >
          <img
            style={{
              boxShadow: "0.1rem 0.1rem 0.3rem gray",
            }}
            className="w-2/5 rounded-md mt-5 ml-4 h-48 object-cover object-center lg:w-1/5 lg:h-[20rem]"
            src={`${
              datas?.data?.poster_path === null
                ? "/movienotfound.webp"
                : `https://image.tmdb.org/t/p/w500/${datas?.data?.poster_path}`
            }`}
            alt=""
          />
          <div className="bg-gray-100 mt-2 rounded-md lg:w-3/4 lg:bg-transparent">
            <div className="flex items-center justify-evenly gap-2 lg:flex-col-reverse lg:items-start">
              <div className="ml-1 mt-6 flex items-center flex-col lg:flex-row lg:ml-8">
                <CircularProgress
                  color="gray.500"
                  size={`4rem`}
                  value={Math.round(datas.data?.vote_average * 10)}
                >
                  <CircularProgressLabel className="custom:text-black lg:text-gray-100">
                    {Math.round(datas.data?.vote_average * 10)}%
                  </CircularProgressLabel>
                </CircularProgress>
                <p className="text-xs font-sans capitalize text-slate-700 mt-2 lg:text-gray-200 lg:font-bold lg:text-xl lg:tracking-wider lg:w-20 custom:text-black lg:mx-2 lg:p-2">
                  skor users
                </p>
              </div>
              <h1 className="w-3/5 text-slate-900 font-sans pt-2 text-center text-2xl custom:text-black lg:text-gray-200 lg:w-full lg:text-start lg:ml-6 lg:text-4xl">
                {type === "tv" && datas?.data?.name}
                {type === "movie" && datas?.data?.title}
              </h1>
            </div>
            <div className="lg:flex lg:items-center lg:ml-6 lg:mt-6">
              <h1 className="text-slate-900 font-sans pt-2 text-center text-sm custom:text-black lg:text-gray-200 lg:pt-0 lg:text-base lg:font-semibold">
                {type === "movie" && FormatDate(datas?.data?.release_date)}
                {type === "tv" && FormatDate(datas?.data?.first_air_date)}
              </h1>
              <ul className="flex justify-center flex-wrap gap-2 ">
                {datas?.data?.genres?.map((genre) => (
                  <li
                    key={genre?.id}
                    className="text-sm text-slate-900 custom:text-black lg:text-gray-200 lg:text-base lg:ml-3 lg:font-semibold lg:tracking-wider"
                  >
                    - {genre?.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-2 lg:ml-6 lg:mt-10">
              <p className="text-4xl text-gray-800 font-primary custom:text-black lg:text-gray-200">
                {" "}
                {datas?.data?.tagline}
              </p>
              <p className=" text-center mt-2 text-sm font-sans text-slate-700 custom:text-black lg:text-gray-200 lg:text-base lg:tracking-wider lg:mt-6">
                {datas?.data?.overview}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
