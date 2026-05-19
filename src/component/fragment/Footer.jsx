import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#070a10] border-t border-white/5 py-12 px-6 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="max-w-md">
          <h2 className="text-lg font-bold text-white mb-2">
            React<span className="text-gradient">Movie</span>
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Situs demonstrasi data film terintegrasi penuh dengan TMDB API. 
            Dibuat untuk tujuan pembelajaran, portofolio, dan demonstrasi skill pengembangan front-end.
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-3">
          <p className="text-xs text-slate-500">
            Seluruh data, metadata, dan gambar disediakan oleh{" "}
            <a 
              href="https://www.themoviedb.org/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-indigo-400 hover:text-indigo-300 font-semibold underline transition-colors"
            >
              TMDB
            </a>.
          </p>
          <p className="text-xs text-slate-500">
            Developer:{" "}
            <a 
              href="https://usammuhazir.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-purple-400 hover:text-purple-300 font-semibold underline transition-colors"
            >
              Usam Muhazir
            </a>
          </p>
          <p className="text-xs text-slate-600 mt-2">
            &copy; {new Date().getFullYear()} ReactMovie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
