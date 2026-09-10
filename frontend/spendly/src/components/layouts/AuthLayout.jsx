import React from "react";
import Card from "../../assets/images/background02.jpg";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-full md:w-[50vw] px-12 pt-8 pb-12">
        <h2 className="text-lg text-text font-medium">Spendly</h2>
        {children}
      </div>

      <div className="hidden md:block h-full w-[50vw]">
        <img className="h-full w-full object-cover" src={Card} alt="" />
      </div>
    </div>
  );
};

export default AuthLayout;
