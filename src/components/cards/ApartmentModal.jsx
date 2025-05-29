import React from "react";
import { homepage, planmetricImageUrl } from "../../utils/consts";

const ApartmentModal = ({ apartment, mousePosition }) => {
  return (
    // <div className="absolute top-40 left-60 w-[300px] h-[200px] md:h-[400px] rounded-lg overflow-hidden shadow-lg bg-white hover:cursor-pointer">
    <div
      className='relative w-[300px] h-[420px]  rounded-lg overflow-hidden shadow-lg bg-white'
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: mousePosition.y - 10 + "px",
        left: mousePosition.x + 20 + "px",
      }}
    >
      <img
        src={`${homepage}${planmetricImageUrl}${apartment?.image}`}
        alt={apartment?.title}
        className="w-full h-[280px] object-contain mt-14"
        onClick={apartment?.navigateTo}
      />
      <button
        className="absolute top-4 right-4 bg-transparent text-brand px-4 py-1 text-sm border-brand border-[1px] rounded-full hover:shadow-md transition certon"
        onClick={apartment?.navigateTo}
      >
        E lirë
      </button>
      <div className="absolute bottom-4 left-4 text-brand">
        <h1 className="text-lg md:text-2xl font-semibold mb-2 certon">
          {apartment?.sqft}m<sup>2</sup>{" "}
        </h1>
        <p className="text-sm md:text-lg montserrat">
          Tipi: {apartment?.bedroom}+1 ・ Kati: {apartment?.floor}
        </p>
      </div>
    </div>
  );
};

export default ApartmentModal;
