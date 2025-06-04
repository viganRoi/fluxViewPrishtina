import React, { useState } from "react";
import {
  getRegularBuildingFilter,
  getRegularFloorFilter,
  getRegularRoomFilter,
  getRegularSquareFilter,
  handleFilterState,
  handleRegularFilterReset,
  maxFloor,
  maxSquare,
  minFloor,
  minSquare,
  setRegularBuildingFilter,
  setRegularFloorFilter,
  setRegularRoomFilter,
  setRegularSquareFilter,
} from "../../features/filter/FilterSlice";
import { useDispatch, useSelector } from "react-redux";
import { Slider } from "@mui/material";
import { useParams } from "react-router-dom";
import DropdownType from "../extensions/DropdownType"; // Import the DropdownType component

const floorLabelMapping = {
  0: "Përdhesa",
  "-1": "Suterren",
  "-2": "Bodrum",
};
const getFloorLabel = (floor) => {
  return floorLabelMapping[floor] || floor;
};

const AllApartmentsFilter = ({ setFilterState, available }) => {
  const roomFilter = useSelector(getRegularRoomFilter);
  const buildingFilter = useSelector(getRegularBuildingFilter);
  const squareFilter = useSelector(getRegularSquareFilter);
  const floorFilter = useSelector(getRegularFloorFilter);
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState(
    buildingFilter.find((filter) =>
      ["apartment", "commercial", "parking"].includes(filter)
    ) || ""
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleRoomChange = (event) => {
    dispatch(setRegularRoomFilter(event.target.name));
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
    dispatch(setRegularBuildingFilter(value));
  };

  const handleBuildingChange = (event) => {
    dispatch(setRegularBuildingFilter(event.target.name));
  };

  const handleFloorChange = (event, newFloorRange) => {
    dispatch(setRegularFloorFilter(newFloorRange));
  };

  const handleSizeChange = (event, newSizeRange) => {
    dispatch(setRegularSquareFilter(newSizeRange));
  };

  const setFilteredData = () => {
    dispatch(handleFilterState(true));
    setFilterState((prev) => !prev);
  };

  const resetFilters = () => {
    dispatch(handleRegularFilterReset());
    setFilterState((prev) => !prev);
  };

  return (
    <div className="w-full h-full py-24 md:py-32 flex flex-col items-center justify-center bg-black">
      <div className="w-11/12 h-full text-white flex flex-col justify-between items-start gap-4 border-b border-white pb-12">
        <h1 className="font-bold text-4xl">Filtro <span className="text-brand">Apartmentet</span></h1>
      </div>
      <div className="w-11/12 h-full text-gold flex flex-col justify-between items-center gap-4 py-12">
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
          <div className="w-full flex flex-col items-start gap-1 md:gap-4">
            <h1 className="text-lg text-white font-semibold">Objekti</h1>
            <div className="w-full flex gap-4 justify-start">
              <button
                name="a"
                onClick={handleBuildingChange}
                className={`px-4 py-2 rounded-full border border-gold ${buildingFilter.includes("a")
                  ? "bg-brand text-black"
                  : "bg-transparent text-white"
                  }`}
              >
                A
              </button>
              <button
                name="b"
                onClick={handleBuildingChange}
                className={`px-4 py-2 rounded-full border border-gold ${buildingFilter.includes("b")
                  ? "bg-brand text-black"
                  : "bg-transparent text-white"
                  }`}
              >
                B
              </button>
              <button
                name="c"
                onClick={handleBuildingChange}
                className={`px-4 py-2 rounded-full border border-gold ${buildingFilter.includes("c")
                  ? "bg-brand text-black"
                  : "bg-transparent text-white"
                  }`}
              >
                C
              </button>
              <button
                name="d"
                onClick={handleBuildingChange}
                className={`px-4 py-2 rounded-full border border-gold ${buildingFilter.includes("d")
                  ? "bg-brand text-black"
                  : "bg-transparent text-white"
                  }`}
              >
                D
              </button>
              <button
                name="e"
                onClick={handleBuildingChange}
                className={`px-4 py-2 rounded-full border border-gold ${buildingFilter.includes("e")
                  ? "bg-brand text-black"
                  : "bg-transparent text-white"
                  }`}
              >
                E
              </button>
              <button
                name="f"
                onClick={handleBuildingChange}
                className={`px-4 py-2 rounded-full border border-gold ${buildingFilter.includes("f")
                  ? "bg-brand text-black"
                  : "bg-transparent text-white"
                  }`}
              >
                F
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-1 md:gap-4">
            <h1 className="text-lg text-white font-semibold">Dhoma</h1>
            <div className="w-full flex gap-4 justify-start">
              <button
                name="1"
                onClick={handleRoomChange}
                className={`px-4 py-2 rounded-full border border-gold ${roomFilter.includes("1")
                  ? "bg-brand text-black"
                  : "bg-transparent text-white"
                  }`}
              >
                1 + 1
              </button>
              <button
                name="2"
                onClick={handleRoomChange}
                className={`px-4 py-2 rounded-full border border-gold ${roomFilter.includes("2")
                  ? "bg-brand text-black"
                  : "bg-transparent text-white"
                  }`}
              >
                2 + 1
              </button>
              <button
                name="3"
                onClick={handleRoomChange}
                className={`px-4 py-2 rounded-full border border-gold ${roomFilter.includes("3")
                  ? "bg-brand text-black"
                  : "bg-transparent text-white"
                  }`}
              >
                3 + 1
              </button>
              <button
                name="penthouse"
                onClick={handleRoomChange}
                className={`px-4 py-2 rounded-full border border-gold ${roomFilter.includes("penthouse")
                  ? "bg-brand text-black"
                  : "bg-transparent text-white"
                  }`}
              >
                Penthouse
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-1 md:gap-4">
            <h1 className="text-lg text-white font-semibold">Sipërfaqja</h1>
            <div className="w-full flex flex-col justify-between">
              <div className="w-full">
                <Slider
                  getAriaLabel={() => "Size range"}
                  value={[squareFilter.startVal, squareFilter.endVal]}
                  onChange={handleSizeChange}
                  shiftStep={1}
                  step={10}
                  min={minSquare}
                  max={maxSquare}
                  color="var(--brand-color)"
                  sx={{
                    color: "var(--brand-color)",
                    height: "1px",
                    width: "100%",
                  }}
                />
              </div>
              <div className="flex items-center gap-4 w-full">
              <p className="text-lg py-1 px-8 text-white border border-gold rounded-full">
                {squareFilter.startVal} m<sup>2</sup>
              </p>
              <p className="text-lg py-1 px-8 text-white border border-gold rounded-full">
                {squareFilter.endVal} m<sup>2</sup>
              </p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-1 md:gap-4">
            <h1 className="text-lg text-white font-semibold">Kati</h1>
            <div className="w-full flex flex-col justify-between">
              <div className="w-full">
                <Slider
                  getAriaLabel={() => "Floor range"}
                  value={[floorFilter.startVal, floorFilter.endVal]}
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
              <div className="flex items-center gap-4 w-full">
              <p className="text-lg py-1 px-8 text-white border border-gold rounded-full">
                {getFloorLabel(floorFilter.startVal)}
              </p>
              <p className="text-lg py-1 px-8 text-white border border-gold rounded-full">
                {getFloorLabel(floorFilter.endVal)}
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllApartmentsFilter;
