import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="z-0">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:grid grid-cols-3  gap-6 my-4 ">
        <img
          src="/hero.png"
          alt="a colorful disk with the center protruding upwards, representation of Sieve of Atkin Algorithm"
        />
        <div className="col-span-2 flex flex-col justify-center relative ">
          <p className="text-darkBlue text-base font-semibold">
            Computational Mathematics
          </p>
          <h1 className=" text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Median Prime Number(s) Calculator
          </h1>
          <p className="lg:absolute bottom-0 text-sm text-gray-600">
            By:{" "}
            <a
              className="text-darkBlue hover:text-blue-900"
              href="https://www.linkedin.com/in/ahmed-al-amawi/"
            >
              Ahmed Al Amawi
            </a>
          </p>
        </div>
      </div>
      <p className="col-span-3 max-w-4xl px-4 mx-auto text-lg">
        Use this calculator to quickly identify the median of all prime numbers
        up to a given input value. It's an efficient tool for number theory
        exploration and understanding the distribution of prime numbers.
      </p>
    </div>
  );
};

export default Hero;
