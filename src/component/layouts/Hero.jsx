import {
  CircularProgress,
  CircularProgressLabel,
  Spinner,
} from "@chakra-ui/react";
import FormatDate from "../../libs/Formatdate";
import { getTmdbImageUrl } from "../../libs/imageHelper";

const Hero = ({ datas, type }) => {
  return (
    <>
      {datas?.isLoading ? (
        <div className="w-full min-h-[50vh] flex flex-col items-center justify-center bg-[#0b0f19] text-slate-100">
          <Spinner width="4rem" height="4rem" speed="0.8s" color="indigo.500" thickness="4px" />
          <h1 className="mt-4 font-semibold text-lg text-slate-400 animate-pulse">
            Loading Details...
          </h1>
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(11, 15, 25, 0.8) 0%, rgba(11, 15, 25, 0.95) 100%), url(${getTmdbImageUrl(datas?.data?.backdrop_path, "original")})`,
            backgroundPosition: "center top",
            backgroundSize: "cover",
          }}
          className="relative w-full p-6 flex flex-col md:flex-row gap-6 bg-no-repeat min-h-[30rem] lg:min-h-[38rem] items-center border-b border-white/5"
        >
          {/* Movie Poster */}
          <div className="shrink-0 w-2/3 custom:w-1/2 md:w-1/4 lg:w-1/5">
            <img
              className="w-full rounded-xl object-cover object-center img-soft-shadow border border-white/10"
              src={getTmdbImageUrl(datas?.data?.poster_path, "w500")}
              alt="poster"
            />
          </div>

          {/* Movie Metadata Details */}
          <div className="flex-1 w-full bg-slate-900/60 border border-white/5 backdrop-blur-md p-6 rounded-2xl md:bg-transparent md:border-none md:p-0">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-3">
                <CircularProgress
                  trackColor="white/10"
                  color="indigo.400"
                  size="3.5rem"
                  thickness="8px"
                  value={Math.round((datas.data?.vote_average || 0) * 10)}
                >
                  <CircularProgressLabel className="font-bold text-white text-xs">
                    {Math.round((datas.data?.vote_average || 0) * 10)}%
                  </CircularProgressLabel>
                </CircularProgress>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-300 w-20 leading-tight">
                  User Score
                </p>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {type === "tv" ? datas?.data?.name : datas?.data?.title}
              </h1>
            </div>

            <div className="mt-4 flex flex-col gap-1 text-sm text-slate-300">
              <span className="font-medium text-indigo-400">
                {type === "movie"
                  ? FormatDate(datas?.data?.release_date)
                  : FormatDate(datas?.data?.first_air_date)}
              </span>
              <ul className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-slate-400 text-xs font-medium">
                {datas?.data?.genres?.map((genre) => (
                  <li key={genre?.id} className="bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    {genre?.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tagline & Overview */}
            <div className="mt-6 border-t border-white/10 pt-4 md:border-none md:pt-0">
              {datas?.data?.tagline && (
                <p className="italic text-base md:text-lg text-slate-300 font-medium mb-3">
                  &ldquo;{datas?.data?.tagline}&rdquo;
                </p>
              )}
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
                Overview
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
                {datas?.data?.overview || "No overview available."}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
