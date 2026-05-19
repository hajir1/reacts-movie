import { useEffect, useState } from "react";
import Navbar from "../component/layouts/Navbar";
import {
  UseAPIById,
  UseAPICreditPerson,
  UseAPISosmedById,
} from "../services/API_DATA";
import { useParams } from "react-router-dom";
import MetadataItem from "../component/element/MetadataItem";
import FormatDate from "../libs/Formatdate";
import { getProfileImageUrl } from "../libs/imageHelper";

import { Spinner } from "@chakra-ui/react";
import { Skeletonv3 } from "../component/element/Skeleton";
import Credits from "../component/fragment/Credits";
import { useSchemaHistory } from "../state/Management";
import {
  Facebook,
  HomeUrl,
  Instagram,
  Twitter,
} from "../component/element/SocialLinks";
import Breadcrumb from "../component/fragment/Breadcrumb";

const CharByIdPage = () => {
  const { id } = useParams();
  const { schemaHistory, setSchemaHistory } = useSchemaHistory();
  const detailPerson = UseAPIById("person", id);
  const detailSosmed = UseAPISosmedById("person", id);
  const detailCredits = UseAPICreditPerson(schemaHistory, id);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0b0f19] text-slate-100 pb-16">
      <Navbar />
      <Breadcrumb about={`character | ${detailPerson?.data?.name}`} />
      
      <div className="max-w-6xl mx-auto px-4 mt-8 flex flex-col items-center">
        {detailPerson?.isLoading ? (
          <div className="w-full min-h-[60vh] flex flex-col items-center justify-center">
            <Spinner width="4rem" height="4rem" speed="0.8s" color="indigo.500" thickness="4px" />
            <h1 className="mt-4 font-semibold text-slate-400 animate-pulse">
              Loading Character Details...
            </h1>
          </div>
        ) : (
          <div className="w-full flex flex-col md:flex-row gap-8 items-start justify-center mt-4">
            {/* Profile Image & Social Media */}
            <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col items-center">
              <img
                className="w-2/3 md:w-full rounded-xl object-cover img-soft-shadow border border-white/10"
                src={getProfileImageUrl(detailPerson?.data?.profile_path, "w500")}
                alt={detailPerson?.data?.name}
              />
              <h1 className="text-3xl font-extrabold text-white mt-4 text-center leading-tight">
                {detailPerson?.data?.name}
              </h1>
              
              <div className="flex justify-center items-center gap-3.5 mt-4">
                {detailSosmed?.data?.instagram_id && (
                  <Instagram href={`https://www.instagram.com/${detailSosmed?.data?.instagram_id}`} />
                )}
                {detailSosmed?.data?.twitter_id && (
                  <Twitter href={`https://www.twitter.com/${detailSosmed?.data?.twitter_id}`} />
                )}
                {detailSosmed?.data?.facebook_id && (
                  <Facebook href={`https://www.facebook.com/${detailSosmed?.data?.facebook_id}`} />
                )}
                {detailPerson?.data?.homepage && (
                  <HomeUrl href={detailPerson?.data?.homepage} />
                )}
              </div>
            </div>

            {/* Profile Details Metadata */}
            <div className="flex-1 w-full bg-slate-900/30 border border-white/5 p-6 rounded-2xl backdrop-blur-sm">
              <MetadataItem
                title="Gender"
                quote={detailPerson?.data?.gender === 1 ? "Female" : "Male"}
              />
              
              <MetadataItem
                title="Birthday"
                quote={
                  detailPerson?.data?.birthday
                    ? FormatDate(detailPerson?.data?.birthday)
                    : "No birthday added"
                }
              />
              
              <MetadataItem
                title="Place of Birth"
                quote={detailPerson?.data?.place_of_birth || "No birthplace added"}
              />
              
              <div className="mb-4">
                <h1 className="tracking-wide text-sm font-bold text-slate-100 mb-1">
                  Biography
                </h1>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {detailPerson?.data?.biography
                    ? showMore
                      ? detailPerson?.data?.biography
                      : `${detailPerson?.data?.biography?.slice(0, 300)}...`
                    : "No biography added."}
                </p>
                {detailPerson?.data?.biography?.length > 300 && (
                  <button
                    className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors mt-2 cursor-pointer"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Show Less &larr;" : "Read More &rarr;"}
                  </button>
                )}
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <h1 className="tracking-wide text-sm font-bold text-slate-100 mb-2">
                  Also Known As
                </h1>
                <div className="flex flex-wrap gap-1.5">
                  {detailPerson?.data?.also_known_as?.length > 0 ? (
                    detailPerson?.data?.also_known_as?.map((name) => (
                      <span
                        key={name}
                        className="text-xs bg-white/5 border border-white/5 px-2.5 py-1 rounded text-slate-300"
                      >
                        {name}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500">None</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Credits History */}
        <div className="w-full mt-10">
          {detailCredits?.isLoading ? (
            <div className="lg:flex lg:flex-col lg:w-1/2 lg:mt-10">
              <div className="bg-slate-800/80 animate-pulse h-8 w-1/4 rounded mb-4"></div>
              <Skeletonv3 />
            </div>
          ) : (
            <div className="flex flex-col w-full">
              <div className="w-full flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <h2 className="font-bold tracking-tight text-white text-lg lg:text-2xl">
                  Acting / Production History
                </h2>
                <select
                  className="py-1.5 border rounded-md pr-8 border-white/10 pl-3 outline-none bg-slate-900/80 text-slate-100 text-sm focus:border-indigo-500 transition-colors cursor-pointer"
                  value={schemaHistory}
                  onChange={(e) => setSchemaHistory(e.target.value)}
                >
                  <option className="bg-[#0b0f19]" value="movie_credits">Movie</option>
                  <option className="bg-[#0b0f19]" value="tv_credits">TV Series</option>
                </select>
              </div>
              <Credits detailCredits={detailCredits} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharByIdPage;
