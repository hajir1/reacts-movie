import { useRouteError, Link } from "react-router-dom";
import Navbar from "../component/layouts/Navbar";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="w-full min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between">
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-6 text-center mt-12">
          <div className="max-w-md bg-slate-900/60 border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-md">
            <h1 className="text-4xl font-extrabold text-red-500 mb-4 tracking-tight">Oops!</h1>
            <p className="text-base text-slate-300 mb-4 leading-relaxed">
              Something went wrong while rendering this page.
            </p>
            <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-3.5 rounded-xl mb-6 font-mono text-xs break-all">
              {error?.statusText || error?.message || "Unknown rendering exception"}
            </div>
            <Link
              to="/"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
