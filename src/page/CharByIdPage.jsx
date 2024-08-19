import React, { useEffect, useState } from "react";
import Navbar from "../component/layouts/Navbar";
import {
  UseAPIById,
  UseAPICreditPerson,
  UseAPISosmedById,
} from "../services/API_DATA";
import { Link, useParams } from "react-router-dom";
import Simple from "../component/element/Label";
import FormatDate from "../libs/Formatdate";

import { Spinner } from "@chakra-ui/react";
import { Skeletonv3 } from "../component/element/Skeleton";
import Credits from "../component/fragment/Credits";
import { useSchemaHistory } from "../state/Management";
import {
  Facebook,
  HomeUrl,
  Instagram,
  Twitter,
} from "../component/element/Sosmed";
import Laman from "../component/fragment/Laman";

const CharByIdPage = () => {
  const { id } = useParams();
  const { schemaHistory, setSchemaHistory } = useSchemaHistory();
  const detailPerson = UseAPIById("person", id);
  const detailSosmed = UseAPISosmedById("person", id);
  const detailCredits = UseAPICreditPerson(schemaHistory, id);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[]);

  return (
    <div className="w-full bg-gray-100">
      <Navbar />
      <Laman about={`character | ${detailPerson?.data?.name}`}/>
      <div className="w-full flex flex-col items-center p-2 ">
        {detailPerson?.isLoading ? (
          <div className="w-full h-screen flex-col flex items-center justify-center">
            {" "}
            <Spinner width={`10rem`} speed="0.65s" height={`10rem`} />
            <h1 className="text-slate-900 font-semibold font-sans pt-2 text-center text-xl custom:text-black lg:text-gray-200 lg:pt-0 ">
              Loading...
            </h1>
          </div>
        ) : (
          <div className="relative w-full custom:w-5/6 md:w-full md:flex-row md:flex md:justify-center">
            <div className="w-full flex flex-col items-center md:w-1/3 md:p-2 lg:w-1/4 ">
              {" "}
              <img
                className="w-1/2 lg:w-full h-[14rem] custom:h-[16rem] md:h-[20rem] md:w-full lg:h-[30rem] object-cover object-center rounded-md inset-0 shadow-lg"
                src={`${
                  detailPerson?.data?.profile_path !== null
                    ? `https://image.tmdb.org/t/p/w500/${detailPerson?.data?.profile_path}`
                    : "/people.jpeg"
                }`}
                alt=""
              />
              <h1 className="text-4xl font-semibold mt-2 md:text-center md:text-2xl ">
                {detailPerson?.data?.name}
              </h1>
              <div className="w-full flex justify-center items-center gap-2 mb-6 mt-4 lg:mt-2">
                <Instagram
                  className={`${
                    detailSosmed?.data?.instagram_id === null ||
                    detailSosmed?.data?.instagram_id === ""
                      ? "hidden"
                      : ""
                  } `}
                  href={`https://www.instagram.com/${detailSosmed?.data?.instagram_id}`}
                />
                <Twitter
                  className={`${
                    detailSosmed?.data?.twitter_id === null ||
                    detailSosmed?.data?.twitter_id === ""
                      ? "hidden"
                      : ""
                  } 
                  }`}
                  href={`https://www.twitter.com/${detailSosmed?.data?.twitter_id}`}
                />
                <Facebook
                  className={`${
                    detailSosmed?.data?.facebook_id === null ||
                    detailSosmed?.data?.facebook_id === ""
                      ? "hidden"
                      : ""
                  }`}
                  href={`https://www.facebook.com/${detailSosmed?.data?.facebook_id}`}
                />

                <HomeUrl
                  className={`${
                    detailPerson?.data?.homepage === null ||
                    detailSosmed?.data?.homepage === ""
                      ? "hidden"
                      : ""
                  }`}
                  href={`${detailPerson?.data?.homepage}`}
                />
              </div>
            </div>
            <div className="w-full p-1 md:w-3/5 md:mt-2 ">
              <Simple
                title={`Gender`}
                quote={`${detailPerson?.data?.gender === 1 ? "Female" : ""} 
              ${detailPerson?.data?.gender === 2 ? "Male" : ""}`}
              />
              <Simple
                title={`Birthday`}
                quote={`${
                  detailPerson?.data?.birthday === null
                    ? "no birthday have been added"
                    : `${FormatDate(detailPerson?.data?.birthday)}`
                }`}
              />
              <Simple
                title={`Place of Birthday`}
                quote={`${
                  detailPerson?.data?.place_of_birth === null
                    ? "no place of birthday have been added"
                    : `${detailPerson?.data?.place_of_birth}`
                }`}
              />
              <Simple
                title={`Biography`}
                quote={`${
                  detailPerson?.data?.biography === ""
                    ? "no biography have been added"
                    : `${
                        showMore
                          ? detailPerson?.data?.biography
                          : detailPerson?.data?.biography?.slice(0, 300)
                      }`
                }`}
              />
              <p
                className={`${
                  detailPerson?.data?.biography === "" && "hidden"
                } ${
                  detailPerson?.data?.biography?.length < 300 && "hidden"
                } font-semibold text-sm mt-3 `}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "show less .." : "show more..."}
              </p>
              <p className="mt-10 mb-2 mr-1 tracking-wide text-sm font-bold lg:text-base lg:font-semibold lg:text-black">
                Also Known As
              </p>
              <ul className="flex flex-wrap gap-1">
                {detailPerson?.data?.also_known_as?.length > 0
                  ? detailPerson?.data?.also_known_as?.map((genre) => (
                      <li
                        key={Math.random(0, 12389123) * 10}
                        className="text-sm text-slate-900 custom:text-black lg:text-base lg:ml-3 lg:font-semibold lg:tracking-wider"
                      >
                        {genre}
                      </li>
                    ))
                  : "no have been added"}
              </ul>
            </div>
          </div>
        )}

        <div className="w-full">
          {detailCredits?.isLoading ? (
            <div className="lg:flex lg:flex-col lg:w-1/2 lg:mt-10 lg:ml-6">
              <div className="ml-1 mt-1 mr-1 bg-gray-200 animate-pulse duration-100 transition-all h-8 w-1/4"></div>
              <Skeletonv3 />
            </div>
          ) : (
            <div className="flex flex-col items-center w-full ">
              {" "}
              <div className="w-full flex items-center justify-between custom:w-11/12 ">
                {" "}
                <div className="mt-10 pl-2 font-sans font-bold tracking-normal text-black text-base lg:text-2xl">
                  History
                </div>
                <select
                  className={` py-2 border rounded-md mt-10 mr-8 ml-2 pr-5 border-slate-300 pl-2 outline-none bg-gray-100 `}
                  value={schemaHistory}
                  onChange={(e) => setSchemaHistory(e.target.value)}
                >
                  <option value={`movie_credits`}>Movie</option>
                  <option value={`tv_credits`}>Tv</option>
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
