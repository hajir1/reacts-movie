import { useSchemaHistory } from "../../state/Management";
import { Link } from "react-router-dom";
import FormatDate from "../../libs/Formatdate";

const Credits = ({ detailCredits }) => {
  const { schemaHistory } = useSchemaHistory();
  return (
    <div className="flex flex-wrap gap-4 py-4 justify-start w-full">
      {detailCredits?.data?.cast ? (
        [...detailCredits.data.cast]
          .sort((a, b) => {
            const dateA = new Date(schemaHistory === "movie_credits" ? a.release_date : a.first_air_date);
            const dateB = new Date(schemaHistory === "movie_credits" ? b.release_date : b.first_air_date);
            const timeA = isNaN(dateA.getTime()) ? 0 : dateA.getTime();
            const timeB = isNaN(dateB.getTime()) ? 0 : dateB.getTime();
            return timeB - timeA;
          })
          .map((credit) => (
            <Link
              to={
                schemaHistory === "movie_credits"
                  ? `/movie/${credit?.id}`
                  : `/tvseries/${credit?.id}`
              }
              key={credit?.credit_id}
              className="w-full md:w-[48%] lg:w-[31%] flex flex-col justify-between p-4 rounded-xl border border-white/5 bg-slate-900/30 hover:border-indigo-500/30 hover:bg-white/5 transition-all group"
            >
              <div className="flex flex-col">
                <h3 className="font-bold text-sm text-slate-100 group-hover:text-indigo-400 transition-colors leading-snug">
                  {schemaHistory === "movie_credits"
                    ? credit?.title
                    : credit?.original_name}
                </h3>
                {credit?.character && (
                  <p className="text-xs text-slate-400 mt-1">
                    as <span className="text-indigo-400 font-medium">{credit?.character}</span>
                  </p>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-3 font-semibold">
                {schemaHistory === "movie_credits"
                  ? FormatDate(credit?.release_date)
                  : FormatDate(credit?.first_air_date)}
              </p>
            </Link>
          ))
      ) : null}
    </div>
  );
};

export default Credits;
