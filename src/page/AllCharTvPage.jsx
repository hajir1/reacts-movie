import React, { useEffect } from "react";
import Navbar from "../component/layouts/Navbar";
import { UseAPICharById } from "../services/API_DATA";
import { useParams } from "react-router-dom";
import { BoxV2 } from "../component/layouts/BoxModel";
import { Skeletonv2 } from "../component/element/Skeleton";
import Laman from "../component/fragment/Laman";

const AllCharTvPage = () => {
  const { id, name } = useParams();
  const charById = UseAPICharById("movie", id);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[]);

  return (
    <div className="w-full bg-gray-100">
      <Navbar />
      <Laman about={`all character tv`}/>
      <div className="w-full mt-4 lg:flex lg:justify-evenly">
        {charById?.isLoading ? (
          <div className="lg:flex lg:flex-col lg:w-1/2 lg:mt-10 lg:ml-6">
            <div className="ml-1 mt-1 mr-1 bg-gray-200 animate-pulse duration-100 transition-all h-8 w-2/5"></div>
            <Skeletonv2 />
          </div>
        ) : (
          <BoxV2
            length={charById?.data?.cast?.length}
            title={`Cast / Pemeran`}
            datas={charById.data?.cast}
            type={`cast`}
          />
        )}
        {charById?.isLoading ? (
          <div className="lg:flex lg:flex-col lg:w-1/2 lg:mt-10 lg:ml-6">
            <div className="ml-1 mt-1 mr-1 bg-gray-200 animate-pulse duration-100 transition-all h-8 w-2/5"></div>
            <Skeletonv2 />
          </div>
        ) : (
          <BoxV2
            length={charById?.data?.crew?.length}
            title={`Crew / Kru`}
            datas={charById?.data?.crew}
            type={`crew`}
          />
        )}
      </div>
    </div>
  );
};

export default AllCharTvPage;
