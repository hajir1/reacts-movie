import { useEffect } from "react";
import Navbar from "../component/layouts/Navbar";
import {
  UseAPIById,
  UseAPICharById,
  UseAPIKeywordById,
  UseAPIRecomendationById,
  UseAPISosmedById,
  UseAPIVideo,
} from "../services/API_DATA";
import { useParams } from "react-router-dom";

import Hero from "../component/layouts/Hero";
import { BoxV3, BoxV4, BoxV5 } from "../component/layouts/BoxModel";
import Keyword from "../component/layouts/Keyword";
import {
  Facebook,
  HomeUrl,
  Instagram,
  Twitter,
} from "../component/element/SocialLinks";
import Breadcrumb from "../component/fragment/Breadcrumb";
import MetadataItem from "../component/element/MetadataItem";

const TvSeriesByIdPage = () => {
  const { id } = useParams();
  const detailTvSeries = UseAPIById("tv", id);
  const detailChar = UseAPICharById("tv", id);
  const detailRecomendation = UseAPIRecomendationById("tv", id);
  const detailKeyword = UseAPIKeywordById("tv", id);
  const detailSosmed = UseAPISosmedById("tv", id);
  const detailVideo = UseAPIVideo("tv", id);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full">
      <Navbar />
      <Breadcrumb about={`tv series | ${detailTvSeries?.data?.name}`} />
      <Hero datas={detailTvSeries} type={`tv`} />
      <div className="w-full lg:flex">
        {" "}
        <div className="w-full lg:w-3/4">
          <div
            className={`${
              detailChar?.isLoading && detailTvSeries?.isLoading && "hidden"
            } lg:p-4`}
          >
            <div className="mt-10 pl-2 font-sans font-bold tracking-normal text-slate-100 text-xl lg:text-2xl">
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
            <div className="mt-10 pl-2 font-sans font-bold tracking-normal text-slate-100 text-xl lg:text-2xl">
              Recomendations
            </div>
            <BoxV4 type={`tv`} datas={detailRecomendation} />
          </div>
          <div
            className={`${
              detailVideo?.isLoading && detailTvSeries?.isLoading && "hidden"
            } w-full my-2 p-2 `}
          >
            <div className="mt-2 pl-2 font-sans font-bold tracking-normal text-slate-100 text-xl lg:text-2xl">
              Video
            </div>
            <BoxV5 type={`tv`} datas={detailVideo} />
          </div>
        </div>
        <div
          className={`${
            detailKeyword?.isLoading && detailTvSeries?.isLoading && "hidden"
          } w-full lg:w-[23%] custom:w-4/5 p-4 lg:bg-slate-900/30 lg:border-l lg:border-white/5`}
        >
          <div className="mt-10 pl-2 font-sans font-bold tracking-normal text-slate-100 text-xl lg:text-2xl">
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
            <MetadataItem
              quote={`${detailTvSeries?.data?.original_name}`}
              title={`Original Name`}
            />
            <MetadataItem
              quote={`${detailTvSeries?.data?.seasons[0]?.episode_count} Season`}
              title={`Season`}
            />
            <MetadataItem
              quote={`${detailTvSeries?.data?.status}`}
              title={`Status`}
            />
            <MetadataItem
              quote={`${
                detailTvSeries?.data?.next_episode_to_air?.name
                  ? detailTvSeries?.data?.next_episode_to_air?.name
                  : "no have been next episode added"
              }`}
              title={`Next Episode`}
            />
            <MetadataItem
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
