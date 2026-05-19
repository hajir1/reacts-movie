import { useEffect } from "react";
import Navbar from "../component/layouts/Navbar";
import { UseAPICharById } from "../services/API_DATA";
import { useParams, useLocation } from "react-router-dom";
import { BoxV2 } from "../component/layouts/BoxModel";
import { Skeletonv2 } from "../component/element/Skeleton";
import Breadcrumb from "../component/fragment/Breadcrumb";

const AllCharPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const isMovie = location.pathname.includes("/movie/");
  const type = isMovie ? "movie" : "tv";

  const charById = UseAPICharById(type, id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0b0f19] text-slate-100 pb-16">
      <Navbar />
      <Breadcrumb about={`All Characters - ${isMovie ? "Movie" : "TV Series"}`} />
      
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="w-full flex flex-col md:flex-row gap-8 justify-between">
          {/* Cast Column */}
          <div className="w-full md:w-1/2">
            {charById?.isLoading ? (
              <div className="flex flex-col mt-4">
                <div className="bg-slate-800/80 animate-pulse h-8 w-2/5 rounded mb-4"></div>
                <Skeletonv2 />
              </div>
            ) : (
              <BoxV2
                length={charById?.data?.cast?.length || 0}
                title="Cast / Pemeran"
                datas={charById?.data?.cast || []}
                type="cast"
              />
            )}
          </div>

          {/* Crew Column */}
          <div className="w-full md:w-1/2">
            {charById?.isLoading ? (
              <div className="flex flex-col mt-4">
                <div className="bg-slate-800/80 animate-pulse h-8 w-2/5 rounded mb-4"></div>
                <Skeletonv2 />
              </div>
            ) : (
              <BoxV2
                length={charById?.data?.crew?.length || 0}
                title="Crew / Kru"
                datas={charById?.data?.crew || []}
                type="crew"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCharPage;
