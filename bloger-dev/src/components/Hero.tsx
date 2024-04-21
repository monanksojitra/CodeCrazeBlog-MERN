import React from "react";

const Hero = () => {
  return (
    <div className="bg-white relative dark:bg-gray-900 pt-5 md:py-10 h-full">
      <div className="relative xl:container m-auto px-6 md:px-12 lg:px-20">
        <h1 className="sm:mx-auto sm:w-10/12 md:w-2/3 font-black text-blue-900 text-4xl text-center sm:text-5xl md:text-6xl lg:w-auto lg:text-left xl:text-7xl dark:text-white">
          Unlock Your Potential
          <br className="lg:block hidden" />{" "}
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
            with Expert Insights
          </span>
          .
        </h1>
        <div className="lg:flex">
          <div className="relative mt-8 md:mt-16 space-y-8 sm:w-10/12 md:w-2/3 lg:ml-0 sm:mx-auto text-center lg:text-left lg:mr-auto lg:w-7/12">
            <p className="sm:text-lg text-gray-700 dark:text-gray-300 lg:w-11/12">
              Dive into a world of knowledge and innovation. Our blog is your
              go-to source for the latest trends, expert advice, and actionable
              tips to elevate your skills and achieve your goals. Start your
              journey today and transform your life with our curated content.
            </p>

            <div className="dark:text-gray-300">
              🔥🌟
              <span>Other integrations :- </span>
              <a
                href="https://www.linkedin.com/in/monanksojitra/"
                className="font-semibold text-gray-700 dark:text-gray-200"
              >
                Linkedin ,
              </a>
              <a
                href="https://github.com/monanksojitra"
                className="font-semibold text-gray-700 dark:text-gray-200"
              >
                Github
              </a>
            </div>
            <div className="md:pt-12 flex max-xl:flex-wrap gap-6 lg:gap-12 justify-between grayscale lg:w-2/3">
              <img
                src="https://tailus.io/sources/blocks/tech-startup/preview/images/clients/airbnb.svg"
                className="h-8 sm:h-10 w-auto lg:h-12"
                alt=""
              />
              <img
                src="https://tailus.io/sources/blocks/tech-startup/preview/images/clients/ge.svg"
                className="h-8 sm:h-10 w-auto lg:h-12"
                alt=""
              />
              <img
                src="https://tailus.io/sources/blocks/tech-startup/preview/images/clients/coty.svg"
                className="h-8 sm:h-10 w-auto lg:h-12"
                alt=""
              />
              <img
                src="https://tailus.io/sources/blocks/tech-startup/preview/images/clients/microsoft.svg"
                className="h-8 sm:h-10 w-auto lg:h-12"
                alt=""
              />
            </div>
          </div>
          <div className="mt-3 md:mt-0 -right-10 lg:w-7/12">
            <img
              src="https://tailus.io/sources/blocks/tech-startup/preview/images/globalization-cuate.svg"
              className="w-full"
              alt="wath illustration"
              loading="lazy"
              width={250}
              height={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
