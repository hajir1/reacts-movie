import React from "react";
import Slider from "react-slick";
import StarsIcon from "../element/icon/StarsIcon";
import { Link } from "react-router-dom";

export const SliderV1 = ({ datas }) => {
  const settings = {
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Slider {...settings}>
      {datas?.isLoading ? (
        <div className="h-[12rem] custom:h-[20rem] md:h-[28rem] lg:h-[40rem] w-full ">
          <div className=" h-full w-full animate-pulse duration-100  transition-all bg-slate-800"></div>
        </div>
      ) : (
        datas?.data?.results.slice(0, 10)?.map((data) => (
          <Link to={`/movie/${data?.id}`} key={data?.id} className="w-full">
            <div
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/w500/${data?.backdrop_path})`,
                backgroundPosition: "center top",
                backgroundSize: "100%",
              }}
              key={data?.id}
              className="relative z-10 w-full flex flex-col bg-no-repeat custom:h-[20rem] md:h-[28rem] lg:h-[30rem] xl:h-[36rem] lg:p-4 "
            >
              <img
                style={{
                  boxShadow: "0.1rem 0.1rem 0.3rem gray",
                }}
                className="w-2/5 rounded-md mt-5 ml-4 h-48 object-cover object-center lg:w-1/5 custom:h-[20rem] md:h-[25rem]"
                src={`${
                  datas?.data?.poster_path === null
                    ? "/movienotfound.webp"
                    : `https://image.tmdb.org/t/p/w500/${data?.poster_path}`
                }`}
                alt=""
              />
              <div className="absolute right-0 bottom-0 w-1/4 custom:w-20">
                <div
                  style={{
                    boxShadow: `0.1rem 0.2rem 1.3rem 0.2rem gray inset`,
                  }}
                  className="flex items-center py-2 px-2"
                >
                  <StarsIcon wdth={`w-6 h-6`} />{" "}
                  <p className="font-sans tracking-wider font-extrabold uppercase px-3 text-white rounded-sm  ">
                    {parseFloat(data?.vote_average).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </Slider>
  );
};
