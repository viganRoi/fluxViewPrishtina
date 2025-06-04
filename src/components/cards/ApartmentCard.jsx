import React from "react";
import { homepage, planmetricImageUrl } from "../../utils/consts";

const ApartmentCard = ({ image, title, navigateTo, floor, bedroom, sqft }) => {
  return (
    <div className="w-full h-[480px] md:h-[585px] flex justify-between p-2 relative rounded-lg overflow-hidden border border-[#8B8B8BCC] shadow-lg bg-black hover:cursor-pointer">
      <div className="w-full flex flex-col gap-1">
        <h2 className="text-[16px] text-white montserrat">
          109.57m<sup>2</sup>
        </h2>
        <h2 className="text-[16px] text-white montserrat">2 Dhoma</h2>
        <h2 className="text-[16px] text-white montserrat">2 Banjo</h2>
        <h2 className="text-[16px] text-white montserrat">Kati 1</h2>
      </div>
      <div className="w-full flex flex-col gap-1">
        <h1 className="text-2xl text-white font-semibold">Objekti A</h1>
      </div>
      {/* Image Section */}
      <img
        className="absolute top-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2"
        src="/assets/images/plani.png"
        alt=""
      />
      <button className="absolute top-4 right-4">
        <img src="/assets/icons/heart.svg" alt="" />
      </button>
    </div>
  );
};

export default ApartmentCard;
