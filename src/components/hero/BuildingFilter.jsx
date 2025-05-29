import React, { useState } from "react";
import {
  handleFilterState,
  handleRegularFilterReset,
  maxFloor,
  maxSquare,
  minFloor,
  minSquare,
  setRegularFloorFilter,
  setRegularRoomFilter,
  setRegularSquareFilter,
} from "../../features/filter/FilterSlice";
import { useDispatch, useSelector } from "react-redux";
import { Slider } from "@mui/material";
import { useParams } from "react-router-dom";
import { getAllApartmentSvgData } from "../../features/apartment/ApartmentSlice";

const floorLabelMapping = {
  0: "Përdhesa",
  "-1": "Suterren",
  "-2": "Bodrum",
};
const getFloorLabel = (floor) => {
  return floorLabelMapping[floor] || floor;
};

const BuildingFilter = ({ available }) => {
  const [sizeRange, setSizeRange] = useState([minSquare, maxSquare]);
  const [floorRange, setFloorRange] = useState([minFloor, maxFloor]);
  const [roomRange, setRoomRange] = useState("all");
  const dispatch = useDispatch();
  const { id } = useParams();
  const isSmallDev = window.innerWidth < 700;
  const buildingData = useSelector(getAllApartmentSvgData);

  const handleRoomChange = (event) => {
    setRoomRange(event.target.name);
  };

  const handleFloorChange = (event, newFloorRange) => {
    setFloorRange(newFloorRange);
  };

  const handleSizeChange = (event, newSizeRange) => {
    setSizeRange(newSizeRange);
  };

  const setFilteredData = () => {
    dispatch(setRegularFloorFilter([floorRange[0], floorRange[1]]));
    dispatch(setRegularRoomFilter(roomRange));
    dispatch(setRegularSquareFilter([sizeRange[0], sizeRange[1]]));
    dispatch(handleFilterState(true));
  };

  const resetFilters = () => {
    setSizeRange([minSquare, maxSquare]);
    setFloorRange([minFloor, maxFloor]);
    setRoomRange("all");
    dispatch(handleRegularFilterReset());
  };


  return (
    <div className="w-full h-full py-0 pt-36 pb-12 flex flex-col items-center justify-center bg-brand md:gap-10">
      <div className="w-11/12 h-full text-gold flex justify-between">
        <h1 className="text-xl md:text-5xl certon text-gold">
          Objekti: {buildingData[0]?.buildingNr?.toUpperCase()}
        </h1>
        <h1 className="text-lg md:text-2xl certon text-gold">
          Apartamentet e lira: {available}
        </h1>
      </div>
      <div className="w-11/12 h-full text-gold flex flex-col justify-between items-end">
        <div className="w-full flex flex-col md:flex-row justify-between items-start">
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
              <button
                name="4"
                onClick={handleRoomChange}
                className={`px-4 py-2 rounded-full border border-gold ${
                  roomRange.includes("4")
                    ? "bg-gold text-black"
                    : "bg-brand text-white"
                }`}
              >
                4+1
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
                  shiftStep={1}
                  onChange={handleFloorChange}
                  step={1}
                  min={minFloor}
                  max={maxFloor}
                  color="var(--brand2-color)"
                  sx={{
                    color: "var(--brand2-color)",
                    height: "1px",
                    width: "94%",
                  }}
                />
              </div>
              <p className="text-lg">
                {getFloorLabel(floorRange[0])} - {getFloorLabel(floorRange[1])}
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
                  shiftStep={1}
                  step={10}
                  min={minSquare}
                  max={maxSquare}
                  color="var(--brand2-color)"
                  sx={{
                    color: "var(--brand2-color)",
                    height: "1px",
                    width: "94%",
                  }}
                />
              </div>
              <p className="text-lg">
                {sizeRange[0]}m<sup>2</sup> - {sizeRange[1]}m<sup>2</sup>
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
  );
};

export default BuildingFilter;
