import React from "react";
import { homepage, planmetricImageUrl } from "../../utils/consts";

const ApartmentModal = ({ apartment, mousePosition }) => {
  return (
    // <div className="absolute top-40 left-60 w-[300px] h-[200px] md:h-[400px] rounded-lg overflow-hidden shadow-lg bg-white hover:cursor-pointer">
    <div
      className="relative w-[300px] h-[250px]  rounded-lg overflow-hidden shadow-lg bg-black"
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: mousePosition.y - 10 + "px",
        left: mousePosition.x + 20 + "px",
      }}
    >
      <img
        src="/assets/images/planimetria.png"
        alt={apartment?.title}
        className="w-full h-[150px] object-contain mt-14"
        onClick={apartment?.navigateTo}
      />
      <div className="absolute top-5 right-5 w-5/6 flex justify-between items-start">
        <h1 className="text-lg md:text-4xl font-semibold text-white mb-2 circe">
          {apartment?.sqft}m<sup>2</sup>{" "}
        </h1>
        <button
          className=" bg-transparent text-brand px-4 py-1 text-sm border-brand border-[1px] rounded-full hover:shadow-md transition certon"
          onClick={apartment?.navigateTo}
        >
          E lirë
        </button>
      </div>

      <div className="absolute  bottom-4 left-8 text-brand">
        <p className="text-sm md:text-lg montserrat">
          Tipi: {apartment?.bedroom}+1 ・ Kati: {apartment?.floor}
        </p>
      </div>
    </div>
  );
};

export default ApartmentModal;
