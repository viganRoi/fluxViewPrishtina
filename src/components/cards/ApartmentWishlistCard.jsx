import React from "react";
import { homepage, planmetricImageUrl } from "../../utils/consts";

const ApartmentWishlistCard = ({
  id,
  image,
  title,
  navigateTo,
  floor,
  bedroom,
  sqft,
  onRemove,
}) => {
  return (
    <div className="w-full h-[480px] md:h-[500px] relative rounded-lg overflow-hidden shadow-lg bg-white hover:cursor-pointer">
      <img
        src={`${homepage}${planmetricImageUrl}${image}`}
        alt={title}
        className="w-full h-full object-contain"
        onClick={navigateTo}
      />
      {/* <button
        className="absolute top-4 right-4 bg-transparent text-brand px-4 py-1 text-sm border-brand border-[1px] rounded-full hover:shadow-md transition certon"
        onClick={navigateTo}
      >
        360° Vr Tour
      </button> */}
      <button
        onClick={() => onRemove(id)}
        className="absolute top-4 right-4 bg-transparent flex text-brand px-4 py-4  text-sm border-brand border-[1px] rounded-full hover:shadow-md transition certon"
      >
        <img className="w-4 h-4" src="/assets/icons/trash.svg" alt="" />
      </button>
      <div className="absolute bottom-4 left-4 text-brand">
        <h1 className="text-[24px] md:text-2xl font-semibold mb-2 certon">
          {sqft}m<sup>2</sup>
        </h1>
        <p className="text-[16px] md:text-lg montserrat">
          Tipi: {bedroom}+1 ・ Kati: {floor}
        </p>
      </div>
    </div>
  );
};

export default ApartmentWishlistCard;
