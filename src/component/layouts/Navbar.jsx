import { Link } from "react-router-dom";
import FilmIcon from "../element/icon/FilmIcon";

const Navbar = () => {
  return (
    <div className="w-full sticky top-0 z-50 flex items-center justify-between bg-[#0b0f19]/80 backdrop-blur-md border-b border-white/5 navbar-padding">
      <div className="flex items-center justify-start w-full">
        <div className="mr-3">
          <FilmIcon fill="#818cf8" />
        </div>
        <Link to="/" className="flex items-center tracking-wider hover:opacity-90 transition-opacity">
          <span className="font-bold text-2xl text-white">React</span>
          <span className="font-bold text-2xl text-gradient ml-1">Movie</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
