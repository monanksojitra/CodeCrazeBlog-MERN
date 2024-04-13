import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "./UI/Card";

const Bloges = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center">
        <Card />
      </div>
      <Footer />
    </>
  );
};

export default Bloges;
