import Slider from "react-slick";
import StarsIcon from "../element/icon/StarsIcon";
import { Link } from "react-router-dom";
import { getTmdbImageUrl } from "../../libs/imageHelper";

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
          <Link
            to={data?.media_type === "tv" || data?.name ? `/tvseries/${data?.id}` : `/movie/${data?.id}`}
            key={data?.id}
            className="w-full"
          >
            <div
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${getTmdbImageUrl(data?.backdrop_path, "w500")})`,
                backgroundPosition: "center top",
                backgroundSize: "100%",
              }}
              key={data?.id}
              className="relative z-10 w-full flex flex-col bg-no-repeat custom:h-[20rem] md:h-[28rem] lg:h-[30rem] xl:h-[36rem] lg:p-4 "
            >
              <img
                className="w-2/5 rounded-md mt-5 ml-4 h-48 object-cover object-center lg:w-1/5 custom:h-[20rem] md:h-[25rem] img-soft-shadow"
                src={getTmdbImageUrl(data?.poster_path, "w500")}
                alt=""
              />
              <div className="absolute right-0 bottom-4">
                <div className="flex items-center py-1.5 px-3 bg-black/60 backdrop-blur-md rounded-l-lg border-l border-y border-white/10 gap-1.5 shadow-lg">
                  <StarsIcon wdth="w-4 h-4" />
                  <p className="font-sans text-xs tracking-wider font-extrabold text-white">
                    {parseFloat(data?.vote_average || 0).toFixed(1)}
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
