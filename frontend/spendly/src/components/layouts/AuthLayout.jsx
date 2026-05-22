import React from "react";
import Card from "../../assets/images/grainy-background.jpg";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg text-text font-medium">Spendly</h2>
        {children}
      </div>

      <div className="h-screen w-[80vw]">
        <img className="h-full w-full" src={Card} alt="" />
      </div>
    </div>
  );
};

export default AuthLayout;
