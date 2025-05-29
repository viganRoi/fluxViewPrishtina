import React from "react";
import { Slider } from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";
import {
  maxFloor,
  maxSquare,
  minFloor,
  minSquare,
} from "../../features/filter/FilterSlice";

const BuildingFilterModal = ({
  available,
  sizeRange,
  floorRange,
  roomRange,
  handleRoomChange,
  handleFloorChange,
  handleSizeChange,
  setFilteredData,
  resetFilters,
  onClose,
}) => {
  const floorLabelMapping = {
    0: "Përdhesa",
    "-1": "Suterren",
    "-2": "Bodrum",
  };
  const getFloorLabel = (floor) => {
    return floorLabelMapping[floor] || floor;
  };

  return (
    <div className="fixed w-full h-screen top-0 bg-brand bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-brand px-6 py-14 border border-gold rounded-lg max-w-md w-full relative text-white">
        <button
          className="absolute top-4 right-4 text-white text-2xl z-50"
          onClick={onClose}
        >
          <IoCloseOutline />
        </button>
        <div className="w-11/12 h-full text-gold flex flex-col justify-between items-end">
          <div className="w-full flex flex-col md:flex-row justify-between items-start">
            <div className="w-full md:w-1/6 flex flex-col items-start gap-4 mb-4 md:mb-0">
              <h1 className="text-lg md:text-2xl certon text-gold">
                Apartamentet e lira: {available}
              </h1>
            </div>
            <div className="w-full md:w-2/6 flex flex-col items-start gap-4 mb-4 md:mb-0">
              <p className="text-sm text-text">
                Dhomat: {roomRange === "all" ? "all" : `${roomRange} + 1`},
                Kati: {getFloorLabel(floorRange[0])} -{" "}
                {getFloorLabel(floorRange[1])},<br />
                Sipërfaqja: {sizeRange[0]}m<sup>2</sup> - {sizeRange[1]}m
                <sup>2</sup>
              </p>
            </div>
            <div className="w-full md:w-1/6 flex flex-col items-start gap-4 mb-4 md:mb-0">
              <h1 className="text-lg text-white font-semibold">Dhoma</h1>
              <div className="flex gap-2 md:gap-4">
                <button
                  name="1"
                  onClick={handleRoomChange}
                  className={`px-4 py-2 rounded-full border border-gold ${
                    roomRange.includes("1")
                      ? "bg-gold text-black"
                      : "bg-brand text-white"
                  }`}
                >
                  1+1
                </button>
                <button
                  name="2"
                  onClick={handleRoomChange}
                  className={`px-4 py-2 rounded-full border border-gold ${
                    roomRange.includes("2")
                      ? "bg-gold text-black"
                      : "bg-brand text-white"
                  }`}
                >
                  2+1
                </button>
                <button
                  name="3"
                  onClick={handleRoomChange}
                  className={`px-4 py-2 rounded-full border border-gold ${
                    roomRange.includes("3")
                      ? "bg-gold text-black"
                      : "bg-brand text-white"
                  }`}
                >
                  3+1
                </button>
              </div>
            </div>
            <div className="w-full md:w-2/6 flex flex-col items-start gap-4 mb-4 md:mb-0">
              <h1 className="text-lg text-white font-semibold">Kati</h1>
              <div className="w-full flex flex-col justify-between">
                <div className="w-full ml-3">
                  <Slider
                    getAriaLabel={() => "Floor range"}
                    value={[floorRange[0], floorRange[1]]}
                    onChange={handleFloorChange}
                    step={1}
                    min={minFloor}
                    max={maxFloor}
                    sx={{
                      color: "var(--brand2-color)",
                      height: "1px",
                      width: "94%",
                    }}
                  />
                </div>
                <p className="text-lg">
                  {getFloorLabel(floorRange[0])} -{" "}
                  {getFloorLabel(floorRange[1])}
                </p>
              </div>
            </div>
            <div className="w-full md:w-2/6 flex flex-col items-start gap-4 mb-4 md:mb-0">
              <h1 className="text-lg text-white font-semibold">Sipërfaqja</h1>
              <div className="w-full flex flex-col justify-between">
                <div className="w-full ml-3">
                  <Slider
                    getAriaLabel={() => "Size range"}
                    value={[sizeRange[0], sizeRange[1]]}
                    onChange={handleSizeChange}
                    step={10}
                    min={minSquare}
                    max={maxSquare}
                    sx={{
                      color: "var(--brand2-color)",
                      height: "1px",
                      width: "94%",
                    }}
                  />
                </div>
                <p className="text-lg">
                  {sizeRange[0]}m<sup>2</sup>- {sizeRange[1]}m<sup>2</sup>
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4 mt-4 md:mt-0">
            <button
              onClick={resetFilters}
              className="bg-brand text-white px-4 py-2 rounded-full border border-gold hover:bg-gold transition"
            >
              Reseto
            </button>
            <button
              onClick={setFilteredData}
              className="bg-gold text-white px-4 py-2 rounded-full border border-gold"
            >
              Apliko Ndryshimet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingFilterModal;
