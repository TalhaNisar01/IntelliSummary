import React from "react";

import { logo2 } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3 mix-blend-multiply">
        <img
          src={logo2}
          alt="sumz_logo"
          className="w-52 object-contain cursor-pointer"
        />
      </nav>

      <h1 className="head_text">
        Unlock Insights with <br className="max-md:hidden" />
        <span className="blue_gradient ">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Elevate your reading experience with Insightful, an innovative,
        open-source tool that distills complex articles into concise and
        digestible summaries.
      </h2>
    </header>
  );
};

export default Hero;
