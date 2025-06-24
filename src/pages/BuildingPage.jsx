import React, { useEffect, useState } from "react";
import {
  Building,
  BuildingFilter,
  BuildingFilterMobile,
  BuildingMobile,
} from "../components";
import { useSelector } from "react-redux";
import {
  getRegularRoomFilter,
  getRegularFloorFilter,
  getRegularSquareFilter,
} from "../features/filter/FilterSlice";
import { useParams } from "react-router-dom";
import { getAllApartmentSvgData } from "../features/apartment/ApartmentSlice";

const BuildingPage = () => {
  const isSmallDev = window.innerWidth < 700;
  window.scrollTo({ top: 0 });
  const [buildings, setBuildings] = useState([]);
  const [available, setAvailable] = useState([]);
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [filterState, setFilterState] = useState(false);
  const { id } = useParams();
  const buildingData = useSelector(getAllApartmentSvgData);

  const roomFilter = useSelector(getRegularRoomFilter);
  const floorFilter = useSelector(getRegularFloorFilter);
  const squareFilter = useSelector(getRegularSquareFilter);

  const buildingName = buildingData[0]?.buildingNr?.toUpperCase() || "";

  useEffect(() => {
    const newBuildings = buildingData.filter(
      (building) => building.buildingNr === id
    );
    setBuildings(newBuildings);
  }, [id, buildingData]);

  useEffect(() => {
    applyFilters(buildings);
  }, [buildings, filterState, roomFilter, floorFilter, squareFilter]);

  const applyFilters = (buildings) => {
    let filtered = buildings;

    if (roomFilter.length && !roomFilter.includes("all")) {
      filtered = filtered.filter((building) =>
        roomFilter.includes(building.rooms)
      );
    }

    if (
      floorFilter.startVal !== undefined &&
      floorFilter.endVal !== undefined
    ) {
      filtered = filtered.filter(
        (building) =>
          building.floorNumber >= floorFilter.startVal &&
          building.floorNumber <= floorFilter.endVal
      );
    }

    if (
      squareFilter.startVal !== undefined &&
      squareFilter.endVal !== undefined
    ) {
      filtered = filtered.filter(
        (building) =>
          building.square >= squareFilter.startVal &&
          building.square <= squareFilter.endVal
      );
    }

    const availableCount =
      buildingData[0]?.apartmentList?.filter((apartment) => {
        const matchesRoom =
          roomFilter.includes(apartment.rooms) || roomFilter.includes("all");
        const matchesFloor =
          apartment.floorNumber >= (floorFilter.startVal || -Infinity) &&
          apartment.floorNumber <= (floorFilter.endVal || Infinity);
        const matchesSquare =
          apartment.square >= (squareFilter.startVal || -Infinity) &&
          apartment.square <= (squareFilter.endVal || Infinity);
        return matchesRoom && matchesFloor && matchesSquare;
      }).length || 0;

    setAvailable(availableCount);
    setFilteredBuildings(filtered);
  };

  return (
    <div className="flex flex-col-reverse md:flex-col">
      {/* {isSmallDev ? (
        <>
          <BuildingFilterMobile setFilterState={setFilterState} available={available} />
          <BuildingMobile filteredBuildings={filteredBuildings} />
        </>
      ) : (
        <>
          <BuildingFilter setFilterState={setFilterState} available={available} />
          <Building filteredBuildings={filteredBuildings} />
        </>
      )
      } */}
      <BuildingFilter setFilterState={setFilterState} available={available} />
      <Building filteredBuildings={filteredBuildings} />
    </div>
  );
};

export default BuildingPage;
