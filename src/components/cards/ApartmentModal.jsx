import { homepage, planmetricImageUrl } from "../../utils/consts";

const ApartmentModal = ({ apartment, mousePosition }) => {
  return (
    <div
      className="relative w-[300px] h-[420px]  rounded-lg overflow-hidden shadow-lg bg-white"
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: mousePosition.y - 10 + "px",
        left: mousePosition.x + 20 + "px",
      }}
    >
      <div className="w-full flex flex-col ">
        <div className="  w-full flex bg-black p-4 justify-between items-start">
          <h1 className="text-lg md:text-4xl font-semibold text-brand mb-2 montserrat">
            {apartment?.sqft}m<sup>2</sup>{" "}
          </h1>
          <button
            className=" bg-transparent text-brand px-4 py-1 text-sm border-brand border-[1px] rounded-full hover:shadow-md transition montserrat"
            onClick={apartment?.navigateTo}
          >
            E lirë
          </button>
        </div>
        <div className="w-full flex flex-col justify-between items-start p-4">
          <div className=" text-brand">
            <p className="text-sm md:text-lg montserrat">
              Numer: {apartment?.number}
            </p>
            <p className="text-sm md:text-lg montserrat">
              Tipi: {apartment?.bedroom}+1
            </p>
            <p className="text-sm md:text-lg montserrat">
              Kati: {apartment?.floor}
            </p>
          </div>

          <img
            src={`${homepage}${planmetricImageUrl}${apartment?.image}`}
            alt={apartment?.title}
            className="w-full h-[250px] object-contain mt-2"
            onClick={apartment?.navigateTo}
          />
        </div>
      </div>
    </div>
  );
};

export default ApartmentModal;
