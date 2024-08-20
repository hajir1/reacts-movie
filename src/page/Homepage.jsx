import React, { useEffect, useState } from "react";
import {
  APISearchMovie,
  UseAPIPopular,
  UseAPITrendingAll,
  UseAPITrendingMovies,
  UseAPITrendingTv,
} from "../services/API_DATA";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { SliderV1 } from "../component/fragment/Slider";
import SearchIcon from "../component/element/icon/SearchIcon";
import { BoxV1 } from "../component/layouts/BoxModel";
import {
  usePopularImages,
  usePopularType,
  useSearch,
  useTrendMovie,
  useTrendTv,
} from "../state/Management";
import Navbar from "../component/layouts/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../component/fragment/Footer";

const Homepage = () => {
  const { popularImages } = usePopularImages();
  const { popularType, setPopularType } = usePopularType();
  const { valueTrendMovie, setValueTrendMovie } = useTrendMovie();
  const { valueTrendTv, setValueTrendTv } = useTrendTv();
  const datasTrendingAll = UseAPITrendingAll();
  const datasTrendingMovies = UseAPITrendingMovies(valueTrendMovie);
  const datasTrendingTv = UseAPITrendingTv(valueTrendTv);
  const datasPopular = UseAPIPopular(popularType);
  const { search, setSearch } = useSearch();
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.length > 0) {
      APISearchMovie(search, (cb) => {
        if (cb?.status === 200) {
          navigate(`/search/${search}`);
          setSearch("");
        }
      });
    }
  };
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // });

  return (
    <div>
      <div
        style={{
          boxShadow: `0.2rem 0.1rem 2.3rem gray`,
        }}
        className="w-full bg-secondary custom:bg-black"
      >
        <Navbar />
        <div className="w-full overflow-hidden mt-2 relative left-1/2 -translate-x-1/2 ">
          <SliderV1 datas={datasTrendingAll} />
        </div>
        <div className="w-full flex justify-center p-4 z-30">
          {datasTrendingAll?.isLoading ? (
            <div className="bg-gray-800 h-10 w-5/6 animate-pulse duration-100 transition-all "></div>
          ) : (
            <div className="relative w-5/6 bg-gray-700 rounded-lg">
              <input
                value={search}
                required
                onChange={(e) => setSearch(e.target.value)}
                className={`w-5/6 outline-none pl-4 bg-gray-700 text-white placeholder:tracking-wider placeholder:text-gray-400 py-2 rounded-md`}
                placeholder="search movie..."
              />
              <div
                onClick={(e) => handleSearch(e)}
                className={`${
                  search.length > 0 && "bg-gray-200"
                } h-full absolute w-10 right-0 top-1/2 -translate-y-1/2`}
              >
                <div className="flex items-center justify-end mr-3 h-full">
                  <SearchIcon
                    fill={`${search?.length > 0 ? "primary" : "gray"}`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-100 p-1 shadow-lg lg:bg-gray-200">
        <BoxV1
          datas={datasTrendingMovies}
          title={"Trending Movie"}
          valueTrend={valueTrendMovie}
          setValueTrend={setValueTrendMovie}
          type={`movie`}
          schema={`trending`}
        />

        <BoxV1
          datas={datasTrendingTv}
          title={"Trending Tv"}
          setValueTrend={setValueTrendTv}
          valueTrend={valueTrendTv}
          type={`tv`}
          schema={`trending`}
        />
      </div>
      <div className="relative overflow-x-hidden p-2">
        <div
          className="absolute inset-0 bg-cover w-[100%] bg-center "
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/w500/${popularImages})`,
          }}
        ></div>

        <div className="relative my-8">
          <BoxV1
            datas={datasPopular}
            title={"Curently Popular"}
            schema={`popular`}
            valueTrend={popularType}
            setValueTrend={setPopularType}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
