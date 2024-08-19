import React, { useEffect } from "react";
import Navbar from "../component/layouts/Navbar";
import {
  UseAPIById,
  UseAPICharById,
  UseAPIKeywordById,
  UseAPIRecomendationById,
  UseAPISosmedById,
} from "../services/API_DATA";
import { useParams } from "react-router-dom";

import Hero from "../component/layouts/Hero";
import { BoxV3, BoxV4 } from "../component/layouts/BoxModel";
import Simple from "../component/element/Label";
import Keyword from "../component/layouts/Keyword";
import {
  Facebook,
  HomeUrl,
  Instagram,
  Twitter,
} from "../component/element/Sosmed";
import Laman from "../component/fragment/Laman";

const TvSeriesByIdPage = () => {
  const { id } = useParams();
  const detailTvSeries = UseAPIById("tv", id);
  const detailChar = UseAPICharById("tv", id);
  const detailRecomendation = UseAPIRecomendationById("tv", id);
  const detailKeyword = UseAPIKeywordById("tv", id);
  const detailSosmed = UseAPISosmedById("tv", id);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[]);

  return (
    <div className="w-full">
      <Navbar /> 
      <Laman about={`tv series | ${detailTvSeries?.data?.name}`}/>
      <Hero datas={detailTvSeries} type={`tv`} />
      <div className="w-full lg:flex">
        {" "}
        <div className="w-full lg:w-3/4">
          <div
            className={`${
              detailChar?.isLoading && detailTvSeries?.isLoading && "hidden"
            } lg:p-4`}
          >
            <div className="mt-10 pl-2 font-sans font-bold tracking-normal text-black text-xl lg:text-2xl">
              Character
            </div>

            <BoxV3 type={`tvseries`} datas={detailChar} />
          </div>
          <div
            className={`${
              detailRecomendation?.isLoading &&
              detailTvSeries?.isLoading &&
              "hidden"
            } w-full lg:p-4`}
          >
            <div className="mt-10 pl-2 font-sans font-bold tracking-normal text-black text-xl lg:text-2xl">
              Recomendations
            </div>
            <BoxV4 type={`tv`} datas={detailRecomendation} />
          </div>
        </div>
        <div
          className={`${
            detailKeyword?.isLoading && detailTvSeries?.isLoading && "hidden"
          } w-full lg:w-[23%] custom:w-4/5 p-1 lg:bg-gray-50`}
        >
          <div className="mt-10 pl-2 font-sans font-bold tracking-normal text-black text-xl lg:text-2xl">
            Keywords
          </div>
          <Keyword datas={detailKeyword} type={`tv`} />
          <div
            className={`${
              detailSosmed?.isLoading && detailTvSeries?.isLoading && "hidden"
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
              href={`${detailTvSeries?.data?.homepage}`}
            />
          </div>
          <div className={`${detailTvSeries?.isLoading && "hidden"} lg:mt-10`}>
            <Simple
              quote={`${detailTvSeries?.data?.original_name}`}
              title={`Original Name`}
            />
            <Simple
              quote={`${detailTvSeries?.data?.seasons[0]?.episode_count} Season`}
              title={`Season`}
            />
            <Simple
              quote={`${detailTvSeries?.data?.status}`}
              title={`Status`}
            />
            <Simple
              quote={`${
                detailTvSeries?.data?.next_episode_to_air?.name
                  ? detailTvSeries?.data?.next_episode_to_air?.name
                  : "no have been next episode added"
              }`}
              title={`Next Episode`}
            />
            <Simple
              quote={`${
                detailTvSeries?.data?.spoken_languages[0]
                  ? `${detailTvSeries?.data?.spoken_languages[0]?.name} / ${detailTvSeries?.data?.spoken_languages[0]?.english_name}`
                  : `${detailTvSeries?.data?.original_language}`
              } `}
              title={`Language`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvSeriesByIdPage;
