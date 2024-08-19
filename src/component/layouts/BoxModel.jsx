import React, { useEffect } from "react";
import { usePopularImages, usePopularType } from "../../state/Management";
import StarsIcon from "../element/icon/StarsIcon";
import { Link } from "react-router-dom";
import FormatDate from "../../libs/Formatdate";
import { SkeletonV1 } from "../element/Skeleton";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Select } from "@chakra-ui/react";

// untuk semua movie dan tv series
export const BoxV1 = ({
  datas,
  setValueTrend,
  valueTrend,
  title,
  type,
  schema,
}) => {
  const { popularImages, setPopularImages } = usePopularImages();

  const { popularType } = usePopularType();
  return (
    <>
      {datas?.isLoading ? (
        <div className="h-16 w-full lg:h-24"></div>
      ) : (
        <div className={`p-1 flex items-center justify-between lg:p-4`}>
          <h1
            className={`${
              schema === "popular" && "text-gray-300 mt-2  lg:text-gray-100"
            } mt-10 pl-1 font-sans font-bold tracking-normal text-black text-xl lg:text-2xl `}
          >
            {title}
          </h1>
          <select
            className={`${
              schema === "popular" &&
              "bg-transparent text-gray-200 mt-2 lg:text-black lg:border-black"
            } py-2 border rounded-md mt-10 mr-8 ml-2 pr-5 border-slate-300 pl-2 outline-none bg-gray-200 `}
            value={valueTrend}
            onChange={(e) => setValueTrend(e.target.value)}
          >
            <option value={`${schema === "popular" ? "movie" : "day"}`}>
              {schema === "popular" ? "Movie" : "Today"}
            </option>
            <option value={`${schema === "popular" ? "tv" : "week"}`}>
              {schema === "popular" ? "Tv Series" : "This Week"}
            </option>
            <option
              className={`${schema === "trending" && "hidden"}`}
              value={`person`}
            >
              Person
            </option>
          </select>
        </div>
      )}
      {!datas?.isLoading ? (
        <div
          className="lg:p-1"
          style={{
            display: "flex",
            overflowX: `auto`,
            gap: `0.3rem`,
          }}
        >
          {datas?.data?.results?.map((data) => (
            <Link
              to={`${
                (schema === "popular" && popularType === "tv") ||
                (schema === "trending" && type === "tv")
                  ? `/tvseries/${data?.id}`
                  : (schema === "popular" && popularType === "movie") ||
                    (schema === "trending" && type === "movie")
                  ? `/movie/${data?.id}`
                  : `/char/${data?.id}`
              }`}
              key={data?.id}
              className={`${
                schema === `popular` && "border border-gray-50 text-gray-200"
              } w-[45%] rounded-lg shrink-0 p-1 custom:w-1/3 md:w-1/4 lg:w-1/6 relative `}
              onClick={() => setPopularImages(data?.poster_path)}
            >
              <div className="relative w-full h-[15rem] lg:h-[18rem]">
                <img
                  className="object-cover rounded-md object-center w-full h-full"
                  src={`${
                    schema === "popular" && popularType === "person"
                      ? `https://image.tmdb.org/t/p/w300/${data?.profile_path}`
                      : `https://image.tmdb.org/t/p/w300/${data?.poster_path}`
                  }`}
                  alt={`not found image`}
                />
                <div
                  style={{
                    boxShadow:
                      "0px 2px 20px gray inset, 0px 4px 6px rgba(0, 0, 0, 0.1)",
                    mixBlendMode: "multiply",
                  }}
                  className="absolute inset-0 rounded-md pointer-events-none"
                />
                <div
                  style={{
                    boxShadow: "0.3rem 0.6rem 1rem gray inset",
                  }}
                  className={`${
                    popularType === "person" && schema === "popular" && "hidden"
                  } flex justify-center items-center absolute gap-2 bottom-0 bg-transparent text-white p-1 pr-2`}
                >
                  <StarsIcon wdth={`w-4 h-4`} />
                  {parseFloat(data?.vote_average).toFixed(1)}
                </div>
              </div>
              <h6
                style={{ fontFamily: "sans-serif" }}
                className={`${
                  popularImages === "" && "text-black"
                } ml-1 mt-1 mr-1 tracking-wide text-sm font-bold lg:text-base `}
              >
                {schema === "trending" && type === "movie" && data?.title}
                {schema === "trending" && type === "tv" && data?.name}
                {schema === "popular" && popularType === "movie" && data?.title}
                {schema === "popular" && popularType === "tv" && data?.name}
                {schema === "popular" && popularType === "person" && data?.name}
              </h6>
              <p
                style={{ fontFamily: "sans-serif" }}
                className={`${
                  popularImages === "" && "text-black"
                } ml-1 tracking-wide text-xs font-semibold lg:text-sm `}
              >
                {schema === "trending" &&
                  type === "movie" &&
                  FormatDate(data?.release_date)}
                {schema === "trending" &&
                  type === "tv" &&
                  FormatDate(data?.first_air_date)}
                {schema === "popular" &&
                  popularType === "movie" &&
                  FormatDate(data?.release_date)}
                {schema === "popular" &&
                  popularType === "tv" &&
                  FormatDate(data?.first_air_date)}
                {schema === "popular" &&
                  popularType === "person" &&
                  data?.known_for_department}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <SkeletonV1 />
      )}
    </>
  );
};

// untuk semua char di detail movie
export const BoxV2 = ({ datas, title, length, type }) => {
  return (
    <div className="lg:flex lg:flex-col lg:w-1/2">
      <h1 className="text-xl font-sans mt-8 font-semibold text-slate-800 pl-2 lg:text-black lg:text-2xl lg:ml-5">
        {title} &nbsp;&nbsp;
        <span className="font-extrabold lg:font-light">{length}</span>
      </h1>
      <div className="flex flex-col gap-1 mt-2 w-full">
        {datas?.map((char) => (
          <Link
            to={`/char/${char?.id}`}
            className="w-full p-1 justify-evenly flex items-center gap-1 lg:p-2 "
            key={Math.random(0, 123012093) * 10}
          >
            <div className=" relative">
              {" "}
              <img
                src={`${
                  char?.profile_path !== null
                    ? `https://image.tmdb.org/t/p/w300/${char?.profile_path}`
                    : "/people.jpeg"
                }`}
                className="w-14 h-14 rounded-md object-cover object-center lg:w-16 lg:h-16 "
              />
              <div
                style={{
                  boxShadow:
                    "0px 2px 1.2rem gray inset, 0px 4px 6px rgba(0, 0, 0, 0.1)",
                  mixBlendMode: "multiply",
                }}
                className="absolute inset-0 rounded-md pointer-events-none"
              />
            </div>
            <div className="flex flex-col w-4/5 lg:ml-2">
              {" "}
              <h1 className="ml-1 mt-1 mr-1 tracking-wide text-sm font-bold lg:text-base lg:text-black lg:font-semibold">
                {type === "cast" && char?.name}
                {type === "crew" && char?.name}
              </h1>
              <p className="ml-1 tracking-wide text-xs font-semibold lg:text-sm lg:text-black">
                {type === "cast" && char?.character}
                {type === "crew" && char?.job}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// untuk character di bagian detail
export const BoxV3 = ({ datas, type }) => {
  return (
    <div className="flex gap-2 overflow-x-scroll mt-1 p-2">
      {datas?.data?.cast?.length > 0 ? (
        <>
          {" "}
          {datas?.data?.cast?.slice(0, 9)?.map((char) => (
            <Link
              to={`/char/${char?.id}`}
              key={char?.id}
              className=" shrink-0 w-2/5 custom:w-1/4 lg:w-1/6"
            >
              <div className="relative">
                {" "}
                <img
                  className="object-cover rounded-md object-center w-full h-[12rem] opacity-95"
                  src={`${
                    char?.profile_path !== null
                      ? `https://image.tmdb.org/t/p/w300/${char?.profile_path}`
                      : "/people.jpeg"
                  } `}
                  alt={`not found image`}
                />
                <div
                  style={{
                    boxShadow:
                      "0px 2px 20px gray inset, 0px 4px 6px rgba(0, 0, 0, 0.1)",
                    mixBlendMode: "multiply",
                  }}
                  className="absolute inset-0 rounded-md pointer-events-none"
                />
              </div>
              <h1 className="ml-1 mt-2 mr-1 tracking-wide text-sm font-bold font-sans lg:text-base">
                {char?.name}
              </h1>
              <p className="ml-1 tracking-wide text-xs font-semibold lg:text-sm lg:font-bold">
                {char?.character}
              </p>
            </Link>
          ))}
          {datas?.data?.cast?.length < 19 ? (
            ""
          ) : (
            <Link
              to={`${
                type === "movie"
                  ? `/movie/char/${datas?.data?.id}`
                  : `/tvseries/char/${datas?.data?.id}`
              }`}
              className=" flex items-center flex-col justify-center "
            >
              <h1 className="w-28 ml-4 text-xl text-slate-800 lg:text-black lg:font-semibold">
                See More
              </h1>
              <ArrowForwardIcon w={8} h={8} color="black" />
            </Link>
          )}
        </>
      ) : (
        <h1 className="text-center w-full ml-1 mt-2 mr-1 tracking-wide text-base font-semibold">
          no characters have been added
        </h1>
      )}
    </div>
  );
};

// box untuk recomendation
export const BoxV4 = ({ datas, type }) => {
  return (
    <div className="flex overflow-y-auto gap-1 p-2 lg:gap-2">
      {datas?.data?.results?.length > 0 ? (
        datas?.data?.results?.map((recomendation) => (
          <Link
            to={`/movie/${recomendation?.id}`}
            key={recomendation?.id}
            className="shrink-0 w-2/3 rounded-md custom:w-2/5 lg:w-[30%]"
          >
            <div className="relative">
              <img
                src={`${
                  recomendation?.poster_path === null
                    ? "/movienotfound.webp"
                    : `https://image.tmdb.org/t/p/w300/${recomendation?.backdrop_path}`
                }`}
                className="w-full h-[12rem] object-cover object-center rounded-md opacity-95"
              />
              <div
                style={{
                  boxShadow:
                    "0px 2px 3rem gray inset, 0px 4px 6px rgba(0, 0, 0, 0.1)",
                  mixBlendMode: "multiply",
                }}
                className="absolute inset-0 rounded-md pointer-events-none"
              />
            </div>
            <div className="flex justify-between gap-1">
              <div className="w-4/5">
                <h1 className="ml-1 mt-2 mr-1 tracking-wide text-sm font-bold font-sans lg:text-base lg:font-bold">
                  {type === "movie" && recomendation?.title}
                  {type === "tv" && recomendation?.name}
                </h1>
                <p className="ml-1 tracking-wide text-xs font-semibold lg:text-sm">
                  {type === "movie" && FormatDate(recomendation?.release_date)}
                  {type === "tv" && FormatDate(recomendation?.first_air_date)}
                </p>
              </div>
              <p className="ml-1 mt-2 mr-1 tracking-wide text-sm font-semibold font-sans lg:text-sm lg:font-bold lg:mt-3">
                {Math.round(recomendation?.vote_average * 10)}%
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-center w-full ml-1 mt-2 mr-1 tracking-wide text-base font-semibold">
          no recomendations have been added
        </h1>
      )}
    </div>
  );
};
