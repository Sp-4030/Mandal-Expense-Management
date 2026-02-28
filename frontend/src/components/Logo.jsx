import React from "react";
import logo from "../assets/logo.svg";

function Logo() {
  return (
   <div className="sticky top-1/2 -translate-y-1/2 z-10 hidden sm:hidden md:flex justify-center pointer-events-none">
  <img
    src={logo}
    alt="Logo"
    className="
      w-[120px]
      sm:w-[160px]
      md:w-[220px]
      lg:w-[280px]
      xl:w-[320px]
      2xl:w-[380px]
      h-auto
      
    "
  />
</div>
  );
}

export default Logo;