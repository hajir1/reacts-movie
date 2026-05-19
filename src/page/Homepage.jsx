import {
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
    if (search.trim().length > 0) {
      navigate(`/search/${search.trim()}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />
        
        {/* Hero Slider Section */}
        <div className="w-full overflow-hidden mt-1 relative">
          <SliderV1 datas={datasTrendingAll} />
        </div>

        {/* Global Search Bar */}
        <div className="w-full flex justify-center p-6 z-30 -mt-8 relative max-w-4xl mx-auto">
          {datasTrendingAll?.isLoading ? (
            <div className="bg-slate-800/80 h-12 w-full rounded-xl animate-pulse"></div>
          ) : (
            <form 
              onSubmit={handleSearch} 
              className="relative w-full bg-slate-900/90 border border-white/10 rounded-xl shadow-2xl focus-within:border-indigo-500/50 transition-all duration-200"
            >
              <input
                value={search}
                required
                onChange={(e) => setSearch(e.target.value)}
                className="w-full outline-none pl-12 pr-12 bg-transparent text-white placeholder:text-slate-400 py-3.5 rounded-xl text-sm md:text-base"
                placeholder="Search movies, TV shows, or people..."
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <SearchIcon fill="#818cf8" />
              </div>
              {search?.trim().length > 0 && (
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all"
                >
                  Search
                </button>
              )}
            </form>
          )}
        </div>

        {/* Trending Sections */}
        <div className="max-w-6xl mx-auto px-4 mt-8 flex flex-col gap-8">
          <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-4 lg:p-6 backdrop-blur-sm">
            <BoxV1
              datas={datasTrendingMovies}
              title="Trending Movies"
              valueTrend={valueTrendMovie}
              setValueTrend={setValueTrendMovie}
              type="movie"
              schema="trending"
            />
          </div>

          <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-4 lg:p-6 backdrop-blur-sm">
            <BoxV1
              datas={datasTrendingTv}
              title="Trending TV Series"
              setValueTrend={setValueTrendTv}
              valueTrend={valueTrendTv}
              type="tv"
              schema="trending"
            />
          </div>
        </div>

        {/* Popular Section with Dynamic Poster Backdrop */}
        <div className="relative overflow-x-hidden p-6 mt-12 min-h-[24rem] flex flex-col justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 filter blur-sm transition-all duration-500"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(11, 15, 25, 0.9), rgba(11, 15, 25, 0.95)), url(https://image.tmdb.org/t/p/w500/${popularImages})`,
            }}
          ></div>

          <div className="relative max-w-6xl mx-auto w-full z-10">
            <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 lg:p-6 backdrop-blur-md">
              <BoxV1
                datas={datasPopular}
                title="Currently Popular"
                schema="popular"
                valueTrend={popularType}
                setValueTrend={setPopularType}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
