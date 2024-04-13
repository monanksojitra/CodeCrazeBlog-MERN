import React from "react";

const Card = ({ images, title, description, price, location, size, rooms }) => {
  return (
    <div className="bg-gray-300 p-4 rounded-lg h-full w-full">
      {/* <img src={images} /> */}
      <p className="text-xl font-bold pb-1">{title}</p>
      <p className="text-sm font-medium pb-1">{description}</p>
      <p>price:{price}$</p>
      <p>location:{location}</p>
      <p>size:{size}</p>
      <p>rooms:{rooms}</p>
    </div>
  );
};

export default Card;
