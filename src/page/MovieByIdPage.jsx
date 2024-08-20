import React, { useEffect } from "react";
import Navbar from "../component/layouts/Navbar";
import { useParams } from "react-router-dom";
import {
  UseAPIById,
  UseAPICharById,
  UseAPIKeywordById,
  UseAPIRecomendationById,
  UseAPISosmedById,
  UseAPIVideo,
} from "../services/API_DATA";

import Simple from "../component/element/Label";
import Hero from "../component/layouts/Hero";
import { BoxV3, BoxV4 } from "../component/layouts/BoxModel";
import {
  Facebook,
  HomeUrl,
  Instagram,
  Twitter,
} from "../component/element/Sosmed";
import Keyword from "../component/layouts/Keyword";
import Laman from "../component/fragment/Laman";

const MovieByIdPage = () => {
  const { id } = useParams();
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);

  const detailMovie = UseAPIById("movie", id);
  const detailChar = UseAPICharById("movie", id);
  const detailSosmed = UseAPISosmedById("movie", id);
  const detailKeyword = UseAPIKeywordById("movie", id);
  const detailRecomendation = UseAPIRecomendationById("movie", id);
  const detailVideo = UseAPIVideo("movie", id);

  return (
    <div className="w-full ">
      <Navbar />
      <Laman about={`movie | ${detailMovie?.data?.title}`} />
      <Hero datas={detailMovie} type={`movie`} />
      <div className="w-full lg:flex ">
        {" "}
        <div
          className={`${
            detailChar?.isLoading && detailMovie?.isLoading && "hidden"
          } w-full lg:w-3/4 `}
        >
          <div className="lg:p-4">
            <div className="mt-10 pl-2 font-sans font-bold tracking-normal text-black text-xl lg:text-2xl">
              Character
            </div>

            <BoxV3 type={`movie`} datas={detailChar} />
          </div>
          <div
            className={`${
              detailRecomendation?.isLoading &&
              detailMovie?.isLoading &&
              "hidden"
            } w-full lg:p-4`}
          >
            <div className="mt-10 pl-2 font-sans font-bold tracking-normal text-black text-xl lg:text-2xl">
              Recomendations
            </div>
            <BoxV4 type={`movie`} datas={detailRecomendation} />
          </div>
          <div className="w-full my-2 p-2">
            <div className="mt-2 pl-2 font-sans font-bold tracking-normal text-black text-xl lg:text-2xl">
              Video
            </div>
            {detailVideo?.data?.results?.length > 0 ? (
              detailVideo?.data?.results?.map((video) => (
                <div key={video?.id} className="w-5/6  custom:w-full lg:mt-6">
                  <a
                    className="ml-2 tracking-wide border-b-2 border-b-purple-700  text-purple-950 text-sm font-semibold lg:text-base lg:font-normal md:text-black lg:text-black"
                    href={`https://www.youtube.com/watch?v=${video?.key}`}
                  >
                    {video?.name}
                  </a>
                </div>
              ))
            ) : (
              <h1 className="text-center w-full ml-1 mt-2 mr-1 tracking-wide text-base font-semibold">
                no videos have been added
              </h1>
            )}
          </div>
        </div>
        <div
          className={`${
            detailKeyword?.isLoading && detailMovie?.isLoading && "hidden"
          } w-full lg:w-[23%] custom:w-4/5 p-1 lg:bg-gray-50`}
        >
          <div className="mt-10 pl-2 font-sans font-bold tracking-normal text-black text-xl lg:text-2xl">
            Keywords
          </div>
          <Keyword datas={detailKeyword} type={`movie`} />
          <div
            className={`${
              detailSosmed?.isLoading && detailMovie?.isLoading && "hidden"
            } w-full flex justify-start gap-2 mb-6 mt-4 lg:mt-8`}
          >
            <Instagram
              className={`${
                detailSosmed?.data?.instagram_id === null ||
                (detailSosmed?.data?.instagram_id === "" && "hidden")
              } `}
              href={`https://www.instagram.com/${detailSosmed?.data?.instagram_id}`}
            />
            <Twitter
              className={`${
                detailSosmed?.data?.twitter_id === null ||
                (detailSosmed?.data?.twitter_id === "" && "hidden")
              }`}
              href={`https://www.twitter.com/${detailSosmed?.data?.twitter_id}`}
            />

            <Facebook
              className={`${
                detailSosmed?.data?.facebook_id === null ||
                (detailSosmed?.data?.facebook_id === "" && "hidden")
              }`}
              href={`https://www.facebook.com/${detailSosmed?.data?.facebook_id}`}
            />

            <HomeUrl
              className={`${
                detailSosmed?.data?.homepage === null ||
                (detailSosmed?.data?.homepage === "" && "hidden")
              }`}
              href={`${detailMovie?.data?.homepage}`}
            />
          </div>

          <div className={`${detailMovie?.isLoading && "hidden"} lg:mt-10`}>
            <Simple
              quote={`${detailMovie?.data?.original_title}`}
              title={`original Title`}
            />
            <Simple quote={`${detailMovie?.data?.status}`} title={`Status`} />
            <Simple
              quote={`${
                detailMovie?.data?.spoken_languages[0]
                  ? `${detailMovie?.data?.spoken_languages[0]?.name} / ${detailMovie?.data?.spoken_languages[0]?.english_name}`
                  : `${detailMovie?.data?.original_language}`
              } `}
              title={`Language`}
            />
            <Simple
              quote={`${
                detailChar?.data?.budget !== 0
                  ? `${detailMovie?.data?.budget.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}`
                  : "--"
              }`}
              title={`Budget`}
            />

            <Simple
              quote={`${
                detailChar?.data?.revenue !== 0
                  ? `${detailMovie?.data?.revenue.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}`
                  : "--"
              }`}
              title={`Revenue`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieByIdPage;
