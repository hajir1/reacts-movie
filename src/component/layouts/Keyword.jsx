const Keyword = ({ datas, type }) => {
  const mappingKeyword =
    type === "movie" ? datas?.data?.keywords : datas?.data?.results;
  return (
    <div className="w-full flex flex-wrap gap-1.5 p-2 justify-start">
      {mappingKeyword?.length > 0 ? (
        mappingKeyword?.map((key) => (
          <div
            key={key?.id}
            className="py-1 border border-white/5 bg-white/5 rounded-md px-2.5 hover:bg-white/10 transition-colors cursor-default"
          >
            <p className="tracking-wide text-xs font-medium text-slate-300">
              {key?.name}
            </p>
          </div>
        ))
      ) : (
        <p className="text-xs text-slate-500 font-medium p-2">
          no keywords added
        </p>
      )}
    </div>
  );
};

export default Keyword;
