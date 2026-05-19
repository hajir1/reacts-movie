import { usePopularImages, usePopularType } from "../../state/Management";
import StarsIcon from "../element/icon/StarsIcon";
import { Link } from "react-router-dom";
import FormatDate from "../../libs/Formatdate";
import { SkeletonV1 } from "../element/Skeleton";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { getTmdbImageUrl, getProfileImageUrl } from "../../libs/imageHelper";

// BoxV1: General horizontal movie/tv card slider
export const BoxV1 = ({
  datas,
  setValueTrend,
  valueTrend,
  title,
  type,
  schema,
}) => {
  const { setPopularImages } = usePopularImages();
  const { popularType } = usePopularType();

  return (
    <>
      {datas?.isLoading ? (
        <div className="h-16 w-full lg:h-24"></div>
      ) : (
        <div className="p-2 flex items-center justify-between lg:p-4 mt-6">
          <h1 className="pl-1 font-bold tracking-tight text-white text-xl lg:text-2xl">
            {title}
          </h1>
          <select
            className="py-1.5 border rounded-md mr-4 ml-2 pr-8 border-white/10 pl-3 outline-none bg-slate-900/80 text-slate-100 text-sm focus:border-indigo-500 transition-colors cursor-pointer"
            value={valueTrend}
            onChange={(e) => setValueTrend(e.target.value)}
          >
            <option className="bg-[#0b0f19]" value={schema === "popular" ? "movie" : "day"}>
              {schema === "popular" ? "Movie" : "Today"}
            </option>
            <option className="bg-[#0b0f19]" value={schema === "popular" ? "tv" : "week"}>
              {schema === "popular" ? "Tv Series" : "This Week"}
            </option>
            <option
              className={`${schema === "trending" ? "hidden" : "bg-[#0b0f19]"}`}
              value="person"
            >
              Person
            </option>
          </select>
        </div>
      )}
      {!datas?.isLoading ? (
        <div className="lg:p-1 flex overflow-x-auto gap-[0.75rem] pb-4">
          {datas?.data?.results?.map((data) => (
            <Link
              to={
                (schema === "popular" && popularType === "tv") ||
                (schema === "trending" && type === "tv")
                  ? `/tvseries/${data?.id}`
                  : (schema === "popular" && popularType === "movie") ||
                    (schema === "trending" && type === "movie")
                  ? `/movie/${data?.id}`
                  : `/char/${data?.id}`
              }
              key={data?.id}
              className="w-[45%] rounded-lg shrink-0 p-1 custom:w-1/3 md:w-1/4 lg:w-1/6 relative group transition-all duration-200"
              onClick={() => setPopularImages(data?.poster_path)}
            >
              <div className="relative w-full h-[15rem] lg:h-[18rem] overflow-hidden rounded-md">
                <img
                  className="object-cover rounded-md object-center w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                  src={
                    schema === "popular" && popularType === "person"
                      ? getProfileImageUrl(data?.profile_path, "w300")
                      : getTmdbImageUrl(data?.poster_path, "w300")
                  }
                  alt="poster"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-md pointer-events-none card-inset-shadow" />
                
                {!(popularType === "person" && schema === "popular") && (
                  <div className="flex justify-center items-center absolute gap-1.5 bottom-2 left-2 bg-black/60 backdrop-blur-md rounded px-2 py-0.5 text-xs text-white">
                    <StarsIcon wdth="w-3 h-3" />
                    {parseFloat(data?.vote_average || 0).toFixed(1)}
                  </div>
                )}
              </div>
              <h6 className="ml-1 mt-2 mr-1 tracking-wide text-sm font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
                {schema === "trending" && type === "movie" && data?.title}
                {schema === "trending" && type === "tv" && data?.name}
                {schema === "popular" && popularType === "movie" && data?.title}
                {schema === "popular" && popularType === "tv" && data?.name}
                {schema === "popular" && popularType === "person" && data?.name}
              </h6>
              <p className="ml-1 tracking-wide text-xs text-slate-400 mt-0.5">
                {schema === "trending" && type === "movie" && FormatDate(data?.release_date)}
                {schema === "trending" && type === "tv" && FormatDate(data?.first_air_date)}
                {schema === "popular" && popularType === "movie" && FormatDate(data?.release_date)}
                {schema === "popular" && popularType === "tv" && FormatDate(data?.first_air_date)}
                {schema === "popular" && popularType === "person" && data?.known_for_department}
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

// BoxV2: Full list of cast/crew inside credits pages
export const BoxV2 = ({ datas, title, length, type }) => {
  return (
    <div className="lg:flex lg:flex-col lg:w-1/2">
      <h1 className="text-xl font-bold mt-8 text-slate-100 pl-2 lg:text-2xl lg:ml-5">
        {title} &nbsp;&nbsp;
        <span className="font-light text-slate-400">{length}</span>
      </h1>
      <div className="flex flex-col gap-1.5 mt-4 w-full">
        {datas?.map((char) => (
          <Link
            to={`/char/${char?.id}`}
            className="w-full p-2 justify-start flex items-center gap-4 rounded-lg hover:bg-white/5 transition-colors"
            key={char?.credit_id || char?.id}
          >
            <div className="relative shrink-0">
              <img
                src={getProfileImageUrl(char?.profile_path, "w300")}
                className="w-14 h-14 rounded-md object-cover object-center lg:w-16 lg:h-16"
                alt="profile"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-md pointer-events-none card-inset-shadow" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-bold text-slate-100">
                {char?.name}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                {type === "cast" ? char?.character : char?.job}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// BoxV3: Top cast list on details page
export const BoxV3 = ({ datas, type }) => {
  return (
    <div className="flex gap-4 overflow-x-auto mt-4 p-2">
      {datas?.data?.cast?.length > 0 ? (
        <>
          {datas?.data?.cast?.slice(0, 9)?.map((char) => (
            <Link
              to={`/char/${char?.id}`}
              key={char?.id}
              className="shrink-0 w-2/5 custom:w-1/4 lg:w-1/6 group"
            >
              <div className="relative rounded-md overflow-hidden">
                <img
                  className="object-cover rounded-md object-center w-full h-[12rem] opacity-95 group-hover:scale-105 transition-transform duration-200"
                  src={getProfileImageUrl(char?.profile_path, "w300")}
                  alt="cast"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-md pointer-events-none card-inset-shadow" />
              </div>
              <h1 className="ml-1 mt-2 text-sm font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
                {char?.name}
              </h1>
              <p className="ml-1 text-xs text-slate-400 line-clamp-1">
                {char?.character}
              </p>
            </Link>
          ))}
          {datas?.data?.cast?.length >= 19 && (
            <Link
              to={
                type === "movie"
                  ? `/movie/char/${datas?.data?.id}`
                  : `/tvseries/char/${datas?.data?.id}`
              }
              className="flex items-center flex-col justify-center shrink-0 w-24 hover:text-indigo-400 transition-colors"
            >
              <h1 className="text-sm font-bold text-slate-200 text-center mb-1">
                See More
              </h1>
              <ArrowForwardIcon w={6} h={6} className="text-slate-300" />
            </Link>
          )}
        </>
      ) : (
        <h1 className="text-center w-full mt-2 text-sm text-slate-400 font-semibold">
          no characters have been added
        </h1>
      )}
    </div>
  );
};

// BoxV4: Recommendations horizontal cards
export const BoxV4 = ({ datas, type }) => {
  return (
    <div className="flex overflow-x-auto gap-4 p-2 mt-4">
      {datas?.data?.results?.length > 0 ? (
        datas?.data?.results?.map((recomendation) => (
          <Link
            to={type === "tv" ? `/tvseries/${recomendation?.id}` : `/movie/${recomendation?.id}`}
            key={recomendation?.id}
            className="shrink-0 w-2/3 rounded-md custom:w-2/5 lg:w-[30%] group"
          >
            <div className="relative overflow-hidden rounded-md">
              <img
                src={getTmdbImageUrl(recomendation?.backdrop_path, "w300")}
                className="w-full h-[10rem] object-cover object-center rounded-md opacity-95 group-hover:scale-105 transition-transform duration-200"
                alt="recommendation"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-md pointer-events-none card-inset-shadow" />
            </div>
            <div className="flex justify-between items-start mt-2 px-1">
              <div className="w-[80%]">
                <h1 className="text-sm font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
                  {type === "movie" ? recomendation?.title : recomendation?.name}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  {type === "movie"
                    ? FormatDate(recomendation?.release_date)
                    : FormatDate(recomendation?.first_air_date)}
                </p>
              </div>
              <p className="text-xs font-bold text-slate-300 bg-white/5 rounded px-1.5 py-0.5">
                {Math.round((recomendation?.vote_average || 0) * 10)}%
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-center w-full mt-2 text-sm text-slate-400 font-semibold">
          no recomendations have been added
        </h1>
      )}
    </div>
  );
};

// BoxV5: Trailer/Video list
export const BoxV5 = ({ datas }) => {
  return (
    <div className="flex flex-col gap-2 mt-2 pl-2">
      {datas?.data?.results?.length > 0 ? (
        datas?.data?.results?.map((video) => (
          <div key={video?.id} className="w-full">
            <a
              className={`inline-block py-1 hover:pl-2 transition-all ${
                video?.site === "YouTube"
                  ? "border-b border-indigo-500 text-indigo-400 hover:text-indigo-300"
                  : "text-slate-300 border-b border-slate-700 hover:text-white"
              } text-sm font-semibold`}
              href={video?.site === "YouTube" ? `https://www.youtube.com/watch?v=${video?.key}` : "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {video?.name} &rarr;
            </a>
          </div>
        ))
      ) : (
        <h1 className="text-sm text-slate-400 font-semibold">
          no videos have been added
        </h1>
      )}
    </div>
  );
};
