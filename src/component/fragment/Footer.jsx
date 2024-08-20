import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-black text-gray-300 p-4 custom:flex custom:justify-center">
      <div className="w-full custom:w-4/5 md:w-3/5 lg:mt-6">
        {" "}
        <h1 className="text-center ml-1 tracking-wide text-base font-semibold lg:text-base lg:font-normal ">
          saya ucapkan terima kasih kepada <a href="http://">tmdb </a> karena
          telah menyediakan data movie secara gratis dalam demontrasi website
          ini , situs web ini dibat semata-mata untuk tujuan pembelajaran dan
          demontrasi ketrampilan saya sebagai developer. saya tidak bermaksud
          untuk melanggar hak cipta. <br /> pembuat server / data / seluruh api
          pada website ini yaitu
          <a
            className="font-bold"
            href="https://www.themoviedb.org/?language=id-ID"
          >
            &nbsp;&nbsp; tmdb&nbsp;&nbsp;
          </a>
          yang berarti seluruh data website ini terintergasi penuh dengan tmdb
        </h1>
        <h1 className="text-center ml-1 tracking-wide text-base font-semibold lg:text-base lg:font-normal">
          kunjungi lebih lanjut{" "}
          <a className="font-bold" href="https://usammuhazir.vercel.app/">
            developer
          </a>{" "}
          website ini
        </h1>
        <h1 className="text-2xl text-center mt-2">
          @ {new Date().getFullYear()}
        </h1>
      </div>
    </div>
  );
};

export default Footer;
