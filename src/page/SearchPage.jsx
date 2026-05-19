import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/layouts/Navbar";
import { useSearch } from "../state/Management";
import { SearchIcon } from "@chakra-ui/icons";
import { UseAPISearch, UseAPISearchTv } from "../services/API_DATA";
import FormatDate from "../libs/Formatdate";
import Breadcrumb from "../component/fragment/Breadcrumb";
import { getTmdbImageUrl } from "../libs/imageHelper";

const ComponentSearch = ({ datas, title, type }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-10">
      <div className="font-bold tracking-tight text-white text-xl lg:text-2xl mb-4">
        {title}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {datas?.data?.results?.length > 0 ? (
          [...datas.data.results]
            .sort((a, b) => {
              const dateA = new Date(a?.release_date || a?.first_air_date);
              const dateB = new Date(b?.release_date || b?.first_air_date);
              const timeA = isNaN(dateA.getTime()) ? 0 : dateA.getTime();
              const timeB = isNaN(dateB.getTime()) ? 0 : dateB.getTime();
              return timeB - timeA;
            })
            .map((data) => (
              <Link
                to={type === "tv" ? `/tvseries/${data?.id}` : `/movie/${data?.id}`}
                className="p-2 flex items-center gap-4 rounded-xl hover:bg-white/5 transition-colors border border-white/5 bg-slate-900/20 backdrop-blur-sm"
                key={data?.id}
              >
                <div className="relative shrink-0">
                  <img
                    src={getTmdbImageUrl(data?.backdrop_path, "w300")}
                    className="w-16 h-16 rounded-lg object-cover object-center"
                    alt="backdrop"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-lg pointer-events-none card-inset-shadow" />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <h1 className="text-sm font-bold text-slate-100 truncate">
                    {data?.title || data?.name}
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    {FormatDate(data?.release_date || data?.first_air_date)} &bull;{" "}
                    <span className="text-indigo-400 font-semibold">
                      {Math.round((data?.vote_average || 0) * 10)}% Match
                    </span>
                  </p>
                </div>
              </Link>
            ))
        ) : (
          <h1 className="text-sm text-slate-400 font-semibold col-span-2">
            No results found
          </h1>
        )}
      </div>
    </div>
  );
};

const SearchPage = () => {
  const { key } = useParams();
  const { search, setSearch } = useSearch();
  const SearchData = UseAPISearch(key);
  const SearchDataTv = UseAPISearchTv(key);
  const navigate = useNavigate();

  useEffect(() => {
    if (key) {
      setSearch(key);
    }
  }, [key, setSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim().length > 0) {
      navigate(`/search/${search.trim()}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0f19] text-slate-100 pb-16">
      <Navbar />
      <Breadcrumb about={`search | ${key}`} />
      
      {/* Search Input Container */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <form 
          onSubmit={handleSubmit} 
          className="relative w-full flex items-center bg-slate-900/60 border border-white/10 rounded-xl focus-within:border-indigo-500/50 transition-all duration-200"
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <SearchIcon className="text-slate-400" />
          </div>
          <input
            required
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none pl-12 pr-4 bg-transparent text-slate-100 placeholder:text-slate-500 py-3.5 text-base rounded-xl"
            value={search}
            placeholder="Search for movies or TV series..."
          />
        </form>
      </div>

      {/* Results */}
      <ComponentSearch datas={SearchData} title="Movies" type="movie" />
      <ComponentSearch datas={SearchDataTv} title="TV Series" type="tv" />
    </div>
  );
};

export default SearchPage;
