import React from "react";

const Keyword = ({ datas, type }) => {
  const mappingKeyword =
    type === "movie" ? datas?.data?.keywords : datas?.data?.results;
  return (
    <div className="w-full flex justify-evenly gap-1 p-1 flex-wrap">
      {mappingKeyword?.length > 0 ? (
        mappingKeyword?.map((key) => (
          <div
            key={key?.id}
            className="py-1 border-slate-300 border-[1px] bg-gray-100 rounded-md mt-1  px-2"
          >
            <p className="ml-1 tracking-wide text-xs font-semibold inline-block lg:text-black lg:text-sm">
              {" "}
              {key?.name}
            </p>
          </div>
        ))
      ) : (
        <h1 className="ml-1 mt-2 mr-1 tracking-wide text-base font-semibold">
          no keyword have been added
        </h1>
      )}
    </div>
  );
};

export default Keyword;
