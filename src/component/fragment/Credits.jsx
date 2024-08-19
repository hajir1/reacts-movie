import React from "react";
import { useSchemaHistory } from "../../state/Management";
import { Link } from "react-router-dom";
import Simple from "../element/Label";
import FormatDate from "../../libs/Formatdate";

const Credits = ({ detailCredits }) => {
  const { schemaHistory } = useSchemaHistory();
  return (
    <div className="flex flex-wrap gap-2 p-2 md:justify-evenly w-full ">
      {detailCredits?.data?.cast
        ?.sort((a, b) => {
          const data =
            schemaHistory === "movie_credits"
              ? new Date(b.release_date) - new Date(a.release_date)
              : new Date(b.first_air_date) - new Date(a.first_air_date);
          return data;
        })
        ?.map((credit) => (
          <Link
            to={`${
              schemaHistory === "movie_credits"
                ? `/movie/${credit?.id}`
                : `/tvseries/${credit?.id}`
            }`}
            key={credit?.credit_id}
            className="border-b-2 w-full border-b-slate-200 flex items-center justify-evenly md:w-[47%] md:gap-2 md:p-2 lg:w-[31%] lg:p-4"
          >
            <div className="relative"></div>
            <div className="w-4/5 flex flex-col items-center">
              <Simple
                type={`char`}
                title={`${
                  schemaHistory === "movie_credits"
                    ? credit?.title
                    : credit?.original_name
                }`}
                quote={credit?.character}
              ></Simple>
              <p className="text-center text-xs ml-1 mr-1 md:text-start w-full mt-4">
                {schemaHistory === "movie_credits"
                  ? FormatDate(credit?.release_date)
                  : FormatDate(credit?.first_air_date)}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Credits;
