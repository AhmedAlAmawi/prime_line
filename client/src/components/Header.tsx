import React from "react";
import { CalculatorIcon } from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
  return (
    <nav className="text-darkBlue p-3  sticky top-0 bg-white z-10 ">
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <CalculatorIcon className="h-8 w-auto " />
          <p className="font-medium  text-2xl tracking-wider">PrimeLine</p>
        </div>
        <a
          href="mailto:amawiahmad@gmail.com"
          className="bg-darkBlue px-4 py-2 rounded text-white hover:bg-blue-950"
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
