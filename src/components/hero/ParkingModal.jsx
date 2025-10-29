import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ParkingModal = ({ onClose, parkingData }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // wait for animation
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div
          className={`bg-black text-brand p-6 relative
            w-full h-full md:w-auto md:h-auto md:max-w-md
            rounded-none md:rounded-md
            transform transition-all duration-300
            ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}
            overflow-y-auto
          `}
        >
          <button
            className="absolute top-4 right-4 text-brand"
            onClick={handleClose}
          >
            <IoCloseOutline size={24} />
          </button>

          <div className="flex flex-col md:flex-row justify-between text-[12px] uppercase mb-4 mt-10 opacity-80 gap-2 md:gap-0">
            <div className="text-start flex flex-col gap-2 md:gap-4">
              <span className="montserrat">Lloji</span>
              <span className="montserrat text-3xl">
                {parkingData.isWarehouse ? "Depo" : "Parking"}
              </span>
            </div>
            <div className="text-center flex flex-col gap-2 md:gap-4">
              <span className="montserrat">Numër</span>
              <span className="montserrat text-3xl">
                {parkingData.parkingNumber}
              </span>
            </div>
            <div className="text-end flex flex-col gap-2 md:gap-4">
              <span className="montserrat">
                {parkingData.isWarehouse ? "Sipërfaqja" : "Sipërfaqja"}
              </span>
              <span className="montserrat text-3xl">
                {parkingData.electric
                  ? "Po"
                  : parkingData.isWarehouse
                  ? parkingData.square.toFixed(2) + " m²"
                  : "-"}
              </span>
            </div>
          </div>

          <hr className="border-brand mb-4" />

          <div className="flex justify-center mb-4">
            <img
              src={
                parkingData.isWarehouse
                  ? "/prishtina-view/assets/images/parkings/boxes.png"
                  : "/prishtina-view/assets/images/parkings/car.png"
              }
              alt="Parking Dimensions"
              className="w-1/2"
            />
          </div>

          <div className="w-full flex justify-center items-center">
            <a href="https://flux-ks.com/kontakti" rel="noopener noreferrer">
              <button className="w-full md:w-full bg-black border border-brand text-brand text-sm md:text-md hover:bg-black hover:text-white hover:border-white px-4 py-3 rounded-md montserrat transition-colors duration-200">
                NA KONTAKTONI
              </button>
            </a>
          </div>
        </div>
      </div>
    )
  );
};

export default ParkingModal;
