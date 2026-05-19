const MetadataItem = ({ title, quote, children, type }) => {
  if (!quote && !children) return null;

  return (
    <div className="mb-4">
      <h1
        className={`${
          type === "char" ? "text-center md:text-start w-full" : ""
        } tracking-wide text-sm font-bold text-slate-100 mb-0.5`}
      >
        {title}
      </h1>
      {children}
      <span
        className={`${
          type === "char" ? "text-center mr-1 md:text-start w-full" : ""
        } tracking-wide text-sm font-medium text-slate-400`}
      >
        {type === "char" ? `as ${quote}` : quote}
      </span>
    </div>
  );
};

export default MetadataItem;
