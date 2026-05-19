import { LinkIcon } from "@chakra-ui/icons";
import { FacebookIcon, InstagramIcon, TwiterIcon } from "./icon/SocialIcons";

export const Facebook = ({ href, className }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`${className || ""} text-slate-400 hover:text-indigo-400 transition-colors duration-200`}
    >
      <FacebookIcon height="1.5rem" width="1.5rem" />
    </a>
  );
};

export const HomeUrl = ({ href, className }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`${className || ""} text-slate-400 hover:text-indigo-400 transition-colors duration-200`}
    >
      <LinkIcon height="1.2rem" width="1.2rem" />
    </a>
  );
};

export const Instagram = ({ href, className }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`${className || ""} text-slate-400 hover:text-indigo-400 transition-colors duration-200`}
    >
      <InstagramIcon height="1.5rem" width="1.5rem" />
    </a>
  );
};

export const Twitter = ({ href, className }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`${className || ""} text-slate-400 hover:text-indigo-400 transition-colors duration-200`}
    >
      <TwiterIcon height="1.5rem" width="1.5rem" />
    </a>
  );
};
