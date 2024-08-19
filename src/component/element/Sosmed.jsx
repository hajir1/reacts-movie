import { LinkIcon } from "@chakra-ui/icons";
import { FacebookIcon, InstagramIcon, TwiterIcon } from "./icon/SosmedIcon";

export const Facebook = ({ href, className }) => {
  return (
    <a href={href} className={className}>
      {" "}
      <FacebookIcon height={`1.6rem`} width={`1.6rem`} />
    </a>
  );
};

export const HomeUrl = ({ href, className }) => {
  return (
    <a href={href} className={className}>
      {" "}
      <LinkIcon height={`1.6rem`} width={`1.6rem`} />
    </a>
  );
};
export const Instagram = ({ href, className }) => {
  return (
    <a className={className} href={href}>
      {" "}
      <InstagramIcon height={`1.6rem`} width={`1.6rem`} />
    </a>
  );
};
export const Twitter = ({ href, className }) => {
  return (
    <a href={href} className={className}>
      <TwiterIcon height={`1.6rem`} width={`1.6rem`} />
    </a>
  );
};
