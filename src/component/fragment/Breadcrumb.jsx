import { Link } from "react-router-dom";

const Breadcrumb = ({ about }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-6">
      <div className="flex items-center gap-2.5 py-2.5 px-4 bg-slate-900/40 border border-white/5 rounded-xl backdrop-blur-md text-sm font-semibold text-slate-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.2rem"
          height="1.2rem"
          viewBox="0 0 24 24"
          className="text-indigo-400 shrink-0"
        >
          <path
            fill="currentColor"
            d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81zM12 3L2 12h3v8h6v-6h2v6h6v-8h3z"
          />
        </svg>
        <Link to="/" className="hover:text-slate-200 transition-colors">
          Home
        </Link>
        <span className="text-slate-700 font-bold select-none">&gt;</span>
        <span className="text-slate-200 truncate">
          {about}
        </span>
      </div>
    </div>
  );
};

export default Breadcrumb;
