import { homepage, planmetricImageUrl } from "../../utils/consts";

const ApartmentModal = ({ apartment, mousePosition }) => {
  return (
    <div
      className="relative w-[300px] h-[300px]  rounded-lg overflow-hidden shadow-lg bg-white"
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
        className="w-full h-[200px] object-contain mt-16"
        onClick={apartment?.navigateTo}
      />
      <div className="absolute top-5 right-5 w-5/6 flex justify-between items-start">
        <h1 className="text-lg md:text-4xl font-semibold text-black mb-2 circe">
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
          Tipi: {apartment?.bedroom} ・ Kati: {apartment?.floor}
        </p>
      </div>
    </div>
  );
};

export default ApartmentModal;
