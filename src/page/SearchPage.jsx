import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/layouts/Navbar";
import { useSearch } from "../state/Management";
import { SearchIcon } from "@chakra-ui/icons";
import { BoxV2 } from "../component/layouts/BoxModel";
import { UseAPISearch, UseAPISearchTv } from "../services/API_DATA";
import Simple from "../component/element/Label";
import FormatDate from "../libs/Formatdate";
import Laman from "../component/fragment/Laman";

const ComponentSearch = ({ datas, title }) => {
  return (
    <>
      {" "}
      <div className="mt-10 pl-2 font-sans font-bold tracking-normal text-black text-xl lg:text-2xl lg:ml-4">
        {title}
      </div>
      <div className="">
        {datas?.data?.results?.length > 0 ? (
          datas?.data?.results
            ?.sort((a, b) => {
              const date =
                new Date(b?.release_date) - new Date(a?.release_date);
              return date;
            })
            ?.map((data) => (
              <Link
                to={`${`/movie/${data?.id}`}`}
                className="p-1 justify-evenly flex items-center gap-1 lg:p-2 w-full lg:w-1/2 "
                key={data?.id}
              >
                <div className=" relative">
                  {" "}
                  <img
                    src={`${
                      data?.backdrop_path === null
                        ? "/movienotfound.webp"
                        : `https://image.tmdb.org/t/p/w300/${data?.backdrop_path}`
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
                <div className="flex flex-col w-4/5 lg:ml-2 ">
                  {" "}
                  <h1 className="ml-1 mt-1 mr-1 tracking-wide text-sm font-bold lg:text-base lg:text-black lg:font-semibold">
                    {data?.title}
                  </h1>
                  <div className="flex items-center justify-start">
                    {" "}
                    <p className="ml-1 tracking-wide text-xs font-semibold lg:text-sm lg:text-black">
                      {FormatDate(data?.release_date)} /{" "}
                      {Math.round(data?.vote_average * 10) + " %"}
                    </p>
                  </div>
                </div>
              </Link>
            ))
        ) : (
          <h1 className="w-full ml-1 mt-2 mr-1 tracking-wide text-base font-semibold lg:ml-4">
            no data query have been added
          </h1>
        )}
      </div>
    </>
  );
};

const SearchPage = () => {
  const { key } = useParams();
  const { search, setSearch } = useSearch();
  const SearchData = UseAPISearch(search);
  const SearchDataTv = UseAPISearchTv(search);

  const navigate = useNavigate();
  useEffect(() => {
    if (search === "") {
      setSearch(key);
    }
  }, [key]);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${search}`);
    }
  });
  return (
    <div className="w-full">
      <Navbar />
      <Laman about={`search | ${key}`} />
      <div className="w-full mt-10">
        <div className="relative w-full flex items-center border-b-[1px]">
          <div className="absolute w-10 flex items-center justify-center h-full ">
            <SearchIcon fill={`${search?.length > 0 ? "primary" : "gray"}`} />
          </div>
          <input
            required
            onChange={(e) => setSearch(e.target.value)}
            className={`w-5/6 ml-10 outline-none pl-2  text-slate-800 placeholder:tracking-wider placeholder:text-slate-800 py-2  border-b-slate-700 transition-all duration-100 `}
            value={search}
            placeholder={search?.length > 0 ? search : "search movie..."}
          />
        </div>
      </div>
      <ComponentSearch datas={SearchData} title={`Movies`} />
      <ComponentSearch datas={SearchDataTv} title={`Tv Series`} />
    </div>
  );
};

export default SearchPage;
